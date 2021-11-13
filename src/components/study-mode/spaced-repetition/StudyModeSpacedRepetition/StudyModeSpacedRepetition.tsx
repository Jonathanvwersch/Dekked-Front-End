import { useAtom } from "jotai";
import { isEmpty } from "lodash";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getFlashcards,
  getSpacedRepetitionFlashcards,
  getDeckByStudySetId,
} from "../../../../api";
import { Params, STUDY_MODE_TYPES } from "../../../../shared";
import { currentFlashcardIndexAtom, srFlashcardsAtom } from "../../../../store";
import { Flex, FullPageLoadingSpinner } from "dekked-design-system";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";
import SpacedRepetitionController from "../SpacedRepetitionController/SpacedRepetitionController";
import { calculateNumberOfCardsGroupedByLearningStatus } from "./StudyModeSpacedRepetition.helpers";
import { sortFlashcardsByStarred } from "../../../study-set/StudySetFlashcardsContainer/StudySetFlashcardsContainer";

interface StudyModeSpacedRepetitionProps {}

const StudyModeSpacedRepetition: React.FC<StudyModeSpacedRepetitionProps> =
  () => {
    const [flashcardIndex] = useAtom(currentFlashcardIndexAtom);
    const [numberOfLearnedCards, setNumberOfLearnedCards] = useState<number>(0);
    const [numberOfLearningCards, setNumberOfLearningCards] =
      useState<number>(0);
    const [numberOfNewCards, setNumberOfNewCards] = useState<number>(0);
    const [srFlashcards, setSrFlashcards] = useAtom(srFlashcardsAtom);
    const { id: fileId, type } = useParams<Params>();
    const [flippedState, setFlippedState] = useState<boolean>(true);
    const [maxLength, setMaxLength] = useState<number>();

    const { data: deck, isLoading: isDeckLoading } = useQuery(
      `${fileId}-get-deck`,
      () => getDeckByStudySetId({ studySetId: fileId }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: !srFlashcards && flashcardIndex === 0,
      }
    );

    const {
      data: fetchedFlashcards,
      isLoading: isFlashcardsLoading,
      isFetching: isFlashcardsFetching,
    } = useQuery(
      `${fileId}-get-flashcards`,
      () => getFlashcards({ id: fileId, type }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    );

    const {
      data: fetchedSrFlashcards,
      isLoading: isSrFlashcardsLoading,
      isFetching: isSrFlashcardsFetching,
    } = useQuery(
      `${fileId}-get-sr-flashcards`,
      () => getSpacedRepetitionFlashcards({ id: fileId, type }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: flashcardIndex === 0,
        onSuccess: (data) => setMaxLength(data?.length),
      }
    );

    useLayoutEffect(() => {
      setSrFlashcards(fetchedSrFlashcards?.sort(sortFlashcardsByStarred));
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
              setSrFlashcards={setSrFlashcards}
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
