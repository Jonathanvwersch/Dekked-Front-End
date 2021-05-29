import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { FlashcardsContext } from "../../../../contexts";
import { Params, STUDY_MODE_TYPES } from "../../../../shared";
import { FullPageLoadingSpinner } from "../../../common";
import StudyModeController from "../../StudyModeController/StudyModeController";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";

interface StudyModeFreeStudyProps {}

const StudyModeFreeStudy: React.FC<StudyModeFreeStudyProps> = () => {
  const { flashcardIndex: index } = useParams<Params>();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(
    Number(index) - 1
  );
  const [flippedState, setFlippedState] = useState<boolean>(true);
  const { flashcards, isLoading, setFlashcards } =
    useContext(FlashcardsContext);

  const maxLength = flashcards?.length;
  console.log(flashcards);
  return (
    <>
      {!isLoading && typeof maxLength !== "undefined" ? (
        <>
          <StudyModeMainFrame
            flashcardIndex={flashcardIndex}
            flashcards={flashcards}
            maxLength={maxLength}
            flippedState={flippedState}
            studyMode={STUDY_MODE_TYPES.FREE_STUDY}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            setFlashcards={setFlashcards}
          />
          <StudyModeController
            maxLength={maxLength}
            flashcardIndex={flashcardIndex}
            setFlashcardIndex={setFlashcardIndex}
            setFlippedState={setFlippedState}
            type={STUDY_MODE_TYPES.FREE_STUDY}
          />
        </>
      ) : (
        <FullPageLoadingSpinner />
      )}
    </>
  );
};

export default StudyModeFreeStudy;
