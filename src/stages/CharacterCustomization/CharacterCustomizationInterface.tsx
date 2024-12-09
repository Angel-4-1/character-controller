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
import Button from "~/components/Button";
import { SVG } from "~/components/SVG";

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

  return (
    <div className="assets-box">
      {/* Categories list */}
      <div className="assets-box-2">
        {categories.map((category: any) => (
          <button
            key={category.id}
            onClick={() => {
              if (currentCategory === category) {
                setCurrentCategory(null)
              } else {
                setCurrentCategory(category)
              }
            }}
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

const Resizable = (props: any) => {
  function makeResizableDiv(div) {
    const element = document.querySelector(div);
    const resizers = document.querySelectorAll(div + " .resizer");
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
  
    let mouseMoveHandler = undefined;
  
    function onMouseDownWrapper(currentResizer) {
      return function onMouseDown(e) {
        e.preventDefault();
        original_width = parseFloat(
          getComputedStyle(element, null)
            .getPropertyValue("width")
            .replace("px", "")
        );
        original_height = parseFloat(
          getComputedStyle(element, null)
            .getPropertyValue("height")
            .replace("px", "")
        );
        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        mouseMoveHandler = resizeWrapper(currentResizer);
        window.addEventListener("mousemove", mouseMoveHandler);
        window.addEventListener("mouseup", stopResizeWrapper(currentResizer));
      };
    }
  
    function resizeWrapper(currentResizer) {
      return function resize(e) {
        // console.log("resize", e.pageX, e.pageY);
        if (currentResizer.classList.contains("bottom-right")) {
          const width = original_width + (e.pageX - original_mouse_x);
          const height = original_height + (e.pageY - original_mouse_y);
          if (width > minimum_size) {
            element.style.width = width + "px";
          }
          if (height > minimum_size) {
            element.style.height = height + "px";
          }
        } else if (currentResizer.classList.contains("bottom-left")) {
          const height = original_height + (e.pageY - original_mouse_y);
          const width = original_width - (e.pageX - original_mouse_x);
          if (height > minimum_size) {
            element.style.height = height + "px";
          }
          if (width > minimum_size) {
            element.style.width = width + "px";
            element.style.left = original_x + (e.pageX - original_mouse_x) + "px";
          }
        } else if (currentResizer.classList.contains("top-right")) {
          const width = original_width + (e.pageX - original_mouse_x);
          const height = original_height - (e.pageY - original_mouse_y);
          if (width > minimum_size) {
            element.style.width = width + "px";
          }
          if (height > minimum_size) {
            element.style.height = height + "px";
            element.style.top = original_y + (e.pageY - original_mouse_y) + "px";
          }
        } else {
          const width = original_width - (e.pageX - original_mouse_x);
          const height = original_height - (e.pageY - original_mouse_y);
          if (width > minimum_size) {
            element.style.width = width + "px";
            element.style.left = original_x + (e.pageX - original_mouse_x) + "px";
          }
          if (height > minimum_size) {
            element.style.height = height + "px";
            element.style.top = original_y + (e.pageY - original_mouse_y) + "px";
          }
        }
      };
    }
  
    function stopResizeWrapper(currentResizer) {
      // console.log("stopResizeWrapper", currentResizer);
      return function stopResize() {
        // console.log("stopResize", currentResizer);
        // window.removeEventListener("mousemove", resizeWrapper(currentResizer));
        window.removeEventListener("mousemove", mouseMoveHandler);
      };
    }
  
    for (let i = 0; i < resizers.length; i++) {
      const currentResizer = resizers[i];
      currentResizer.addEventListener(
        "mousedown",
        onMouseDownWrapper(currentResizer)
      );
    }
  }

  useEffect(() => {
    makeResizableDiv(".resizable");
  }, [props])  

  return (
    <div className="resizable">
      <div className="resizers">
        <div className="resizer top-left" />
        <div className="resizer top-right" />
        <div className="resizer bottom-left" />
        <div className="resizer bottom-right" />
        <div className="innerContent">{props.children}</div>
      </div>
    </div>
  );
}

const DownloadButton = () => {
  const download = useConfiguratorStore((state: any) => state.download);

  return (
    <Button
      onClick={download}
    >
      <SVG 
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </Button>
  );
};

const NextButton = () => {
  const [stage, setStage] = useAtom(stageAtom);

	const onClick = () => {
		setStage(STAGES[STAGES_MAP.PLAY_STAGE]);
	};
  
  return (
    <Button
      onClick={onClick}
    >
      <>Continue</>
    </Button>
  );
};

const RandomizeButton = () => {
  const randomize = useConfiguratorStore((state) => state.randomize);
  
  return (
    <Button
      onClick={randomize}
    >
      <SVG
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </Button>
  );
};

const ScreenshotButton = () => {
  const screenshot = useConfiguratorStore((state) => state.screenshot);
  
  return (
    <Button
      onClick={screenshot}
    >
      <SVG
        d={[
          "M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z",
          "M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
        ]}
      />

    </Button>
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

const Modes = () => {
  const currentCategory = useConfiguratorStore(
    (state: any) => state.currentCategory
  );

  const customization = useConfiguratorStore((state: any) => state.customization)

  const mode = useConfiguratorStore((state) => state.mode);
  const setMode = useConfiguratorStore((state) => state.setMode);

  return (
    <>
      { mode === UI_MODES.CUSTOMIZE && (
        <>
          {currentCategory?.colorPalette &&
            customization[currentCategory.name] && <ColorPicker />}
          <AssetsBox />
        </>
      )}
      
      <div className="modes-selector">
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
    </>
  )
};

export default function CharacterCustomizationInterface() {
	return (
    <>
      <div className="buttons-group">
        <div className="buttons-group-row">
          <RandomizeButton />
          <ScreenshotButton />
          <DownloadButton />
          <NextButton />
        </div>
      </div>

      {/* <Resizable>
        <div>inner content</div>
      </Resizable> */}
        <Modes />
    </>
  )
}