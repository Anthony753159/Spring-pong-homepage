
import * as THREE from 'three'
import { ScreenQuad, Cloud, Float, OrbitControls, useMatcapTexture, Center, Text3D, Sky, Stage, useFBX, Environment } from '@react-three/drei'
import Objet from './Objet.jsx'
import Lights from './Lights.jsx'
import Video from './Video.jsx'


export default function Experience() {
    const material = new THREE.MeshMatcapMaterial({ color: 'lightgreen' })


    return <>

   
        <OrbitControls />
        {/* <Float> */}
        <Objet />
        {/* <Cloud /> */}
        {/* </Float> */}
        <Lights />
        <Video />
     

    </>



}