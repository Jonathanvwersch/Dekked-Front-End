import { isNull } from "lodash";
import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFlashcards } from "../../../../services/file-structure";
import { Params, STUDY_MODE_TYPES } from "../../../../shared";
import { FullPageLoadingSpinner } from "../../../common";
import StudyModeController from "../../StudyModeController/StudyModeController";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";

interface StudyModeFreeStudyProps {}

const StudyModeFreeStudy: React.FC<StudyModeFreeStudyProps> = () => {
  const { id, flashcardIndex: index } = useParams<Params>();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(
    Number(index) - 1
  );
  const { getFlashcards, flashcards } = useFlashcards();
  const [loading, setLoading] = useState<boolean>(isNull(flashcards));
  const [flippedState, setFlippedState] = useState<boolean>(true);
  const maxLength = flashcards?.length;

  useLayoutEffect(() => {
    if (!flashcards) {
      getFlashcards(id);
    }
  }, [id]);

  useLayoutEffect(() => {
    if (!flashcards) {
      setLoading(isNull(flashcards));
    }
  }, [flashcards, id]);

  return (
    <>
      {!loading && typeof maxLength !== "undefined" ? (
        <>
          <StudyModeMainFrame
            flashcardIndex={flashcardIndex}
            flashcards={flashcards}
            maxLength={maxLength}
            flippedState={flippedState}
            studyMode={STUDY_MODE_TYPES.FREE_STUDY}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
          />
          <StudyModeController
            isEditable={isEditable}
            setIsEditable={setIsEditable}
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
