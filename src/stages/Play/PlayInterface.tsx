import React from "react";
import { useAtom } from "jotai";
import { stageAtom } from "~/Experience";
import { useTranslation } from "~/utils/useTranslation";
import { TRANSLATIONS } from "~/translations";
import './style.css'
import { STAGES, STAGES_MAP } from "~/constants";
import { useKeyboardControls } from "@react-three/drei";
import { SVG } from "~/components/SVG";
import Button from "~/components/Button";

const Home = () => {
  const [_, setStage] = useAtom(stageAtom);

  const onClick = () => {
    setStage(STAGES[STAGES_MAP.INTRO_STAGE]);
  };

  return (
    <>
      <Button
        onClick={onClick}
      >
        <SVG
          d={"m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"}
        />
      </Button>
    </>
  )
}

const Camera = () => {
  const onClick = () => {}

  return (
    <>
      <Button
        onClick={onClick}
      >
        <SVG
          d={"m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"}
        />
      </Button>
    </>
  )
}

const CustomizeCharacter = () => {
  const [_, setStage] = useAtom(stageAtom);

  const onClick = () => {
    setStage(STAGES[STAGES_MAP.CHARACTER_STAGE]);
  };

  return (
    <>
      <Button
        onClick={onClick}
      >
        <SVG
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </Button>
    </>
  )
}

const Keyboard = () => {
  const forward = useKeyboardControls((state) => state.forward)
  const backward = useKeyboardControls((state) => state.backward)
  const leftward = useKeyboardControls((state) => state.left)
  const rightward = useKeyboardControls((state) => state.right)
  const jump = useKeyboardControls((state) => state.jump)
  const shiftLeft = useKeyboardControls((state) => state.run)

  return (
    <>
      <div className="controls">
        { /* Arrows */}
        <div className="content-left">
          <div className="raw">
            <div className={`key text-centered ${forward ? 'active' : ''}`}>
              <span>{useTranslation(TRANSLATIONS.controls.forward.key)}</span>
            </div>
          </div>
          <div className="raw">
            <div className={`key text-centered ${leftward ? 'active' : ''}`}>
              <span>{useTranslation(TRANSLATIONS.controls.leftward.key)}</span>
            </div>
            <div className={`key text-centered ${backward ? 'active' : ''}`}>
              <span>{useTranslation(TRANSLATIONS.controls.backward.key)}</span>
            </div>
            <div className={`key text-centered ${rightward ? 'active' : ''}`}>
              <span>{useTranslation(TRANSLATIONS.controls.rightward.key)}</span>
            </div>
          </div>
        </div>

        <div className="content-right">
          { /* L Shift */}
          <div className="key-with-defintion">
            <div className="key-with-defintion-left raw">
              <div className={`key text-centered medium ${shiftLeft ? 'active' : ''}`}>
                <span>{useTranslation(TRANSLATIONS.controls.run.key)}</span>
              </div>
            </div>
            <div className="key-with-defintion-right raw">
              <div className="key-definition text-centered">
                <p>{useTranslation(TRANSLATIONS.controls.run.definition)}</p>
              </div>
            </div>
          </div>

          { /* Space */}
          <div className="key-with-defintion">
            <div className="key-with-defintion-left raw">
              <div className={`key text-centered large ${jump ? 'active' : ''}`}>
                <span>{useTranslation(TRANSLATIONS.controls.jump.key)}</span>
              </div>
            </div>
            <div className="key-with-defintion-right raw">
              <div className="key-definition text-centered">
                <span>{useTranslation(TRANSLATIONS.controls.jump.definition)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function PlayInterface() {
  return <div className="play-container">
    <div className="buttons-group">
      <div className="buttons-group-row">
        <Home />
        <CustomizeCharacter />
      </div>
      
      <div className="buttons-group-row">
        <Camera />
      </div>
    </div>

    <Keyboard />
  </div>
}