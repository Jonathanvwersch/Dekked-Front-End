import React, { useEffect, useState } from "react";
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
    const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
    const { id: studySetId } = useParams<Params>();
    const { data, isLoading, isFetching } = useQuery<{
      flashcards: FlashcardInterface[];
      deck: DeckInterface;
    }>(
      `${studySetId}-get-sr-flashcards`,
      () => getSpacedRepetitionFlashcardsByDeckId({ studySetId }),
      { refetchOnReconnect: false, refetchOnWindowFocus: false }
    );
    const [flashcards, setFlashcards] =
      useState<FlashcardInterface[] | undefined>();
    const [flippedState, setFlippedState] = useState<boolean>(true);
    const maxLength = data?.flashcards?.length;

    useEffect(() => {
      setFlashcards(data?.flashcards);
    }, [data]);

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
                easyBonus={data?.deck?.easy_bonus}
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
