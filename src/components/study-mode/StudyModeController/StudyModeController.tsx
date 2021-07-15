import React from "react";
import { STUDY_MODE_TYPES } from "../../../shared";
import FreeStudyController from "../free-study/FreeStudyController/FreeStudyController";
import SpacedRepetitionController from "../spaced-repetition/SpacedRepetitionController/SpacedRepetitionController";

interface StudyModeControllerProps {
  maxLength: number;
  flashcardIndex: number;
  setFlashcardIndex: React.Dispatch<React.SetStateAction<number>>;
  setFlippedState: React.Dispatch<React.SetStateAction<boolean>>;
  type: STUDY_MODE_TYPES;
  flippedState?: boolean;
}

const StudyModeController: React.FC<StudyModeControllerProps> = ({
  maxLength,
  flashcardIndex,
  setFlashcardIndex,
  setFlippedState,
  flippedState,
  type,
}) => {
  return (
    <>
      {type === STUDY_MODE_TYPES.FREE_STUDY ? (
        <FreeStudyController
          maxLength={maxLength}
          flashcardIndex={flashcardIndex}
          setFlashcardIndex={setFlashcardIndex}
          setFlippedState={setFlippedState}
        />
      ) : null}
      {type === STUDY_MODE_TYPES.SPACED_REPETITION ? (
        <SpacedRepetitionController
          maxLength={maxLength}
          flashcardIndex={flashcardIndex}
          setFlashcardIndex={setFlashcardIndex}
          setFlippedState={setFlippedState}
          flippedState={flippedState}
        />
      ) : null}
    </>
  );
};

export default StudyModeController;
