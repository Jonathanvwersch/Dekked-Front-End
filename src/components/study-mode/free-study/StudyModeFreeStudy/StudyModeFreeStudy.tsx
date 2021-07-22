import { useAtom } from "jotai";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Params, STUDY_MODE_TYPES } from "../../../../shared";
import { flashcardsAtom } from "../../../../store";
import { FullPageLoadingSpinner } from "../../../common";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";
import FreeStudyController from "../FreeStudyController/FreeStudyController";

interface StudyModeFreeStudyProps {}

const StudyModeFreeStudy: React.FC<StudyModeFreeStudyProps> = () => {
  const { flashcardIndex: index } = useParams<Params>();
  const [flashcardIndex, setFlashcardIndex] = useState<number>(
    Number(index) - 1
  );
  const [flippedState, setFlippedState] = useState<boolean>(true);
  const [flashcards] = useAtom(flashcardsAtom);
  const maxLength = flashcards?.length;

  return (
    <>
      {typeof maxLength !== "undefined" ? (
        <>
          <StudyModeMainFrame
            flashcardIndex={flashcardIndex}
            flashcards={flashcards}
            maxLength={maxLength}
            flippedState={flippedState}
            studyMode={STUDY_MODE_TYPES.FREE_STUDY}
          />
          <FreeStudyController
            maxLength={maxLength}
            flashcardIndex={flashcardIndex}
            setFlashcardIndex={setFlashcardIndex}
            setFlippedState={setFlippedState}
          />
        </>
      ) : (
        <FullPageLoadingSpinner />
      )}
    </>
  );
};

export default StudyModeFreeStudy;
