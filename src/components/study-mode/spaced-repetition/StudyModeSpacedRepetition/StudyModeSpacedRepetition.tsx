import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSpacedRepetitionFlashcardsByDeckId } from "../../../../api";
import { Params, STUDY_MODE_TYPES } from "../../../../shared";
import { Flex, FullPageLoadingSpinner, Text } from "../../../common";
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
    const { data: flashcards, isLoading } = useQuery<FlashcardInterface[]>(
      `${studySetId}-get-sr-flashcards`,
      () => getSpacedRepetitionFlashcardsByDeckId({ studySetId }),
      { refetchOnReconnect: false, refetchOnWindowFocus: false }
    );

    const [flippedState, setFlippedState] = useState<boolean>(true);
    const maxLength = flashcards?.length;

    return (
      <>
        {!isLoading ? (
          !maxLength ? (
            <Text>Empty</Text>
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
                flashcardIndex={flashcardIndex}
                setFlashcardIndex={setFlashcardIndex}
                setFlippedState={setFlippedState}
                flippedState={flippedState}
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
