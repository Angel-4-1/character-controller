import { MeshStandardMaterial } from 'three';
import { randInt } from 'three/src/math/MathUtils';
import { create } from 'zustand'

enum CATGEORIES_NAMES {
  HEAD = "Head",
  HAIR = "Hair",
  FACE = "Face",
  EYES = "Eyes",
  EYEBROWS = "Eyebrows",
  NOSE = "Nose",
  FACIAL_HAIR = "Facial Hair",
  GLASSES = "Glasses",
  HAT = "Hat",
  TOP = "Top",
  BOTTOM = "Bottom",
  SHOES = "Shoes",
  ACCESSORIES = "Accessories",
  OUTFIT = "Outfit",
};

enum CUSTOMIZATION_PALETTES_NAMES {
  SKIN = "skin",
  HAIR = "hair",
  CLOTHES = "clothes",
  EYES = "eyes",
}

const CUSTOMIZATION_PALETTES = [
  {
    id: 0,
    name: CUSTOMIZATION_PALETTES_NAMES.SKIN,
    colors: [
      "#F0D5A1", // Piel clara cálida
      "#F4C6A1", // Piel clara rosada
      "#E8B58B", // Piel clara con subtonos amarillos
      "#D79D6A", // Piel media clara
      "#C68E17", // Piel media cálida
      "#A5744B", // Piel bronceada
      "#9E5B40", // Piel morena clara
      "#7E3F2E", // Piel morena
      "#5C3024", // Piel oscura cálida
      "#3C1F15"  // Piel muy oscura
    ]
  },
  {
    id: 1,
    name: CUSTOMIZATION_PALETTES_NAMES.HAIR,
    colors: [
      "#2E1A47", // Violeta oscuro - ideal para un look audaz
      "#4A2A1D", // Marrón oscuro - color natural y elegante
      "#8E4B3E", // Castaño - tono versátil
      "#B97A4A", // Castaño claro - perfecto para tonos más cálidos
      "#E5C28D", // Rubio oscuro - tono más natural para rubios oscuros
      "#FFD700", // Amarillo dorado - ideal para un estilo más vibrante
      "#F2D64B", // Rubio claro - ideal para un look fresco y soleado
      "#D9A76B", // Cobre cálido - un tono que recuerda al otoño
      "#B05256", // Rojo oscuro - ideal para un look más intenso
      "#6A4E38", // Marrón claro - 
      "#F1A7A0", // Rosa pastel - perfecto para un estilo más suave y juvenil
      "#3C3C3C", // Gris oscuro - adecuado para un look más sofisticado
      "#A9A9A9", // Gris
      "#FF4F58", // Rojo brillante - un tono llamativo y vibrante
      "#1E4D32"  // Verde oscuro - para un estilo más aventurero
    ]
  },
  {
    id: 2,
    name: CUSTOMIZATION_PALETTES_NAMES.CLOTHES,
    colors: [
      "#FFFFFF", // Blanco
      "#000000", // Negro
      "#C0C0C0", // Gris claro
      "#808080", // Gris
      "#D3D3D3", // Gris plata
      "#FF5733", // Rojo anaranjado
      "#FF0000", // Rojo
      "#FF6347", // Tomate (rojo suave)
      "#C70039", // Rojo intenso
      "#900C3F", // Burdeos
      "#F4A300", // Naranja
      "#FFC300", // Amarillo dorado
      "#FFD700", // Amarillo
      "#4CAF50", // Verde hierba
      "#388E3C", // Verde oscuro
      "#03A9F4", // Azul claro
      "#2196F3", // Azul
      "#3F51B5", // Azul profundo
      "#8E24AA", // Morado
      "#9C27B0"  // Púrpura
    ]
  },
  {
    id: 3,
    name: CUSTOMIZATION_PALETTES_NAMES.EYES,
    colors: [
      "#6A4E23", // Marrón oscuro
      "#3B2F2A", // Marrón medio
      "#9E7B56", // Marrón claro
      "#3E5C5B", // Verde grisáceo
      "#4B9F8C", // Verde menta
      "#83C6D2", // Azul claro
      "#2F6496", // Azul oscuro
      "#B8D9E2", // Gris claro
      "#5B4C43", // Avellana
      "#4A4A4A"  // Gris oscuro
    ]
  }
]

