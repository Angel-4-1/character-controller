import './style.css'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import ExperienceLegacy from './Experience'
import { KeyboardControls, useProgress } from '@react-three/drei'
import Show from './components/Show'
import Interface from './Interface'
import { Experience } from './components/Experience'
import CharacterCustomizationInterface from './stages/CharacterCustomization/CharacterCustomizationInterface'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

const root = ReactDOM.createRoot(document.getElementById('root')!)

function AppOld() {
  const { progress } = useProgress();

  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <ExperienceLegacy />
        

        {/* <Show when={progress === 100}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Show> */}
      </Canvas>

    <Interface />
    {/* <Show when={progress === 100}>
      <Interface />
    </Show> */}
    </>
  )
}

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
  { name: "jump", keys: ["Space"] },
];

function AppForMap() {
  return (
    <KeyboardControls map={keyboardMap}>
      {/* <CharacterCustomizationInterface /> */}
      <Canvas
        shadows
        camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}
        style={{
          touchAction: "none"
        }}
        >
        <color attach="background" args={["#ececec"]} />
        <ExperienceLegacy />
      </Canvas>
      <Interface />
    </KeyboardControls>
  );
}

function App() {
  return (
    <KeyboardControls map={keyboardMap}>
      {/* <CharacterCustomizationInterface /> */}
      <Canvas
        shadows
        camera={{ position: [500, 100, 1000], near: 0.1, fov: 45 }}
        style={{
          touchAction: "none"
        }}
        gl={{
          preserveDrawingBuffer: true,
        }}
        >
        <color attach="background" args={["#130f30"]} />
        <fog attach="fog" args={["#130f30", 10, 40]}/>
        
        <ExperienceLegacy />

        {/* <EffectComposer>
          <Bloom
            mipmapBlur
            // luminanceThreshold={1.2}
            intensity={5}
          />
        </EffectComposer> */}

      </Canvas>
      <Interface />
    </KeyboardControls>
  );
}

root.render(
  <App />
)
