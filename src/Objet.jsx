import * as THREE from 'three'
import { Center, Text3D, useFBX, useMatcapTexture, useCursor, GradientTexture, Html, Float } from '@react-three/drei'
import { useEffect, useMemo, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'




//Geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const sphereGeometry = new THREE.SphereGeometry(15, 32, 16)

// Mesh
const titleMesh = new THREE.MeshMatcapMaterial({ color: 'lightgreen' })
const raquette1Mesh = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const raquette2Mesh = new THREE.MeshStandardMaterial({ color: 'red' })
const raquette3Mesh = new THREE.MeshStandardMaterial({ color: 'yellow' })
const tournamentMesh = new THREE.MeshStandardMaterial({ color: 'blue' })
const simpleGameMesh = new THREE.MeshStandardMaterial({ color: 'gold' })
const pongMesh = new THREE.MeshBasicMaterial({ color: 'orange' })
const goMesh = new THREE.MeshBasicMaterial({ color: 'lightblue' })

//General Scale
const scale = 0.7



export default function objet() {

    //Import projector
    const projector = useFBX('./object/projector.fbx')

    // Animation for raquettes
    const raquette1 = useRef()
    const raquette2 = useRef()
    const raquette3 = useRef()
    const tournament = useRef()
    const simpleGame = useRef()

    // Création d'une variable aléatoire avec une vitesse min de 0.2 avec une multiplication par -1 si inférieur à 0.5 pour faire une rotation inversée
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    // Animation des raquettes
    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()
        const raquette1y = Math.sin(time + timeOffset) / 200
        const raquette3y = Math.sin(time) / 120
        const tournamentx = Math.sin(time) / 210
        const simpleGamez = Math.sin(time) / 200
        raquette1.current.position.y += raquette1y
        raquette2.current.rotation.y += delta
        raquette3.current.position.y += raquette3y
        tournament.current.position.x += tournamentx
        simpleGame.current.position.z += simpleGamez

    })

    // Animation balles
    // Animation balle Pong
    const [active1, setActive1] = useState(false)
    useCursor(active1)
    // Animation balle Pong
    const [active2, setActive2] = useState(false)
    useCursor(active2)

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


    // Gestion de la musique
    // utilisation de useState pour définir le moment du lancement de la musique
    const [music, setMusic] = useState(false);
    const audio = new Audio('./sounds/Survivor-EyeOfTheTiger.mp3')


    const handleMouseEnter = () => {
        console.log("Au moment d'entrée + " + music)
        if (music == false) {
            audio.play()
            setMusic(true)
            //   console.log("c'est good")
        }
    };

    const handleMouseLeave = () => {
        //console.log("avant de sortir + " + music)
        if (music == true) {
            audio.pause();
            setMusic(false);

            console.log(music)

            // console.log("une fois sorti + " + music)
        }


    };


    return <>
        <Float>
            <Center disableY>
                <Text3D font="./fonts/helvetiker_regular.typeface.json"
                    position={[
                        0,
                        2.2,
                        0
                    ]}
                    material={titleMesh}
                    scale={1}
                    size={1
                    }
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0.0}
                    bevelSegments={5}>
                    SPRING
                </Text3D>
            </Center>
        </Float>


        <mesh
            ref={raquette1}
            geometry={boxGeometry}
            material={raquette1Mesh}
            position={[-1.5, -1, 0.5]}
            receiveShadow
            scale={[0.5 * scale, 2.0 * scale, 0.3 * scale]}>
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
            position={[-6.0, 0.0, 0.0]}
            material={raquette3Mesh}
            receiveShadow
            scale={[0.5 * scale, 2.0 * scale, 0.3 * scale]}>
        </mesh>

        <mesh
            ref={tournament}
            geometry={boxGeometry}
            material={tournamentMesh}
            position={[-3.5, 1.0, 1.0]}
            receiveShadow
            scale={[2.0 * scale, 0.7 * scale, 0.3 * scale]}
            onClick={() => setlastState('tournament')}
            onPointerOver={handleMouseEnter} onPointerOut={handleMouseLeave}
        >
            <Html>Tournament</Html>
        </mesh>

        <mesh
            ref={simpleGame}
            geometry={boxGeometry}
            material={simpleGameMesh}
            position={[0.0, -3.0, 0.0]}
            receiveShadow
            scale={[2.0 * scale, 0.7 * scale, 0.3 * scale]}
            onClick={() => setlastState('simpleGame')}
        >
            <Html>Simple Game</Html>
        </mesh>

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
        </mesh>

        <primitive position={[1.1, -1.7, 1.3]} object={projector} scale={0.007} rotation={[0, 0.95, 0.3]} />

    </>
}




