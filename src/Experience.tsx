import React from 'react'
import { atom, useAtom } from 'jotai';
import { LANGUAGES, LanguageProps, STAGES, STAGES_MAP, StageProps } from './constants';
import CharacterCustomizationStage from './stages/CharacterCustomization/CharacterCustomizationStage';

/** Define global ATOMS **/
export const languageAtom = atom<LanguageProps>(LANGUAGES[0]);
export const stageAtom = atom<StageProps>(STAGES[STAGES_MAP.CHARACTER_STAGE]);

/** Main Experience **/
export default function Experience() {

  const [stage] = useAtom(stageAtom);

  return <>
    {stage.id === STAGES_MAP.CHARACTER_STAGE && (
      <CharacterCustomizationStage />
    )}
  </>
}
