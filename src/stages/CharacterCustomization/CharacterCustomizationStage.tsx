import { Backdrop, Environment, OrbitControls, SoftShadows } from "@react-three/drei"
import React from "react"
import { Avatar } from "~/components/Avatar"

const Lights = () => {
  return (
    <>
      {/* Key Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Fill Light */}
      <directionalLight position={[-5, 5, 5]} intensity={0.7} />

      {/* Back Lights */}
      <directionalLight position={[3, 3, -5]} intensity={6} color={"#ff3b3b"} />
      <directionalLight
        position={[-3, 3, -5]}
        intensity={8}
        color={"#3cb1ff"}
      />
    </>
  )
}

export default function CharacterCustomizationStage()
{
    return <>
      <OrbitControls 
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
      <Environment preset="sunset" environmentIntensity={0.3} />

      <Backdrop scale={[50,10,5]} floor={1.5} receiveShadow position-z={-4}>
        <meshStandardMaterial color="#555" />
      </Backdrop>

      <SoftShadows size={52} samples={16} />

      <Lights />

      

      <Avatar />
    </>
}