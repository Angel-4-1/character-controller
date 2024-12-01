import React, { Suspense, useEffect, useRef } from 'react'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { useConfiguratorStore } from '~/store';
import { Asset } from './Asset';
import { GLTFExporter } from 'three-stdlib';
import { dedup, draco, prune, quantize } from '@gltf-transform/functions';
import { NodeIO } from '@gltf-transform/core';

const MODEL_PATH = 'models/character/Armature.glb';
const IDLE_ANIMATION_PATH = 'models/character/Idle.fbx';
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

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {Object.keys(customization).map(
            (key) => customization[key]?.asset?.model && (
              <Suspense key={customization[key]?.asset?.model}>
                {/* 
                //@ts-ignore */}
                <Asset
                  categoryName={key}
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