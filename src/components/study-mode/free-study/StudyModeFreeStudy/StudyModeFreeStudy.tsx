import { isNull } from "lodash";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFlashcards } from "../../../../services/file-structure";
import { Params } from "../../../../shared";
import { FullPageLoadingSpinner, VFlex } from "../../../common";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";
import FreeStudyController from "../FreeStudyController/FreeStudyController";

interface StudyModeFreeStudyProps {}

const StudyModeFreeStudy: React.FC<StudyModeFreeStudyProps> = () => {
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const { getFlashcards, flashcards } = useFlashcards();
  const [loading, setLoading] = useState<boolean>(isNull(flashcards));
  const [flippedState, setFlippedState] = useState<boolean>(true);
  const maxLength = flashcards?.length;
  const { id } = useParams<Params>();

  useLayoutEffect(() => {
    getFlashcards(id);
  }, [id]);

  useEffect(() => {
    setLoading(isNull(flashcards));
  }, [flashcards, id]);

  return (
    <VFlex height="100%" justifyContent="space-between">
      {!loading && typeof maxLength !== "undefined" ? (
        <>
          <StudyModeMainFrame
            flashcardIndex={flashcardIndex}
            flashcards={flashcards}
            maxLength={maxLength}
            flippedState={flippedState}
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
    </VFlex>
  );
};

export default StudyModeFreeStudy;
