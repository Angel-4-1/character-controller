import { MeshStandardMaterial } from 'three';
import { randInt } from 'three/src/math/MathUtils';
import { create } from 'zustand'
import { CATEGORIES, findAssetByName } from './categories';
import { CATEGORIES_NAMES, Category, CategoryAsset, ConfiguratorStore } from './contract';
import { PHOTO_POSES } from './animations';
import { UI_MODES } from './uiModes';

export const useConfiguratorStore = create<ConfiguratorStore>()((set, get: any) => ({
  categories: CATEGORIES,
  currentCategory: null,
  lockedGroups: {},
  customization: {
    [CATEGORIES_NAMES.HEAD]: { ...findAssetByName(CATEGORIES_NAMES.HEAD) },
    [CATEGORIES_NAMES.HAIR]: { ...findAssetByName(CATEGORIES_NAMES.HAIR) },
    [CATEGORIES_NAMES.FACE]: {},
    [CATEGORIES_NAMES.EYES]: { ...findAssetByName(CATEGORIES_NAMES.EYES) },
    [CATEGORIES_NAMES.EYEBROWS]: { ...findAssetByName(CATEGORIES_NAMES.EYEBROWS) },
    [CATEGORIES_NAMES.NOSE]: { ...findAssetByName(CATEGORIES_NAMES.NOSE) },
    [CATEGORIES_NAMES.FACIAL_HAIR]: { ...findAssetByName(CATEGORIES_NAMES.FACIAL_HAIR) },
    [CATEGORIES_NAMES.GLASSES]: {},
    [CATEGORIES_NAMES.HAT]: { ...findAssetByName(CATEGORIES_NAMES.HAT) },
    [CATEGORIES_NAMES.TOP]: { ...findAssetByName(CATEGORIES_NAMES.TOP) },
    [CATEGORIES_NAMES.BOTTOM]: { ...findAssetByName(CATEGORIES_NAMES.BOTTOM) },
    [CATEGORIES_NAMES.SHOES]: { ...findAssetByName(CATEGORIES_NAMES.SHOES) },
    [CATEGORIES_NAMES.ACCESSORIES]: {},
  },
  skin: new MeshStandardMaterial({
    color: 0xD79D6A,
    roughness: 1
  }),
  pose: PHOTO_POSES.Idle,
  mode: UI_MODES.CUSTOMIZE,

  download: () => {},
  setDownload: (download: any) => set({ download }),
  screenshot: () => {},
  setScreenshot: (screenshot: any) => set({ screenshot }),
  updateColor: (color: string) => {
    set((state: any) => ({
      customization: {
        ...state.customization,
        [state.currentCategory.name]: {
          ...state.customization[state.currentCategory.name],
          color,
        }
      }
    }));
    if( get().currentCategory.name === CATEGORIES_NAMES.HEAD) {
      get().updateSkin( color );
    }
  },
  updateSkin: (color: string) => {
    get().skin.color.set( color );
  },
  setCurrentCategory: (category: Category) => set({ currentCategory: category }),
  changeAsset: (category: CATEGORIES_NAMES, asset: CategoryAsset | null, parentPath: string) => {
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
    const customization: { [key in CATEGORIES_NAMES]: { asset?: CategoryAsset; color?: string; parentPath: string } } = {} as any;

    get().categories.forEach((category: Category) => {
      // Select a random asset for the category
      let randomAsset: CategoryAsset | undefined = category.assets[randInt(0, category.assets.length - 1)];
      
      // If we can remove the asset
      if (category.removable) {
        if (randInt(0, category.assets.length - 1) === 0) {
          randomAsset = undefined;
        }
      }

      // Select a color from the palette
      const randomColor =
        category.colorPalette?.colors?.[
          randInt(0, category.colorPalette.colors.length - 1)
        ];
      
      // Assign the customization
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
    const lockedGroups: { [key in CATEGORIES_NAMES]?: { name: string; lockedBy: string }[] } = {};

    Object.values(customization).forEach((category: any) => {
      if (category.asset?.lockedGroups) {
        category.asset.lockedGroups.forEach((categoryName: CATEGORIES_NAMES) => {
          // Init the category in case it does not exist
          if (!lockedGroups[categoryName]) {
            lockedGroups[categoryName] = [];
          }
  
          // Add the blocking
          lockedGroups[categoryName]?.push({
            name: category.asset.model,
            lockedBy: category.categoryName,
          });
        });
      }
    });

    set({ lockedGroups });
  },
  setPose: (pose: string) => set({ pose }),
  setMode: (mode: string) => {
    set({ mode });
    if (mode === UI_MODES.CUSTOMIZE) {
      set({ pose: PHOTO_POSES.Idle });
    }
  },
}))