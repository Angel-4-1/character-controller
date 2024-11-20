import React, { useEffect, useMemo } from 'react'
import { useGLTF } from "@react-three/drei"
import { useConfiguratorStore } from '~/store';

export const Asset = ({
  url, skeleton, categoryName
}: {
  url: string,
  skeleton: any,
  categoryName: any
}) => {
  const { scene } = useGLTF( url );

  const customization = useConfiguratorStore((state: any) => state.customization);
  const lockedGroups = useConfiguratorStore((state: any) => state.lockedGroups);

  const assetColor = customization[categoryName].color;

  const skin = useConfiguratorStore((state: any) => state.skin);

  useEffect(() => {
    scene.traverse((child) => {
      // @ts-ignore
      if (child.isMesh) {
        // @ts-ignore
        if (child.material?.name.includes("Color_")) {
          // @ts-ignore
          child.material.color.set(assetColor);
        }
      }
    });
  }, [assetColor, scene]);

  const attachedItems = useMemo(() => {
    const items: any = [];
    scene.traverse((child) => {
      // @ts-ignore
      if (child.isMesh) {
        items.push({
          // @ts-ignore
          geometry: child.geometry,
          // @ts-ignore
          material: child.material.name.includes("Skin_")
            ? skin
            // @ts-ignore
            : child.material,
          // morphTargetDictionary: child.morphTargetDictionary,
          // morphTargetInfluences: child.morphTargetInfluences,
        });
      }
    });
    return items;
  }, [scene]);

  if (lockedGroups && lockedGroups[categoryName]) {
    return null;
  }

  return attachedItems.map((item: any, index: number) => (
    <skinnedMesh
      key={index}
      skeleton={skeleton}
      geometry={item.geometry}
      material={item.material}
      castShadow
      receiveShadow
    />
  ));
}