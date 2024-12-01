import React from "react";
import { useAtom } from "jotai";
import { languageAtom, stageAtom } from "~/Experience";
import { useTranslation } from "~/utils/useTranslation";
import { TRANSLATIONS } from "~/translations";
import './style.css'
import { STAGES, STAGES_MAP } from "~/constants";
import { useKeyboardControls } from "@react-three/drei";

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
  const [language] = useAtom(languageAtom);

  const [stage, setStage] = useAtom(stageAtom);

  const onBackClick = () => {
    setStage(STAGES[STAGES_MAP.INTRO_STAGE]);
  };

  return <div className="play-container">
    <div className="elements-container">
      <div className="language-container">
        <div className="title">
          <h4>{useTranslation(TRANSLATIONS.playStage.language.title)}:</h4>
        </div>
        <div className="name">
          <h4>{language.screen_name}</h4>
        </div>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>

    <Keyboard />
  </div>
}