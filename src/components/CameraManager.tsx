import React, { useEffect, useRef } from "react"
import { CameraControls, OrbitControls } from "@react-three/drei"
import { useControls, button } from "leva";
import { useConfiguratorStore } from "~/store";
import { UI_MODES } from "~/store/uiModes";

export const CAMERA_DEFAULTS = {
  position: [-3.6, 1, 4.4],
  target: [-0.8, -0.2, -1],
};
// export const CAMERA_DEFAULTS = {
//   position: [-1, 1, 5],
//   target: [0, 0, 0],
// };

export const CameraManager = () => {
  const controls = useRef<any>();
  const currentCategory = useConfiguratorStore((state) => state.currentCategory);
  const mode = useConfiguratorStore((state) => state.mode);

  useControls({
    getCameraPosition: button(() => {
      console.log("Camera Position", [...controls.current.getPosition()])
    }),
    getCameraTarget: button(() => {
      console.log("Camera Target", [...controls.current.getTarget()])
    }),
  });

  useEffect(() => {
    if (mode === UI_MODES.CUSTOMIZE && currentCategory?.cameraPlacement) {
      controls.current.setLookAt(
        ...currentCategory.cameraPlacement.position,
        ...currentCategory.cameraPlacement.target,
        true
      );
    } else {
      controls.current.setLookAt(
        ...CAMERA_DEFAULTS.position,
        ...CAMERA_DEFAULTS.target,
        true
      );
    }
  }, [currentCategory, mode])

  return (
    <CameraControls
      ref={controls} 
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
      // minAzimuthAngle={-Math.PI / 4}
      // maxAzimuthAngle={Math.PI / 4}
      minDistance={2}
      maxDistance={8}
      // Disable mouse interaction
      mouseButtons={
        {
          left: 0, // 0 = NONE
          right: 0,
          wheel: 16, // 16 = ZOOM
          middle: 0,
        }
      }
    />
  )
}