
import * as THREE from 'three'
import { OrthographicCamera, ContactShadows, RandomizedLight, SpotLight, Stars, ScreenQuad, Cloud, Float, OrbitControls, useMatcapTexture, Center, Text3D, Sky, Stage, useFBX, Environment, SoftShadows, CubeCamera } from '@react-three/drei'
import Objet from './Objet.jsx'
import Lights from './Lights.jsx'
import Video from './Video.jsx'
import Effects from './Effects.jsx'
import { Physics, Debug } from '@react-three/rapier'
import Music from './Music.jsx'
import PongGame from './App.jsx'






export default function Experience() {
    

    return <>

        <Effects />
        {/* <OrbitControls /> */}
        {/* <OrthographicCamera/> */}
        <Physics
            gravity={[0, -2, 0]} >
            <Objet />
            <Lights />
            <Video />
            
        </Physics>
        

         
    </>



}