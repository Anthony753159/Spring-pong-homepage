import * as THREE from 'three'
import { useEffect, useState, useRef } from 'react'
import Music from './Music'


export default function Video() {
    const [video] = useState(() => Object.assign(document.createElement('video'), { src: './videos/pong.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
    useEffect(() => void video.play(), [video])
    return (
      <mesh position={[3.7, 0.8, 0]} rotation={[0, -0.3, 0]} scale={[3.4, 2, 0.2]}>
        <planeGeometry />
        <meshBasicMaterial toneMapped={false} reflectivity= {true}>
          <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
         
        </meshBasicMaterial>
        
      </mesh>
    )
  }
  