const CATEGORIES = [
  {
    id: 0,
    name: CATGEORIES_NAMES.HEAD,
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
  },
  {
    id: 1,
    name: CATGEORIES_NAMES.HAIR,
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
  },
  {
    id: 2,
    name: CATGEORIES_NAMES.FACE,
    parentPath: "models/character/face/",
    assets: [
      {
        model: "FaceMask.glb",
        image: "",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.SKIN),
  },
  {
    id: 3,
    name: CATGEORIES_NAMES.EYES,
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
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.EYES)
  },
  {
    id: 4,
    name: CATGEORIES_NAMES.EYEBROWS,
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
  },
  {
    id: 5,
    name: CATGEORIES_NAMES.NOSE,
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
  },
  {
    id: 6,
    name: CATGEORIES_NAMES.FACIAL_HAIR,
    parentPath: "models/character/facialHair/",
    assets: [
      {
        model: "FacialHair.001.glb",
        image: "",
      }
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.HAIR),
  },
  {
    id: 7,
    name: CATGEORIES_NAMES.GLASSES,
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
      }
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.CLOTHES),
  },
  {
    id: 8,
    name: CATGEORIES_NAMES.HAT,
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
      }
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.CLOTHES),
  },
  {
    id: 9,
    name: CATGEORIES_NAMES.TOP,
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
  },
  {
    id: 10,
    name: CATGEORIES_NAMES.BOTTOM,
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
  },
  {
    id: 11,
    name: CATGEORIES_NAMES.SHOES,
    parentPath: "models/character/shoes/",
    assets: [
      {
        model: "Shoes.001.glb",
        image: "shoes.jpg",
      },
      {
        model: "Shoes.002.glb",
        image: "shoes.jpg",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.CLOTHES),
  },
  {
    id: 12,
    name: CATGEORIES_NAMES.ACCESSORIES,
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
  },
  {
    id: 13,
    name: CATGEORIES_NAMES.OUTFIT,
    parentPath: "models/character/outfit/",
    assets: [
      {
        model: "Outfit.001.glb",
        image: "",
        lockedGroups: [
          CATGEORIES_NAMES.TOP,
          CATGEORIES_NAMES.BOTTOM,
          CATGEORIES_NAMES.SHOES,
        ],
      },
      {
        model: "Outfit.002.glb",
        image: "",
      },
      {
        model: "Outfit.003.glb",
        image: "",
      },
      {
        model: "Outfit.004.glb",
        image: "",
      },
    ],
    colorPalette: findPaletteByName(CUSTOMIZATION_PALETTES_NAMES.CLOTHES),
  },
];

function findAssetByName(categoryName: CATGEORIES_NAMES) {
  // Buscar la categoría por nombre
  const category = CATEGORIES.find(cat => cat.name === categoryName);
  
  // Si la categoría existe y tiene assets, devolver el primer asset
  if (category && category.assets.length > 0) {
    return { asset: category.assets[0], parentPath: category.parentPath }; // Devolver el primer asset de la categoría
  }
  
  // Si no se encuentra la categoría o no tiene assets, retornar un objeto vacio
  return {};
}

function findPaletteByName(paletteName: CUSTOMIZATION_PALETTES_NAMES) {
  const palette = CUSTOMIZATION_PALETTES.find(palette => palette.name === paletteName);

  return palette || {};
}

export const useConfiguratorStore = create((set, get: any) => ({
  categories: CATEGORIES,
  currentCategory: null,
  assets: [],
  lockedGroup: {},
  customization: {
    "Head": { ...findAssetByName(CATGEORIES_NAMES.HEAD) },
    "Hair": { ...findAssetByName(CATGEORIES_NAMES.HAIR) },
    "Face": {  },
    "Eyes": { ...findAssetByName(CATGEORIES_NAMES.EYES) },
    "Eyebrows": { ...findAssetByName(CATGEORIES_NAMES.EYEBROWS) },
    "Nose": { ...findAssetByName(CATGEORIES_NAMES.NOSE) },
    "Facial Hair": { ...findAssetByName(CATGEORIES_NAMES.FACIAL_HAIR) },
    "Glasses": { },
    "Hat": { ...findAssetByName(CATGEORIES_NAMES.HAT) },
    "Top": { ...findAssetByName(CATGEORIES_NAMES.TOP) },
    "Bottom": { ...findAssetByName(CATGEORIES_NAMES.BOTTOM) },
    "Shoes": { ...findAssetByName(CATGEORIES_NAMES.SHOES) },
    "Accessories": { },
  },
  skin: new MeshStandardMaterial({
    color: 0xD79D6A,
    roughness: 1
  }),
  fetchCategories: () => {
    const customization = {};
  },
  download: () => {},
  setDownload: (download: any) => set({ download }),
  updateColor: (color: any) => {
    set((state: any) => ({
      customization: {
        ...state.customization,
        [state.currentCategory.name]: {
          ...state.customization[state.currentCategory.name],
          color,
        }
      }
    }));
    if( get().currentCategory.name === CATGEORIES_NAMES.HEAD) {
      get().updateSkin( color );
    }
  },
  updateSkin: (color: any) => {
    get().skin.color.set( color );
  },
  setCurrentCategory: (category: any) => set({ currentCategory: category }),
  changeAsset: (category: any, asset: any, parentPath: any) => {
    set((state: any) => ({
      customization: {
        ...state.customization,
        [category]: {
          ...state.customization[category],
          parentPath,
          asset,
          categoryName: category,
        }
      }
    }))
    get().applyLockedAssets();
  },
  randomize: () => {
    const customization = {};
    get().categories.forEach((category: any) => {
      let randomAsset = category.assets[randInt(0, category.assets.length - 1)];
      if (category.removable) {
        if (randInt(0, category.assets.length - 1) === 0) {
          randomAsset = null;
        }
      }
      const randomColor =
        category.colorPalette?.colors?.[
          randInt(0, category.colorPalette.colors.length - 1)
        ];
      // @ts-ignore
      customization[category.name] = {
        asset: randomAsset,
        color: randomColor,
        parentPath: category.parentPath,
      };
      if (category.name === "Head") {
        get().updateSkin(randomColor);
      }
    });
    set({ customization });
    get().applyLockedAssets();
  },
  applyLockedAssets: () => {
    const customization = get().customization;
    const categories = get().categories;
    const lockedGroups = {};

    Object.values(customization).forEach((category: any) => {
      console.log( category )
      if (category.asset?.lockedGroups) {
        category.asset.lockedGroups.forEach((categoryName: CATGEORIES_NAMES) => {
          if (!lockedGroups[categoryName]) {
            lockedGroups[categoryName] = [];
          }

          lockedGroups[categoryName].push({
            name: category.asset.model,
            lockedBy: category.categoryName,
          });
        });
      }
    });

    set({ lockedGroups });
  },
}))