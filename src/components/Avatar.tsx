import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { useConfiguratorStore } from '~/store';
import { Asset } from './Asset';
import { GLTFExporter } from 'three-stdlib';
import { dedup, draco, prune, quantize } from '@gltf-transform/functions';
import { NodeIO } from '@gltf-transform/core';

const MODEL_PATH = 'models/character/Armature.glb';
const ANIMATION_PATH = 'models/character/animations/animations.glb';

export const Avatar = (props: any) => {
  const group = useRef();
  const { nodes } = useGLTF(MODEL_PATH);
  
  const customization = useConfiguratorStore((state) => state.customization);
  
  // Animations
  // const { animations } = useFBX(IDLE_ANIMATION_PATH);
  const { animations } = useGLTF(ANIMATION_PATH);
  const { actions } = useAnimations( animations, group );

  // Pose
  const pose = useConfiguratorStore((state) => state.pose);

  useEffect(() => {
    // actions["Idle"]?.play();
    actions[pose || "Idle"]?.fadeIn(0.2).play();
    
    return () => {
      actions[pose]?.fadeOut(0.2).stop()
    };
  }, [animations, pose])

  // Download
  const setDownload = useConfiguratorStore((state) => state.setDownload);

  useEffect(() => {
    function download() {
      const exporter = new GLTFExporter();
      exporter.parse(
        // We only want to export the Avatar, so we use the group reference
        // @ts-ignore
        group.current,

        async function (result) {
          const io = new NodeIO();

          // Read
          // @ts-ignore
          const document = await io.readBinary(new Uint8Array(result)); // Uint8Array → Document
          await document.transform(
            // Remove unused nodes, textures, or other data.
            prune(),
            // Remove duplicate vertex or texture data, if any.
            dedup(),
            // Compress mesh geometry with Draco.
            draco(),
            // Quantize mesh geometry.
            quantize()
          );

          // Write.
          const glb = await io.writeBinary(document); // Document → Uint8Array

          save(
            new Blob([glb], { type: "application/octet-stream" }),
            `avatar_${+new Date()}.glb`

            // @ts-ignore
            // new Blob([result], { type: "application/octet-stream" }),
            // `avatar_${+new Date()}.glb`
          );
        },

        function (error) {
          console.error(error);
        },
        
        { binary: true }
      );
    }

    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link); // Firefox workaround

    function save(blob: Blob, filename: string) {
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
    
    setDownload(download);
  }, []);


  /* Rotate model based on mouse click and drag */
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startRotation, setStartRotation] = useState(0);
  const [initialMousePosition, setInitialMousePosition] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const handleMouseMove = (event: MouseEvent) => {
    if (!isMouseDown) return;

    const x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize into to a range [-1, 1]
    setMousePosition({ x, y: 0 });

    if (!hasMoved) {
      setHasMoved(true); // The mouse has moved
    }
  };

  const handleMouseDown = (event: MouseEvent) => {
    setIsMouseDown(true);

    // Save mosue position
    const initialX = (event.clientX / window.innerWidth) * 2 - 1;
    setInitialMousePosition(initialX);

    // Save intial rotation
    // @ts-ignore
    setStartRotation(group.current?.rotation.y || 0);

    // Right now the mouse is only clicked, not moving
    setHasMoved(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setHasMoved(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMouseDown, hasMoved]);

  useEffect(() => {
    // Rotate the object horizontally (Y axis) and store the actual rotation
    if (group.current && isMouseDown && hasMoved) {
      const rotationSpeed = 3;

      const deltaX = mousePosition.x - initialMousePosition;
      const newRotation = startRotation + deltaX * rotationSpeed;

      // @ts-ignore
      group.current.rotation.y = newRotation;
    }
  }, [mousePosition, isMouseDown, startRotation, initialMousePosition, hasMoved]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {Object.keys(customization).map(
            // @ts-ignore
            (key) => customization[key]?.asset?.model && (
              // @ts-ignore
              <Suspense key={customization[key]?.asset?.model}>
                {/* 
                //@ts-ignore */}
                <Asset
                  categoryName={key}
                  // @ts-ignore
                  url={customization[key]?.parentPath + customization[key]?.asset?.model} skeleton={nodes.Plane.skeleton}/>
              </Suspense>
            )
          )}
        </group>
      </group>
    </group>
  )
}

// useGLTF.preload(MODEL_PATH);