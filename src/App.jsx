import { Unity, useUnityContext } from "react-unity-webgl";
import React from "react";

function App() {

    const { unityProvider } = useUnityContext({
        loaderUrl: "./MyGame/Build/PongGameV3.loader.js",
        dataUrl: "./MyGame/Build/PongGameV3.data",
        frameworkUrl: "./MyGame/Build/PongGameV3.framework.js",
        codeUrl: "./MyGame/Build/PongGameV3.wasm",
    });

    return <>
        <Unity unityProvider={unityProvider}
        style={{
            width:"100%",
            height:"100%",
        }} />
    </>


}
export default App;