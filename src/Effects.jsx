import { Bloom, SSR, DepthOfField, EffectComposer } from "@react-three/postprocessing"
export default function Effects() {
    return <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={ 0.1 }
          luminanceThreshold={ 0 }/>
     
         
    </EffectComposer>
}