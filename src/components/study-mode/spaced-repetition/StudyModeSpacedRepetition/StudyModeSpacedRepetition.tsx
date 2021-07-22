import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSpacedRepetitionFlashcardsByDeckId } from "../../../../api";
import { Params, STUDY_MODE_TYPES } from "../../../../shared";
import { deckAtom, srFlashcardsAtom } from "../../../../store";
import { Flex, FullPageLoadingSpinner } from "../../../common";
import StudyModeFlashcard from "../../StudyModeFlashcard/StudyModeFlashcard";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";
import SpacedRepetitionController from "../SpacedRepetitionController/SpacedRepetitionController";

interface StudyModeSpacedRepetitionProps {}

const StudyModeSpacedRepetition: React.FC<StudyModeSpacedRepetitionProps> =
  () => {
    const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
    const [flashcards, setFlashcards] = useAtom(srFlashcardsAtom);
    const [deck] = useAtom(deckAtom);
    const { id: studySetId } = useParams<Params>();
    const [flippedState, setFlippedState] = useState<boolean>(true);
    const maxLength = flashcards?.length;

    const { data: fetchedSrFlashcards, isFetching } = useQuery<
      FlashcardInterface[]
    >(
      `${studySetId}-get-sr-flashcards`,
      () => getSpacedRepetitionFlashcardsByDeckId({ deckId: deck?.id || "" }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: Boolean(deck?.id),
      }
    );

    useEffect(() => {
      setFlashcards(fetchedSrFlashcards);
    }, [fetchedSrFlashcards, setFlashcards]);

    return (
      <>
        {!isFetching ? (
          !maxLength ? (
            <StudyModeFlashcard isFinishedStudying />
          ) : (
            <Flex
              flexDirection="column"
              justifyContent="space-between"
              height="100%"
            >
              <StudyModeMainFrame
                flashcardIndex={flashcardIndex}
                flippedState={flippedState}
                maxLength={maxLength}
                flashcards={flashcards}
                studyMode={STUDY_MODE_TYPES.SPACED_REPETITION}
              />
              <SpacedRepetitionController
                ownerId={flashcards?.[flashcardIndex]?.owner_id}
                flashcardId={flashcards?.[flashcardIndex]?.id}
                deckId={flashcards?.[flashcardIndex]?.deck_id}
                maxLength={maxLength}
                flashcards={flashcards}
                flashcardIndex={flashcardIndex}
                setFlashcardIndex={setFlashcardIndex}
                setFlippedState={setFlippedState}
                flippedState={flippedState}
                easeFactor={flashcards?.[flashcardIndex]?.ease_factor}
                easyBonus={deck?.easy_bonus}
                status={flashcards?.[flashcardIndex]?.status}
                interval={flashcards?.[flashcardIndex]?.interval}
              />
            </Flex>
          )
        ) : (
          <FullPageLoadingSpinner />
        )}
      </>
    );
  };

export default StudyModeSpacedRepetition;
