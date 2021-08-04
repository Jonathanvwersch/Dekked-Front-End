import { useAtom } from "jotai";
import { isEmpty } from "lodash";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getDeckByStudySetId,
  getFlashcardsByDeckId,
  getSpacedRepetitionFlashcardsByDeckId,
} from "../../../../api";
import { Params, STUDY_MODE_TYPES } from "../../../../shared";
import { currentFlashcardIndexAtom, srFlashcardsAtom } from "../../../../store";
import { Flex, FullPageLoadingSpinner } from "../../../common";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";
import SpacedRepetitionController from "../SpacedRepetitionController/SpacedRepetitionController";
import { calculateNumberOfCardsGroupedByLearningStatus } from "./StudyModeSpacedRepetition.helpers";

interface StudyModeSpacedRepetitionProps {}

const StudyModeSpacedRepetition: React.FC<StudyModeSpacedRepetitionProps> =
  () => {
    const [currentFlashcardIndex] = useAtom(currentFlashcardIndexAtom);
    const [flashcardIndex] = useState<number>(currentFlashcardIndex);
    const [numberOfLearnedCards, setNumberOfLearnedCards] = useState<number>(0);
    const [numberOfLearningCards, setNumberOfLearningCards] =
      useState<number>(0);
    const [numberOfNewCards, setNumberOfNewCards] = useState<number>(0);
    const [srFlashcards, setSrFlashcards] = useAtom(srFlashcardsAtom);
    const { id: studySetId } = useParams<Params>();
    const [flippedState, setFlippedState] = useState<boolean>(true);
    const [maxLength, setMaxLength] = useState<number>();

    const { data: deck, isLoading: isDeckLoading } = useQuery(
      `${studySetId}-get-deck`,
      () => getDeckByStudySetId({ studySetId }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: !srFlashcards && currentFlashcardIndex === 0,
      }
    );

    const {
      data: fetchedFlashcards,
      isLoading: isFlashcardsLoading,
      isFetching: isFlashcardsFetching,
    } = useQuery<FlashcardInterface[]>(
      `${studySetId}-get-flashcards`,
      () => getFlashcardsByDeckId({ deckId: deck?.id }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: Boolean(deck?.id),
      }
    );

    const {
      data: fetchedSrFlashcards,
      isLoading: isSrFlashcardsLoading,
      isFetching: isSrFlashcardsFetching,
    } = useQuery<FlashcardInterface[]>(
      `${studySetId}-get-sr-flashcards`,
      () => getSpacedRepetitionFlashcardsByDeckId({ deckId: deck?.id || "" }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: Boolean(deck?.id) && currentFlashcardIndex === 0,
        onSuccess: (data) => setMaxLength(data?.length),
      }
    );

    useLayoutEffect(() => {
      setSrFlashcards(fetchedSrFlashcards);
    }, [fetchedSrFlashcards, setSrFlashcards]);

    useEffect(() => {
      setNumberOfLearnedCards(
        calculateNumberOfCardsGroupedByLearningStatus(srFlashcards)
          .numberOfLearnedCards
      );
      setNumberOfLearningCards(
        calculateNumberOfCardsGroupedByLearningStatus(srFlashcards)
          .numberOfLearningCards
      );
      setNumberOfNewCards(
        calculateNumberOfCardsGroupedByLearningStatus(srFlashcards)
          .numberOfNewCards
      );
    }, [srFlashcards]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <>
        {!isDeckLoading &&
        !isSrFlashcardsLoading &&
        !isSrFlashcardsFetching &&
        !isFlashcardsLoading &&
        !isFlashcardsFetching ? (
          <Flex flexDirection="column" justifyContent="center" height="100%">
            <StudyModeMainFrame
              flashcardIndex={flashcardIndex}
              flippedState={flippedState}
              maxLength={maxLength || 0}
              flashcards={srFlashcards}
              studyMode={STUDY_MODE_TYPES.SPACED_REPETITION}
              isFlashcardsEmpty={isEmpty(fetchedFlashcards)}
            />
            <SpacedRepetitionController
              srFlashcards={srFlashcards}
              ownerId={srFlashcards?.[flashcardIndex]?.owner_id}
              flashcardId={srFlashcards?.[flashcardIndex]?.id}
              deckId={srFlashcards?.[flashcardIndex]?.deck_id}
              maxLength={maxLength || 0}
              flashcardIndex={flashcardIndex}
              setFlippedState={setFlippedState}
              flippedState={flippedState}
              easeFactor={srFlashcards?.[flashcardIndex]?.ease_factor}
              easyBonus={deck?.easy_bonus}
              status={srFlashcards?.[flashcardIndex]?.status}
              currentLearningStatus={
                srFlashcards?.[flashcardIndex]?.learning_status
              }
              numberOfLearningCards={numberOfLearningCards}
              interval={srFlashcards?.[flashcardIndex]?.interval}
              numberOfLearnedCards={numberOfLearnedCards}
              numberOfNewCards={numberOfNewCards}
            />
          </Flex>
        ) : (
          <FullPageLoadingSpinner />
        )}
      </>
    );
  };

export default StudyModeSpacedRepetition;
