import { findCameraPlacementByCategoryName } from "./cameraPlacements";
import { CATEGORIES_NAMES, Category, CUSTOMIZATION_PALETTES_NAMES, FindAssetByName } from "./contract";
import { findPaletteByName } from "./customizationPalettes";

const outfitLockedGroups = [
  CATEGORIES_NAMES.HAIR,
  CATEGORIES_NAMES.TOP,
  CATEGORIES_NAMES.BOTTOM,
  CATEGORIES_NAMES.SHOES,
];

export const CATEGORIES: Category[] = [
  {
    id: 0,
    name: CATEGORIES_NAMES.HEAD,
    parentPath: "models/character/head/",
    assets: [
      {
        model: "Head.001.glb",
        image: "head.jpg",
      },
      {
        model: "Head.002.glb",
        image: "head.jpg",
      },
      {
        model: "Head.003.glb",
        image: "head.jpg",
      },
      {
        model: "Head.004.glb",
        image: "head.jpg",
      },
      {
        model: "PumpkinHead.glb",
        image: "head.jpg",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.SKIN),
    cameraPlacement: findCameraPlacementByCategoryName(CATEGORIES_NAMES.HEAD),
  },
  {
    id: 1,
    name: CATEGORIES_NAMES.HAIR,
    parentPath: "models/character/hair/",
    assets: [
      {
        model: "Hair.001.glb",
        image: "hair.jpg",
      },
      {
        model: "Hair.002.glb",
        image: "hair.jpg",
      },
      {
        model: "Hair.003.glb",
        image: "hair.jpg",
      },
      // {
      //   model: "Hair.004.glb",
      //   image: "hair.jpg",
      // },
      {
        model: "Hair.005.glb",
        image: "hair.jpg",
      },
      {
        model: "Hair.006.glb",
        image: "hair.jpg",
      },
      {
        model: "Hair.007.glb",
        image: "hair.jpg",
      },
      {
        model: "Hair.008.glb",
        image: "hair.jpg",
      },
      {
        model: "Hair.009.glb",
        image: "hair.jpg",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.HAIR),
    removable: true,
    cameraPlacement: findCameraPlacementByCategoryName(CATEGORIES_NAMES.HAIR),
  },
  {
    id: 2,
    name: CATEGORIES_NAMES.FACE,
    parentPath: "models/character/face/",
    assets: [
      {
        model: "FaceMask.glb",
        image: "",
      },
      {
        model: "Face.001.glb",
        image: "",
      },
      {
        model: "Face.002.glb",
        image: "",
      },
      {
        model: "Face.003.glb",
        image: "",
      },
      {
        model: "Face.004.glb",
        image: "",
      },
      {
        model: "Face.005.glb",
        image: "",
      },
      {
        model: "Face.006.glb",
        image: "",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.SKIN),
    cameraPlacement: findCameraPlacementByCategoryName(CATEGORIES_NAMES.HEAD),
  },
  {
    id: 3,
    name: CATEGORIES_NAMES.EYES,
    parentPath: "models/character/eyes/",
    assets: [
      {
        model: "Eyes.001.glb",
        image: "eyes.jpg",
      },
      {
        model: "Eyes.002.glb",
        image: "eyes.jpg",
      },
      {
        model: "Eyes.003.glb",
        image: "eyes.jpg",
      },
      {
        model: "Eyes.004.glb",
        image: "eyes.jpg",
      },
      {
        model: "Eyes.005.glb",
        image: "eyes.jpg",
      },
      {
        model: "Eyes.006.glb",
        image: "eyes.jpg",
      },
      {
        model: "Eyes.007.glb",
        image: "eyes.jpg",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.EYES),
    cameraPlacement: findCameraPlacementByCategoryName(CATEGORIES_NAMES.HEAD),
  },
  {
    id: 4,
    name: CATEGORIES_NAMES.EYEBROWS,
    parentPath: "models/character/eyebrows/",
    assets: [
      {
        model: "Eyebrow.001.glb",
        image: "eyebrows.jpg",
      },
      {
        model: "Eyebrow.002.glb",
        image: "eyebrows.jpg",
      },
      {
        model: "Eyebrow.003.glb",
        image: "eyebrows.jpg",
      },
      {
        model: "Eyebrow.004.glb",
        image: "eyebrows.jpg",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.HAIR),
    cameraPlacement: findCameraPlacementByCategoryName(CATEGORIES_NAMES.HEAD),
  },
  {
    id: 5,
    name: CATEGORIES_NAMES.NOSE,
    parentPath: "models/character/nose/",
    assets: [
      {
        model: "Nose.001.glb",
        image: "nose.jpg",
      },
      {
        model: "Nose.002.glb",
        image: "nose.jpg",
      },
      {
        model: "Nose.003.glb",
        image: "nose.jpg",
      },
      {
        model: "Nose.004.glb",
        image: "nose.jpg",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.SKIN),
    cameraPlacement: findCameraPlacementByCategoryName(CATEGORIES_NAMES.HEAD),
  },
  {
    id: 6,
    name: CATEGORIES_NAMES.FACIAL_HAIR,
    parentPath: "models/character/facialHair/",
    assets: [
      {
        model: "FacialHair.001.glb",
        image: "",
      },
      {
        model: "FacialHair.002.glb",
        image: "",
      },
      {
        model: "FacialHair.003.glb",
        image: "",
      },
      {
        model: "FacialHair.004.glb",
        image: "",
      },
      {
        model: "FacialHair.005.glb",
        image: "",
      },
      {
        model: "FacialHair.006.glb",
        image: "",
      },
      {
        model: "FacialHair.007.glb",
        image: "",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.HAIR),
    removable: true,
    cameraPlacement: findCameraPlacementByCategoryName(CATEGORIES_NAMES.HEAD),
  },
  {
    id: 7,
    name: CATEGORIES_NAMES.GLASSES,
    parentPath: "models/character/glasses/",
    assets: [
      {
        model: "Glasses.001.glb",
        image: "",
      },
      {
        model: "Glasses.002.glb",
        image: "",
      },
      {
        model: "Glasses.003.glb",
        image: "",
      },
      {
        model: "Glasses.004.glb",
        image: "",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.CLOTHES),
    removable: true,
    cameraPlacement: findCameraPlacementByCategoryName(CATEGORIES_NAMES.HEAD),
  },
  {
    id: 8,
    name: CATEGORIES_NAMES.HAT,
    parentPath: "models/character/hat/",
    assets: [
      {
        model: "Hat.001.glb",
        image: "crown.png",
      },
      {
        model: "Hat.002.glb",
        image: "crown.png",
      },
      {
        model: "Hat.003.glb",
        image: "crown.png",
      },
      {
        model: "Hat.004.glb",
        image: "crown.png",
      },
      {
        model: "Hat.005.glb",
        image: "crown.png",
      },
      {
        model: "Hat.006.glb",
        image: "crown.png",
      },
      {
        model: "Hat.007.glb",
        image: "crown.png",
      }
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.CLOTHES),
    removable: true,
    cameraPlacement: findCameraPlacementByCategoryName(CATEGORIES_NAMES.HAIR),
  },
  {
    id: 9,
    name: CATEGORIES_NAMES.TOP,
    parentPath: "models/character/top/",
    assets: [
      {
        model: "Top.001.glb",
        image: "top.jpg",
      },
      {
        model: "Top.002.glb",
        image: "top.jpg",
      },
      {
        model: "Top.003.glb",
        image: "top.jpg",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.CLOTHES),
    cameraPlacement: findCameraPlacementByCategoryName(CATEGORIES_NAMES.TOP),
  },
  {
    id: 10,
    name: CATEGORIES_NAMES.BOTTOM,
    parentPath: "models/character/bottom/",
    assets: [
      {
        model: "Bottom.001.glb",
        image: "bottom.jpg",
      },
      {
        model: "Bottom.002.glb",
        image: "bottom.jpg",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.CLOTHES),
    cameraPlacement: findCameraPlacementByCategoryName(CATEGORIES_NAMES.BOTTOM),
  },
  {
    id: 11,
    name: CATEGORIES_NAMES.SHOES,
    parentPath: "models/character/shoes/",
    assets: [
      {
        model: "Shoes.002.glb",
        image: "shoes.jpg",
      },
      {
        model: "Shoes.001.glb",
        image: "shoes.jpg",
      },
      {
        model: "Shoes.003.glb",
        image: "shoes.jpg",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.CLOTHES),
    removable: true,
    cameraPlacement: findCameraPlacementByCategoryName(CATEGORIES_NAMES.SHOES),
  },
  {
    id: 12,
    name: CATEGORIES_NAMES.ACCESSORIES,
    parentPath: "models/character/accessories/",
    assets: [
      {
        model: "Earring.001.glb",
        image: "",
      },
      {
        model: "Earring.002.glb",
        image: "",
      },
      {
        model: "Earring.003.glb",
        image: "",
      },
      {
        model: "Earring.004.glb",
        image: "",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.CLOTHES),
    removable: true,
  },
  {
    id: 13,
    name: CATEGORIES_NAMES.OUTFIT,
    parentPath: "models/character/outfit/",
    assets: [
      {
        model: "Outfit.001.glb",
        image: "Outfit.001.png",
        lockedGroups: outfitLockedGroups,
      },
      {
        model: "Outfit.002.glb",
        image: "",
        lockedGroups: outfitLockedGroups,
      },
      {
        model: "Outfit.003.glb",
        image: "",
        lockedGroups: outfitLockedGroups,
      },
      {
        model: "Outfit.004.glb",
        image: "",
        lockedGroups: outfitLockedGroups,
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.CLOTHES),
    removable: true,
  },
];

export function findAssetByName(categoryName: CATEGORIES_NAMES): FindAssetByName {
  // Find category by name
  const category = CATEGORIES.find(cat => cat.name === categoryName);
  
  // If category exists and has assets, return the first one
  if (category && category.assets.length > 0) {
    return { asset: category.assets[0], parentPath: category.parentPath };
  }
  
  return {};
};