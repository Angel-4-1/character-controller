import React, { useState } from 'react'
import { atom, useAtom } from 'jotai';
import { LANGUAGES, LanguageProps, STAGES, STAGES_MAP, StageProps } from './constants';
import CharacterCustomizationStage from './stages/CharacterCustomization/CharacterCustomizationStage';
import { PlayStage } from './stages/Play/PlayStage';
import { Leva } from 'leva';

/** Define global ATOMS **/
export const languageAtom = atom<LanguageProps>(LANGUAGES[0]);
export const stageAtom = atom<StageProps>(STAGES[STAGES_MAP.INTRO_STAGE]);

function isDebugOrLocal() {
  const currentUrl = window.location.href;
  if (currentUrl.includes("debug") || currentUrl.includes("localhost")) {
    return true;
  }
  return false;
}

/** Main Experience **/
export default function Experience() {

  const [stage] = useAtom(stageAtom);

  const [showDebug, setHideDebug] = useState(isDebugOrLocal());

  return <>
    {!showDebug && <Leva hidden />}

    {stage.id === STAGES_MAP.CHARACTER_STAGE && (
      <group position-y={-1}>
        <CharacterCustomizationStage />
      </group>
    )}
    
    {stage.id === STAGES_MAP.PLAY_STAGE && (
      <PlayStage />
    )}
  </>
}
