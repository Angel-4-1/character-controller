import { MeshStandardMaterial } from "three";

export enum CUSTOMIZATION_PALETTES_NAMES {
  SKIN = "skin",
  HAIR = "hair",
  CLOTHES = "clothes",
  EYES = "eyes",
}

export interface CustomizationPalette {
  id: number;
  name: CUSTOMIZATION_PALETTES_NAMES;
  colors: string[];
}

export enum CATEGORIES_NAMES {
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
}

export interface CategoryAsset {
  model: string;
  image: string;
  lockedGroups?: CATEGORIES_NAMES[];
}

export interface Category {
  id: number;
  name: CATEGORIES_NAMES;
  parentPath: string;
  assets: CategoryAsset[];
  colorPalette?: CustomizationPalette;
  removable?: boolean;
}

export interface FindAssetByName {
  asset?: CategoryAsset;
  parentPath?: string
}

type CustomizationValue = { 
  asset: CategoryAsset; 
  parentPath: string; 
} | {};

type LockedGroupItem = {
  name: string;
  lockedBy: string;
};

export interface ConfiguratorStore {
  /* State */
  categories: Category[];
  currentCategory: Category | null;
  lockedGroups: {
    [key in CATEGORIES_NAMES]?: LockedGroupItem[];
  };
  customization: {
    [key in CATEGORIES_NAMES]?: CustomizationValue;
  };
  skin: MeshStandardMaterial;

  /* Actions */
  download: () => void;
  setDownload: (download: () => void) => void;
  updateColor: (color: string) => void;
  updateSkin: (color: string) => void;
  setCurrentCategory: (category: Category) => void;
  changeAsset: (
    category: CATEGORIES_NAMES,
    asset: CategoryAsset | null,
    parentPath: string
  ) => void;
  randomize: () => void;
  applyLockedAssets: () => void;
}