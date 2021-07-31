import { useAtom } from "jotai";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDeckByStudySetId, getFlashcardsByDeckId } from "../../../../api";
import { Params, STUDY_MODE_TYPES } from "../../../../shared";
import { currentFlashcardIndexAtom, flashcardsAtom } from "../../../../store";
import { FullPageLoadingSpinner } from "../../../common";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";
import FreeStudyController from "../FreeStudyController/FreeStudyController";

interface StudyModeFreeStudyProps {}

const StudyModeFreeStudy: React.FC<StudyModeFreeStudyProps> = () => {
  const [currentFlashcardIndex] = useAtom(currentFlashcardIndexAtom);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(
    currentFlashcardIndex
  );
  const { id: studySetId } = useParams<Params>();
  const [flippedState, setFlippedState] = useState<boolean>(true);
  const [flashcards, setFlashcards] = useAtom(flashcardsAtom);
  const maxLength = flashcards?.length;

  // we only want to fetch flashcards if none exist
  // this occurs on refresh of study mode page.
  const { data: deck } = useQuery(
    `${studySetId}-get-deck`,
    () => getDeckByStudySetId({ studySetId }),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !flashcards,
    }
  );

  const { data: fetchedFlashcards, isFetching } = useQuery<
    FlashcardInterface[]
  >(
    `${studySetId}-get-flashcards`,
    () => getFlashcardsByDeckId({ deckId: deck?.id }),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: Boolean(deck?.id) && !flashcards,
    }
  );

  useEffect(() => {
    if (fetchedFlashcards) setFlashcards(fetchedFlashcards);
  }, [fetchedFlashcards, setFlashcards]);

  return (
    <>
      {typeof maxLength !== "undefined" && !isFetching && flashcards ? (
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
