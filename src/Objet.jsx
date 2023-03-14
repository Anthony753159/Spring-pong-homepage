import * as THREE from 'three'
import { MeshReflectorMaterial, SoftShadows, TransformControls, Center, Text3D, useFBX, useMatcapTexture, useCursor, GradientTexture, Html, Float, useTexture, Sphere, } from '@react-three/drei'
import { useEffect, useMemo, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useManosStore } from './hooks'
import { Physics, Debug, RigidBody, InstancedRigidBodies } from '@react-three/rapier'
import { PositionalAudio } from '@react-three/drei';




//Geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const sphereGeometry = new THREE.SphereGeometry(15, 32, 16)

// Mesh
const titleMesh = new THREE.MeshMatcapMaterial({ color: 'lightgreen' })
const raquette1Mesh = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const raquette2Mesh = new THREE.MeshStandardMaterial({ color: 'red' })
const raquette3Mesh = new THREE.MeshStandardMaterial({ color: 'yellow' })
const raquette4Mesh = new THREE.MeshStandardMaterial({ color: 'blue' })
const raquette5Mesh = new THREE.MeshStandardMaterial({ color: 'gold' })
const raquette6Mesh = new THREE.MeshStandardMaterial({ color: 'orange' })
const raquette7Mesh = new THREE.MeshStandardMaterial({ color: 'lightorange' })
const pongMesh = new THREE.MeshBasicMaterial({ color: 'orange' })
const goMesh = new THREE.MeshBasicMaterial({ color: 'lightblue' })

//General Scale
const scale = 0.5


// const Ball = (props) => (
//     <RigidBody colliders="ball" restitution={0.7}>
//       <mesh castShadow receiveShadow {...props}>
//         <sphereGeometry args={[0.5, 32, 32]} />
//         <meshStandardMaterial color="white" />
//       </mesh>
//     </RigidBody>
//   )


