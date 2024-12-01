import { useAtom } from "jotai";
import { TRANSLATIONS } from "../../translations"
import { useTranslation } from "../../utils/useTranslation";
import './style.css'
import React, { useEffect } from "react";
import { languageAtom, stageAtom } from "~/Experience";
import { STAGES, STAGES_MAP } from "~/constants";
import { useConfiguratorStore } from "~/store";
import { PHOTO_POSES } from "~/store/animations";
import { UI_MODES } from "~/store/uiModes";

const PosesBox = () => {
  const pose = useConfiguratorStore((state) => state.pose);
  const setPose = useConfiguratorStore((state) => state.setPose);

  return (
    <div className="assets-box-2">
      {Object.keys(PHOTO_POSES).map((pose) => (
        <button
          key={pose}
          // @ts-ignore
          onClick={() => setPose(PHOTO_POSES[pose])}
        >
          {pose}
        </button>
      ))}

    </div>
  )
};

const AssetsBox = () => {
  const {
    categories,
    currentCategory,
    setCurrentCategory,
    changeAsset,
    customization,
    lockedGroups,
  } = useConfiguratorStore();

  // if(currentCategory)
  //   console.log( customization[currentCategory.name] )

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

const NextButton = () => {
  const [stage, setStage] = useAtom(stageAtom);

	const onClick = () => {
		setStage(STAGES[STAGES_MAP.PLAY_STAGE]);
	};
  
  return (
    <button
      className="download-button"
      onClick={onClick}
    >
      Next
    </button>
  );
};

const RandomizeButton = () => {
  const randomize = useConfiguratorStore((state) => state.randomize);
  
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

const ScreenshotButton = () => {
  const screenshot = useConfiguratorStore((state) => state.screenshot);
  
  return (
    <button
      className="randomize"
      onClick={screenshot}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6">
          <path 
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
          
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
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
	const [language, setLanguage] = useAtom(languageAtom);

  const currentCategory = useConfiguratorStore(
    (state: any) => state.currentCategory
  );

  const customization = useConfiguratorStore((state: any) => state.customization)
  const mode = useConfiguratorStore((state) => state.mode);
  const setMode = useConfiguratorStore((state) => state.setMode);

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
              paddingTop: '0px',
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
              <ScreenshotButton />
              <DownloadButton />
              <NextButton />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: '2.5rem' /* 40px */,
              paddingRight: '2.5rem' /* 40px */,
            }}>
              { mode === UI_MODES.CUSTOMIZE && (
                <>
                  {currentCategory?.colorPalette &&
                    customization[currentCategory.name] && <ColorPicker />}
                  <AssetsBox />
                </>
              )}
              { mode === UI_MODES.PHOTO && (
                <PosesBox />
              )}

              <div className="modes">
                <button
                  className={`modes-button
                    ${
                      mode === UI_MODES.CUSTOMIZE
                        ? "modes-button-selected"
                        : "modes-button-not-selected"
                    }
                  `}
                  onClick={() => setMode(UI_MODES.CUSTOMIZE)}
                >
                  Customize avatar
                </button>
                <div className="modes-divider"></div>
                <button
                  className={`modes-button
                    ${
                      mode === UI_MODES.PHOTO
                        ? "modes-button-selected"
                        : "modes-button-not-selected"
                    }
                    `}
                  onClick={() => setMode(UI_MODES.PHOTO)}
                >
                  Photo booth
                </button>
              </div>

          </div>
        </div>
      </main>
  )
}