import { useAtom } from "jotai";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getFlashcards } from "../../../../api";
import { Params, STUDY_MODE_TYPES } from "../../../../shared";
import { currentFlashcardIndexAtom, flashcardsAtom } from "../../../../store";
import { FullPageLoadingSpinner } from "dekked-design-system";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";
import FreeStudyController from "../FreeStudyController/FreeStudyController";
import { sortFlashcardsByStarred } from "../../../study-set/StudySetFlashcardsContainer/StudySetFlashcardsContainer";

interface StudyModeFreeStudyProps {}

const StudyModeFreeStudy: React.FC<StudyModeFreeStudyProps> = () => {
  const [currentFlashcardIndex] = useAtom(currentFlashcardIndexAtom);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(
    currentFlashcardIndex
  );
  const { id: fileId, type } = useParams<Params>();
  const [flippedState, setFlippedState] = useState<boolean>(true);
  const [flashcards, setFlashcards] = useAtom(flashcardsAtom);
  const maxLength = flashcards?.length;

  const { data: fetchedFlashcards, isFetching: isFetchingFlashcards } =
    useQuery<FlashcardInterface[]>(`${fileId}-get-flashcards`, () =>
      getFlashcards({ id: fileId, type })
    );

  useEffect(() => {
    if (fetchedFlashcards)
      setFlashcards(fetchedFlashcards?.sort(sortFlashcardsByStarred));
  }, [fetchedFlashcards, isFetchingFlashcards, setFlashcards]);

  return (
    <>
      {typeof maxLength !== "undefined" &&
      !isFetchingFlashcards &&
      flashcards ? (
        <>
          <StudyModeMainFrame
            flashcardIndex={flashcardIndex}
            flashcards={flashcards}
            maxLength={maxLength}
            flippedState={flippedState}
            studyMode={STUDY_MODE_TYPES.FREE_STUDY}
            setFlashcardIndex={setFlashcardIndex}
            isFlashcardsEmpty={isEmpty(fetchedFlashcards)}
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