export default function objet() {

    //Mesh Matcap
    const [raquette3matcap] = useTexture(["./textures/wax-yellow"]);
    const [raquette1matcap] = useTexture(["./textures/normals"]);

    //Import projector
    const projector = useFBX('./object/projector.fbx')

    // Animation for raquettes
    const raquette1 = useRef()
    const raquette2 = useRef()
    const raquette3 = useRef()
    const raquette4 = useRef()
    const raquette5 = useRef()
    const raquette6 = useRef()
    const raquette7 = useRef()
    const backgroundPlane = useRef()
    const cubesMesh = useRef()
    const cubes = useRef()

    // Création d'une variable aléatoire avec une vitesse min de 0.2 avec une multiplication par -1 si inférieur à 0.5 pour faire une rotation inversée
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    // Animation des raquettes
    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()
        const raquette1y = Math.sin(time + timeOffset) / 200
        const raquette3y = Math.sin(time) / 120
        const raquette4x = Math.sin(time) / 210
        const raquette5z = Math.sin(time) / 200
        const raquette6x = Math.sin(time + timeOffset) / 240
        const raquette7z = Math.sin(time + timeOffset) / 210
        raquette1.current.position.y += raquette1y
        raquette2.current.rotation.y += delta
        raquette3.current.position.y += raquette3y
        raquette4.current.position.x += raquette4x
        raquette5.current.position.z += raquette5z
        raquette6.current.position.x += raquette6x
        raquette7.current.position.z += raquette7z


    })

    // Animation balles
    // Animation balle Pong
    const [active1, setActive1] = useState(false)
    useCursor(active1)
    // Animation balle Pong
    const [active2, setActive2] = useState(false)
    useCursor(active2)



    //Génération du background
    const cubesCount = 50


    const cubeTransforms = useMemo(() => {
        const positions = []
        const rotations = []
        const scales = []

        for (let i = 0; i < cubesCount; i++) {
            positions.push([(Math.random() - 0.5) * 20, Math.random() * 15 - 6, (Math.random() - 1.3) * 8])
            rotations.push([Math.PI * 0.5 * i, 0, Math.PI * 0.5 * i])

            const scale = 0.2 + Math.random() * 0.8
            scales.push([scale * 0.6, scale * 2, scale * 0.3])
        }

        return { positions, rotations, scales }
    }, [])


    const [backgroundFall, setbackgroundFall] = useState("kinematicPosition")

    const colorChange = () => {
        raquette1.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        raquette2.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        raquette3.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        raquette4.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        raquette5.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        raquette6.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        raquette7.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        cubesMesh.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    }


    //StartGame

    const [lastState, setlastState] = useState("Null");

    const startGame = () => {

        console.log(lastState)

        if (lastState == 'simpleGame') {
            window.location.assign('http://127.0.0.1:8080/spring-pong/game')
        }
        else if (lastState == 'tournament') {
            window.location.assign('http://127.0.0.1:8080/spring-pong/tournament')
        }


    }

    //Animation de la wireframe

    const [enableWireframe, setEnableWireframe] = useState(true)

    // Gestion de la caméra

    const { camera } = useThree()
    const { setZoomArcade, setShowIframe } = useManosStore()

    const enterScene = () => {

        gsap.timeline({
            onComplete: () => {
                setTimeout(() => {
                    setZoomArcade(true)
                    setShowIframe(false)
                }, 400)
            }
        })
            .to(camera.position, { x: 1, y: 1, z: 5, duration: 3 }, 0)
            .to(camera.rotation, {
                duration: 2,
                x: 0.3,
                y: -0.5,
                z: 0,
            }, 1)
            .to(camera.position, { x: -4.2, y: -1.9, z: 5.0, duration: 2 }, 2)
        // .to(camera.position, { x: 1, y: 1, z: 5, duration: 3 }, 3)
        // .to(camera.position, { x: 3, y: 2, z: 5, duration: 3 }, 4)

    }


    const leaveScene = () => {
        gsap.timeline({
            onComplete: () => {
                setTimeout(() => {
                    setZoomArcade(true)
                    setShowIframe(false)
                }, 400)
            }
        })
            .to(camera.position, { x: 1, y: 1, z: 5, duration: 3 }, 0)
            .to(camera.rotation, {
                duration: 2,
                x: 0,
                y: 0,
                z: 0,
            }, 1)
            .to(camera.position, { x: 0.0, y: 0.3, z: 10.0, duration: 2 }, 2)


    }


    const tournamentSelection = () => {
        gsap.timeline({
            onComplete: () => {
                setTimeout(() => {
                    setZoomArcade(true)
                    setShowIframe(false)
                }, 400)
            }
        })
            .to(camera.position, { x: 1, y: 1, z: 5, duration: 3 }, 0)
            .to(camera.rotation, {
                duration: 2,
                x: -0.7,
                y: 0.5,
                z: 0.0,
            }, 1)
            .to(camera.position, { x: 4.6, y: 5, z: 4.5, duration: 2 }, 2)
        // .to(camera.rotation, {
        //     duration: 2,
        //     y: Math.PI/2,
        //     z: -1,
        // }, 1)


    }

    const simpleGameSelection = () => {
        gsap.timeline({
            onComplete: () => {
                setTimeout(() => {
                    setZoomArcade(true)
                    setShowIframe(false)
                }, 400)
            }
        })
            .to(camera.position, { x: 1, y: 1, z: 5, duration: 3 }, 0)
            .to(camera.rotation, {
                duration: 2,
                x: -0.4,
                y: 0.2,
                z: 0,
            }, 1)
            .to(camera.rotation, {
                duration: 2,
                x: 0.3,
                y: -0.5,
                z: 0,
            }, 2)
            .to(camera.position, { x: 1, y: 1, z: 5, duration: 3 }, 3)

            .to(camera.position, { x: -4.2, y: -1.9, z: 5.0, duration: 2 }, 4)
          

    }





    // Gestion de la musique
    // utilisation de useState pour définir le moment du lancement de la musique
    const [music, setMusic] = useState(false);
    var audioTournament = new Audio('./sounds/Survivor-EyeOfTheTiger.mp3')


    // const handleMouseEnter = () => {

    //      if (music == false) {
    //          audio.play()
    //          setMusic(true)
    //          console.log(audio)

    //      }
    // }

    //  const handleMouseLeave = () => {

    // if (music == true) {
    //     audio.pause();
    //     setMusic(false);
    //     console.log(audio)

    // }


    //};


    return <>

        <RigidBody restitution={0.2} friction={0.0} colliders="ball"
            onCollisionEnter={() => {
                setEnableWireframe(false)

            }}
            onCollisionExit={() => {
                setEnableWireframe(true)
            }}
            onSleep={() => {
                setEnableWireframe(true)
            }}
        >
            <Sphere
                position={[0.5, 1.0, 8]}
                scale={0.05}
                onPointerEnter={() => {
                    setEnableWireframe(false)
                    document.body.style.cursor = `pointer`
                }}
                onPointerLeave={() => {
                    setEnableWireframe(true)
                    document.body.style.cursor = `initial`
                }}
                onClick={enterScene}
            >
                <meshStandardMaterial castShadow wireframe={enableWireframe} color={'#f0d000'} />
            </Sphere>
        </RigidBody>

        <RigidBody type="kinematicPosition">
            <Center disableZ>
                <Text3D font="./fonts/helvetiker_regular.typeface.json"
                    position={[
                        0,
                        2.2,
                        8,
                    ]}
                    rotation={[0, 0.5, 0]}
                    material={titleMesh}
                    smooth={0.11}
                    scale={0.25}
                    size={1}
                    height={0.2}
                    curveSegments={5}
                    bevelEnabled
                    bevelThickness={0.0}
                    bevelSize={0.02}
                    bevelOffset={0.0}
                    bevelSegments={5}
                    onClick={enterScene}
                    maxWidth={2}
                    onPointerEnter={() => {
                        setEnableWireframe(false)
                        document.body.style.cursor = `pointer`
                    }}
                    onPointerLeave={() => {
                        setEnableWireframe(true)
                        document.body.style.cursor = `initial`
                    }}
                >
                    SPRING
                    PONG
                    <meshStandardMaterial castShadow wireframe={enableWireframe} color={'#f0d000'} />
                </Text3D>
            </Center>
        </RigidBody>

        <Text3D font="./fonts/helvetiker_regular.typeface.json"
            position={[
                -1,
                0.6,
                8,
            ]}
            rotation={[0, 0.5, 0]}
            material={titleMesh}
            scale={0.03}
            size={1}
            height={0.2}
            curveSegments={5}
            bevelEnabled
            bevelThickness={0.0}
            bevelSize={0.02}
            bevelOffset={0.0}
            bevelSegments={5}
            maxWidth={2}
        >
            Homepage Developer {'<Anthony PHO />'}

            <meshStandardMaterial color={'#454545'} />
        </Text3D>


        <Text3D font="./fonts/helvetiker_regular.typeface.json"
            position={[
                -1,
                0.7,
                8,
            ]}
            rotation={[0, 0.5, 0]}
            material={titleMesh}
            scale={0.03}
            size={1}
            height={0.2}
            curveSegments={5}
            bevelEnabled
            bevelThickness={0.0}
            bevelSize={0.02}
            bevelOffset={0.0}
            bevelSegments={5}
            maxWidth={2}
        >
            Gameplay Developer {'<Clement DIBOUNE />'}

            <meshStandardMaterial color={'#454545'} />
        </Text3D>

        <Text3D font="./fonts/helvetiker_regular.typeface.json"
            position={[
                -1,
                0.5,
                8,
            ]}
            rotation={[0, 0.5, 0]}
            material={titleMesh}
            scale={0.03}
            size={1}
            height={0.2}
            curveSegments={5}
            bevelEnabled
            bevelThickness={0.0}
            bevelSize={0.02}
            bevelOffset={0.0}
            bevelSegments={5}
            maxWidth={2}
        >
            Statistics Developer {'<Marianne BOUSQUET />'}

            <meshStandardMaterial color={'#454545'} />
        </Text3D>



        <Text3D font="./fonts/helvetiker_regular.typeface.json"
            position={[
                -1,
                0.4,
                8,
            ]}
            rotation={[0, 0.5, 0]}
            material={titleMesh}
            scale={0.03}
            size={1}
            height={0.2}
            curveSegments={5}
            bevelEnabled
            bevelThickness={0.0}
            bevelSize={0.02}
            bevelOffset={0.0}
            bevelSegments={5}
            maxWidth={2}
        >
            Tournament Developer {'<Pierre HARUSPURU />'}

            <meshStandardMaterial color={'#454545'} />
        </Text3D>



        <Text3D font="./fonts/helvetiker_regular.typeface.json"
            position={[
                0.0,
                0.1,
                0
            ]}
            material={titleMesh}
            scale={0.3}
            size={1
            }
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0.0}
            bevelSegments={5}
            onClick={startGame}
            maxWidth={2}
            onPointerEnter={() => {
                setEnableWireframe(false)
                document.body.style.cursor = `pointer`
            }}
            onPointerLeave={() => {
                setEnableWireframe(true)
                document.body.style.cursor = `initial`
            }}>
            GO
            <meshStandardMaterial wireframe={enableWireframe} color={'#f0d000'} />
        </Text3D>

        <Text3D font="./fonts/helvetiker_regular.typeface.json"
            position={[
                4,
                -1,
                0
            ]}
            material={titleMesh}
            scale={0.3}
            size={1
            }
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0.0}
            bevelSegments={5}
            onClick={leaveScene}
            maxWidth={2}
            onPointerEnter={() => {
                setEnableWireframe(false)
                document.body.style.cursor = `pointer`
            }}
            onPointerLeave={() => {
                setEnableWireframe(true)
                document.body.style.cursor = `initial`
            }}>
            Back
            <meshStandardMaterial wireframe={enableWireframe} color={'#f0d000'} />
        </Text3D>

        <Text3D font="./fonts/helvetiker_regular.typeface.json"
            position={[
                -2,
                -2,
                0
            ]}
            material={titleMesh}
            scale={0.3}
            size={1
            }
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0.0}
            bevelSegments={5}
            onClick={() => { setlastState('tournament'); tournamentSelection(); colorChange() }}

            onPointerEnter={() => {
                setEnableWireframe(false)
                document.body.style.cursor = `pointer`
            }}
            onPointerLeave={() => {
                setEnableWireframe(true)
                document.body.style.cursor = `initial`
            }}
            maxWidth={2}>
            Tournament
            <meshStandardMaterial wireframe={enableWireframe} color={'#f0d000'} />
        </Text3D>


        <Text3D font="./fonts/helvetiker_regular.typeface.json"
            position={[
                -3,
                0.5,
                0
            ]}
            material={titleMesh}
            scale={0.3}
            size={1
            }
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0.0}
            bevelSegments={5}
            maxWidth={2}
            onClick={(() => { setlastState('simpleGame'); simpleGameSelection(); setbackgroundFall(""); colorChange() })}
            onPointerEnter={() => {
                setEnableWireframe(false)
                document.body.style.cursor = `pointer`
            }}
            onPointerLeave={() => {
                setEnableWireframe(true)
                document.body.style.cursor = `initial`
            }}>
            Game
            <meshStandardMaterial wireframe={enableWireframe} color={'#f0d000'} />
        </Text3D>



        <mesh
            ref={raquette1}
            geometry={boxGeometry}
            material={raquette1Mesh}
            position={[-1.5, 0, 0.5]}
            receiveShadow
            scale={[0.5 * scale, 2.0 * scale, 0.3 * scale]}>
            <meshMatcapMaterial matcap={raquette1matcap} />
        </mesh>


        <mesh
            ref={raquette2}
            geometry={boxGeometry}
            material={raquette2Mesh}
            position={[-3, -2, 0]}
            receiveShadow
            scale={[0.5 * scale, 2.0 * scale, 0.3 * scale]}>
        </mesh>


        <mesh
            ref={raquette3}
            geometry={boxGeometry}
            position={[-4.0, -0.5, 0.0]}
            // material={raquette3Mesh}
            receiveShadow
            scale={[0.5 * scale, 2.0 * scale, 0.3 * scale]}>
            <meshMatcapMaterial matcap={raquette3matcap} />
        </mesh>


        <mesh
            ref={raquette4}
            geometry={boxGeometry}
            material={raquette4Mesh}
            position={[-3.5, 1.3, 1.0]}
            receiveShadow
            scale={[2.0 * scale, 0.7 * scale, 0.3 * scale]}

        >
        </mesh>

        <mesh
            ref={raquette5}
            geometry={boxGeometry}
            material={raquette5Mesh}
            position={[0.0, -3.0, 0.0]}
            receiveShadow
            scale={[2.0 * scale, 0.7 * scale, 0.3 * scale]}
            onClick={() => setlastState('simpleGame')}
        >

        </mesh>
        <mesh
            ref={raquette6}
            geometry={boxGeometry}
            material={raquette6Mesh}
            position={[1.5, -1, 1.0]}

            scale={[2.0 * scale, 0.7 * scale, 0.3 * scale]}

        >
        </mesh>

        <mesh
            ref={raquette7}
            geometry={boxGeometry}
            material={raquette7Mesh}
            position={[2.0, 3, 0.0]}
            receiveShadow
            scale={[2.0 * scale, 0.7 * scale, 0.3 * scale]}
            onClick={() => setlastState('simpleGame')}
        >

        </mesh>

        {/* 
        <mesh
            geometry={sphereGeometry}
            material={pongMesh}
            position={[0.0, 1.0, 0.0]}
            scale={[0.05 * scale, 0.05 * scale, 0.05 * scale]}
            onPointerOver={() => setActive1(true)} onPointerOut={() => setActive1(false)}
        >
            <Html>Pong</Html>
            <meshStandardMaterial color={active1 ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
        </mesh>


        <mesh
            geometry={sphereGeometry}
            material={goMesh}
            position={[4.2, -3.0, 0.0]}
            scale={[0.05 * scale, 0.05 * scale, 0.05 * scale]}
            onClick={startGame}
            onPointerOver={() => setActive2(true)} onPointerOut={() => setActive2(false)}

        >
            <meshStandardMaterial color={active2 ? 'lightgreen' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
            <Html>Go</Html>
        </mesh> */}

        <mesh ref={backgroundPlane} position={[0, 0, 6]} rotation={[0, 0, 0]} scale={[8, 6, 0.2]}>
            <boxGeometry />
            <meshStandardMaterial color={[1, 1, 1]} toneMapped={false} />
        </mesh>

        <RigidBody type="kinematicPosition" restitution={1.0} friction={0.2}>
            <mesh receiveShadow position={[0, -0.35, 8]} rotation={[-0.3, 0.2, 0, 0]} scale={[4, 0.1, 4]}>
                <boxGeometry />
                <meshStandardMaterial color={[1, 1, 1]} toneMapped={false} />

            </mesh>
        </RigidBody>

        {/* <primitive position={[1.1, -1.7, 1.3]} object={projector} scale={0.007} rotation={[0, 0.95, 0.3]} /> */}

        <InstancedRigidBodies
            ref={cubes}
            type={backgroundFall}
            positions={cubeTransforms.positions}
            rotations={cubeTransforms.rotations}
            scales={cubeTransforms.scales}
        >

            <instancedMesh args={[null, null, cubesCount]} castShadow receiveShadow>
                <boxGeometry />
                <meshStandardMaterial ref={cubesMesh} color="tomato" />
            </instancedMesh>

        </InstancedRigidBodies>


    </>

}




