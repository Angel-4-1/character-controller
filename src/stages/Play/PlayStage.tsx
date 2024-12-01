import React, { useEffect, useState } from "react"
import {
  Environment,
  OrthographicCamera,
} from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";
import { Physics } from "@react-three/rapier";
import { Map } from "~/components/Map";
import { CharacterController } from "~/components/CharacterController";

export const maps = {
  castle_on_hills: {
    scale: 3,
    position: [-6, -15, 0],
  },
  animal_crossing_map: {
    scale: 20,
    position: [-15, -15, 10],
  },
  city_scene_tokyo: {
    scale: 0.72,
    position: [0, -15, -3.5],
  },
  de_dust_2_with_real_light: {
    scale: 0.3,
    position: [-5, -15, 13],
  },
  medieval_fantasy_book: {
    scale: 0.4,
    position: [-4, -15, -6],
  },
};

export const PlayStage = () => {
  const shadowCameraRef = useRef();
  const { map } = useControls("Map", {
    map: {
      value: "castle_on_hills",
      options: Object.keys(maps),
    },
  });

  const [showCharacter, setShowCharacter] = useState( false);

  useEffect(() => {
    const waitForCharacter = () => {
      setShowCharacter( true )
    };

    const timeoutId = setTimeout(waitForCharacter, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {/* <OrbitControls /> */}
      <Environment preset="sunset" />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          // @ts-ignore
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>
      <Physics key={map}>
        <Map
          // @ts-ignore
          scale={maps[map].scale}
          // @ts-ignore
          position={maps[map].position}
          model={`models/${map}.glb`}
        />
        { showCharacter && <CharacterController /> }
      </Physics>
    </>
  );
};
