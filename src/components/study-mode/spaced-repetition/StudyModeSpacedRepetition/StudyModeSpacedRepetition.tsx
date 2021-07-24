import { useAtom } from "jotai";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getDeckByStudySetId,
  getFlashcardsByDeckId,
  getSpacedRepetitionFlashcardsByDeckId,
} from "../../../../api";
import { Params, STUDY_MODE_TYPES } from "../../../../shared";
import {
  currentFlashcardIndexAtom,
  flashcardsAtom,
  srFlashcardsAtom,
} from "../../../../store";
import { Flex, FullPageLoadingSpinner } from "../../../common";
import StudyModeFlashcard from "../../StudyModeFlashcard/StudyModeFlashcard";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";
import SpacedRepetitionController from "../SpacedRepetitionController/SpacedRepetitionController";
import { calculateNumberOfCardsGroupedByLearningStatus } from "./StudyModeSpacedRepetition.helpers";

interface StudyModeSpacedRepetitionProps {}

const StudyModeSpacedRepetition: React.FC<StudyModeSpacedRepetitionProps> =
  () => {
    const [currentFlashcardIndex] = useAtom(currentFlashcardIndexAtom);
    const [flashcardIndex, setFlashcardIndex] = useState<number>(
      currentFlashcardIndex
    );
    const [numberOfLearnedCards, setNumberOfLearnedCards] = useState<number>(0);
    const [numberOfLearningCards, setNumberOfLearningCards] =
      useState<number>(0);
    const [numberOfNewCards, setNumberOfNewCards] = useState<number>(0);
    const [flashcards, setFlashcards] = useAtom(srFlashcardsAtom);
    const [generalFlashcards] = useAtom(flashcardsAtom);
    const { id: studySetId } = useParams<Params>();
    const [flippedState, setFlippedState] = useState<boolean>(true);
    const maxLength = flashcards?.length;

    const { data: deck, isLoading: isDeckLoading } = useQuery(
      `${studySetId}-get-deck`,
      () => getDeckByStudySetId({ studySetId }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: !flashcards && currentFlashcardIndex === 0,
      }
    );

    const { data: fetchedFlashcards } = useQuery<FlashcardInterface[]>(
      `${studySetId}-get-flashcards`,
      () => getFlashcardsByDeckId({ deckId: deck?.id }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled:
          Boolean(deck?.id) && !flashcards && currentFlashcardIndex === 0,
      }
    );

    const { data: fetchedSrFlashcards, isLoading: isFlashcardsLoading } =
      useQuery<FlashcardInterface[]>(
        `${studySetId}-get-sr-flashcards`,
        () => getSpacedRepetitionFlashcardsByDeckId({ deckId: deck?.id || "" }),
        {
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
          enabled: Boolean(deck?.id) && currentFlashcardIndex === 0,
        }
      );

    useLayoutEffect(() => {
      setFlashcards(fetchedSrFlashcards);
    }, [fetchedSrFlashcards, setFlashcards]);

    useEffect(() => {
      setNumberOfLearnedCards(
        calculateNumberOfCardsGroupedByLearningStatus(flashcards)
          .numberOfLearnedCards
      );
      setNumberOfLearningCards(
        calculateNumberOfCardsGroupedByLearningStatus(flashcards)
          .numberOfLearningCards
      );
      setNumberOfNewCards(
        calculateNumberOfCardsGroupedByLearningStatus(flashcards)
          .numberOfNewCards
      );
    }, [flashcards]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <>
        {!isDeckLoading && !isFlashcardsLoading ? (
          !maxLength ? (
            <StudyModeFlashcard
              isFinishedStudying
              isFlashcardsEmpty={
                !flashcards && (!generalFlashcards || !fetchedFlashcards)
              }
            />
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
                currentLearningStatus={
                  flashcards?.[flashcardIndex]?.learning_status
                }
                numberOfLearningCards={numberOfLearningCards}
                interval={flashcards?.[flashcardIndex]?.interval}
                numberOfLearnedCards={numberOfLearnedCards}
                numberOfNewCards={numberOfNewCards}
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
