import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import './style.css'
import { Perf } from 'r3f-perf'
import { Environment } from '@react-three/drei'
import { RotationOps } from '@dimforge/rapier3d-compat'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
    shadows
    camera={ {
        fov: 60,
        near: 0.3,
        far: 30,
        position: [ -0.0, 0.3 , 10.0 ]
       
    } }
  >
 
        {/* <Perf/> */}
        <Experience  shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 2,
            position: [ 8, 4, 10 ]
        } }/>
        
    </Canvas>
       
  
)