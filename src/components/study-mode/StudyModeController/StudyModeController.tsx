import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { SIZES, STUDY_MODE_TYPES } from "../../../shared";
import { Footer } from "../../common";
import FreeStudyController from "../free-study/FreeStudyController/FreeStudyController";
import SpacedRepetitionController from "../spaced-repetition/SpacedRepetitionController/SpacedRepetitionController";

interface StudyModeControllerProps {
  maxLength: number;
  flashcardIndex: number;
  setFlashcardIndex: React.Dispatch<React.SetStateAction<number>>;
  setFlippedState: React.Dispatch<React.SetStateAction<boolean>>;
  type: STUDY_MODE_TYPES;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  isEditable: boolean;
}

const StudyModeController: React.FC<StudyModeControllerProps> = ({
  maxLength,
  flashcardIndex,
  setFlashcardIndex,
  setFlippedState,
  isEditable,
  setIsEditable,
  type,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      {isEditable ? (
        <Footer
          padding={`${theme.spacers.size32} 0 0 0`}
          buttonWidth={SIZES.MEDIUM}
          buttonSize={SIZES.LARGE}
          handleCancel={() => setIsEditable(false)}
          handleMainButton={() => setIsEditable(false)}
        />
      ) : null}
      {type === STUDY_MODE_TYPES.FREE_STUDY && !isEditable ? (
        <FreeStudyController
          maxLength={maxLength}
          flashcardIndex={flashcardIndex}
          setFlashcardIndex={setFlashcardIndex}
          setFlippedState={setFlippedState}
        />
      ) : null}
      {type === STUDY_MODE_TYPES.SPACED_REPETITION && !isEditable ? (
        <SpacedRepetitionController />
      ) : null}
    </>
  );
};

export default StudyModeController;
