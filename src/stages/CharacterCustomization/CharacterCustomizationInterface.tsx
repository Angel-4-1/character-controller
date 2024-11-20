import { useAtom } from "jotai";
import { TRANSLATIONS } from "../../translations"
import { useTranslation } from "../../utils/useTranslation";
import './style.css'
import React, { useEffect } from "react";
import { languageAtom, stageAtom } from "~/Experience";
import { STAGES, STAGES_MAP } from "~/constants";
import { useConfiguratorStore } from "~/store";

const AssetsBox = () => {
  const {
    categories,
    currentCategory,
    setCurrentCategory,
    changeAsset,
    customization,
    lockedGroups,
  } = useConfiguratorStore();

  if(currentCategory)
    console.log( customization[currentCategory.name] )

  return (
    <div className="assets-box">
      {/* Categories list */}
      <div className="assets-box-2">
        {categories.map((category: any) => (
          <button
            key={category.id}
            onClick={() => setCurrentCategory(category)}
            className={`category ${
              currentCategory?.name === category.name
                ? "category-selected"
                : ""
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {
        currentCategory && lockedGroups && lockedGroups[currentCategory?.name] && (
          <div className="asset-locked">
            Asset is hidden by {" "}
            {
              lockedGroups[currentCategory?.name]?.map((asset: any) => `${asset.name} (${asset.lockedBy})`).join(", ")
            }
          </div>
        )
      }

      {/* Assests of each category */}
      <div className="assets-box-assets">
        {
          currentCategory?.removable && (
            <button
              onClick={() => {
                changeAsset(currentCategory.name, null, currentCategory.parentPath)
              }}
              // @ts-ignore
              className={`asset ${customization[currentCategory.name]?.asset === null
                  ? "asset-selected" 
                  : "asset-no-selected"
                }`}
            >
              <div className="removable">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </button>
            
          )
        }
        {
          currentCategory?.assets.map((asset: any, index: number) => (
            <button
              key={index + asset.image}
              onClick={() => {
                changeAsset(currentCategory.name, asset, currentCategory.parentPath)
              }}
              // @ts-ignore
              className={`asset ${customization[currentCategory.name]?.asset?.model === asset.model ? "asset-selected" : "asset-no-selected"}`}
            >
              <img src={"./" + currentCategory.parentPath + asset.image} />
            </button>
          ))
        }
      </div>
    </div>
  )
}

const DownloadButton = () => {
  const download = useConfiguratorStore((state: any) => state.download);
  
  return (
    <button
      className="download-button"
      onClick={download}
    >
      Download
    </button>
  );
};

const RandomizeButton = () => {
  const randomize = useConfiguratorStore((state: any) => state.randomize);
  
  return (
    <button
      className="randomize"
      onClick={randomize}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    </button>
  );
};

const ColorPicker = () => {
  const updateColor = useConfiguratorStore((state: any) => state.updateColor);
  const currentCategory = useConfiguratorStore(
    (state: any) => state.currentCategory
  );
  const handleColorChange = (color: any) => {
    updateColor(color);
  };
  const customization = useConfiguratorStore((state: any) => state.customization);

  if (!customization[currentCategory.name]?.asset) {
    return null;
  }
  return (
    <div className="color-picker">
      {currentCategory.colorPalette?.colors.map((color: any, index: number) => (
        <button
          key={`${index}-${color}`}
          className={`color-picker-button 
             ${
               customization[currentCategory.name].color === color
                 ? "color-picker-button-selected"
                 : ""
             }
          `}
          onClick={() => handleColorChange(color)}
        >
          <div
            style={{ width: '100%', height: '100%', borderRadius: '6px',backgroundColor: color }}
          />
        </button>
      ))}
    </div>
  );
};

export default function CharacterCustomizationInterface() {
	const [stage, setStage] = useAtom(stageAtom);

	const onClick = () => {
		setStage(STAGES[STAGES_MAP.PLAY_STAGE]);
	};

	const [language, setLanguage] = useAtom(languageAtom);

  const currentCategory = useConfiguratorStore(
    (state: any) => state.currentCategory
  );

  const customization = useConfiguratorStore((state: any) => state.customization)

	return (
      <main
        style={{
          pointerEvents: 'none',
          position: "fixed",
          zIndex: 10,
          inset: '0px',
          padding: '2.5rem',
          userSelect: "none",
        }}
      >
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '100%',
            maxWidth: '1280px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '2.5rem' /* 40px */,
            }}
          >
            <a
              style={{
                pointerEvents: 'auto'
              }} 
              href=""
            >
              <img
                style={{
                  width: '5rem'
                }}
                src="/icon.png"
              />
            </a>
            <div style={{
              display: "flex",
              gap: "6px",
            }}>
              <RandomizeButton />
              <DownloadButton />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: '2.5rem' /* 40px */,
              paddingRight: '2.5rem' /* 40px */,
            }}>
              {currentCategory?.colorPalette &&
                customization[currentCategory.name] && <ColorPicker />}
              <AssetsBox />
          </div>
        </div>
      </main>
  )
}