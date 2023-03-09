import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import './style.css'
import { Perf } from 'r3f-perf'
import { Environment } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas>
 
        <Perf/>
        <Environment preset="city"></Environment>
        <Experience  shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 2,
            position: [ 2.5, 4, 6 ]
        } }/>
    </Canvas>
       
  
)