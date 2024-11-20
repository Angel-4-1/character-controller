import React from "react";
import { useAtom } from "jotai";
import { languageAtom, stageAtom } from "~/Experience";
import { useTranslation } from "~/utils/useTranslation";
import { TRANSLATIONS } from "~/translations";
import './style.css'
import { STAGES, STAGES_MAP } from "~/constants";

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
  </div>
}