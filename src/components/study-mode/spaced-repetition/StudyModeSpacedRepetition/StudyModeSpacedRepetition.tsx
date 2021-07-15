import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSpacedRepetitionFlashcardsByDeckId } from "../../../../api";
import { Params, STUDY_MODE_TYPES } from "../../../../shared";
import { Flex, FullPageLoadingSpinner, Text } from "../../../common";
import StudyModeController from "../../StudyModeController/StudyModeController";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";

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
      () => getSpacedRepetitionFlashcardsByDeckId({ studySetId })
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
              <StudyModeController
                maxLength={maxLength}
                flashcardIndex={flashcardIndex}
                setFlashcardIndex={setFlashcardIndex}
                setFlippedState={setFlippedState}
                type={STUDY_MODE_TYPES.SPACED_REPETITION}
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
