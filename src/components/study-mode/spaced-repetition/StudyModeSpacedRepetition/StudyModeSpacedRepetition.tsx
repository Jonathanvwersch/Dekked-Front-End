import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSpacedRepetitionFlashcardsByDeckId } from "../../../../api";
import { Params, STUDY_MODE_TYPES } from "../../../../shared";
import { Flex, FullPageLoadingSpinner } from "../../../common";
import StudyModeFlashcard from "../../StudyModeFlashcard/StudyModeFlashcard";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";
import SpacedRepetitionController from "../SpacedRepetitionController/SpacedRepetitionController";

interface StudyModeSpacedRepetitionProps {}

const StudyModeSpacedRepetition: React.FC<StudyModeSpacedRepetitionProps> =
  () => {
    const { flashcardIndex: index } = useParams<Params>();
    const [flashcardIndex, setFlashcardIndex] = useState<number>(
      Number(index) - 1
    );
    const { id: studySetId } = useParams<Params>();
    const { data, isLoading, isFetching } = useQuery<{
      flashcards: FlashcardInterface[];
      deck: DeckInterface;
    }>(
      `${studySetId}-get-sr-flashcards`,
      () => getSpacedRepetitionFlashcardsByDeckId({ studySetId }),
      { refetchOnReconnect: false, refetchOnWindowFocus: false }
    );

    const [flippedState, setFlippedState] = useState<boolean>(true);
    const maxLength = data?.flashcards?.length;

    return (
      <>
        {!isLoading && !isFetching ? (
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
                flashcards={data?.flashcards}
                studyMode={STUDY_MODE_TYPES.SPACED_REPETITION}
              />
              <SpacedRepetitionController
                ownerId={data?.flashcards?.[flashcardIndex]?.owner_id}
                flashcardId={data?.flashcards?.[flashcardIndex]?.id}
                deckId={data?.flashcards?.[flashcardIndex]?.deck_id}
                maxLength={maxLength}
                flashcardIndex={flashcardIndex}
                setFlashcardIndex={setFlashcardIndex}
                setFlippedState={setFlippedState}
                flippedState={flippedState}
                easeFactor={data?.flashcards?.[flashcardIndex]?.ease_factor}
                easyBonus={data?.deck?.easy_bonus}
                status={data?.flashcards?.[flashcardIndex]?.status}
                interval={data?.flashcards?.[flashcardIndex]?.interval}
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
