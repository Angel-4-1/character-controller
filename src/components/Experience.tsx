// @ts-nocheck
import {
  Environment,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";
import { Map } from "./Map";
import { Physics } from "@react-three/rapier";
import { CharacterController } from "./CharacterController";

const maps = {
  castle_on_hills: {
    scale: 3,
    position: [-6, -10, 0],
  },
  animal_crossing_map: {
    scale: 20,
    position: [-15, -5, 10],
  },
  city_scene_tokyo: {
    scale: 0.72,
    position: [0, -5, -3.5],
  },
  de_dust_2_with_real_light: {
    scale: 0.3,
    position: [-5, -3, 13],
  },
  medieval_fantasy_book: {
    scale: 0.4,
    position: [-4, -5, -6],
  },
};

export const Experience = () => {
  const shadowCameraRef = useRef();
  const { map } = useControls("Map", {
    map: {
      value: "castle_on_hills",
      options: Object.keys(maps),
    },
  });

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
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>
      <Physics debug key={map}>
        <Map
          scale={maps[map].scale}
          position={maps[map].position}
          model={`models/${map}.glb`}
        />
        <CharacterController />
      </Physics>
    </>
  );
};
