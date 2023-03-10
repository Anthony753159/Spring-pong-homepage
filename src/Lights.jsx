import { SpotLight,SpotLightShadow } from "@react-three/drei"
import { useRef } from "react"
import { SpotLightHelper } from "three"


export default function Lights() {
    const light = useRef()

    return <>
        <directionalLight
            ref={light}
            castShadow
            position={[4, 4, 1]}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={10}
            shadow-camera-right={10}
            shadow-camera-bottom={- 10}
            shadow-camera-left={- 10}
        />
        <ambientLight intensity={0.5} />

        <directionalLight
            castShadow
            position={[4, 4, 9]}
            intensity={0.5}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={10}
            shadow-camera-right={10}
            shadow-camera-bottom={- 10}
            shadow-camera-left={- 10}
        />

        
        
       
    </>
}