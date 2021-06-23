import { isEmpty } from "lodash";
import React, { Fragment, useContext } from "react";
import { useIsMutating } from "react-query";
import { useParams } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { StudySetFlashcard } from "..";
import { FlashcardsContext } from "../../../contexts";
import { Params } from "../../../shared";
import Skeleton from "react-loading-skeleton";
import { Spacer, Flex } from "../../common";

interface StudySetFlashcardsContainerProps {}

const StudySetFlashcardsContainer: React.FC<StudySetFlashcardsContainerProps> =
  () => {
    const theme = useContext(ThemeContext);
    const { id: studyPackId } = useParams<Params>();
    const { flashcards, isLoading, setFlashcards } =
      useContext(FlashcardsContext);
    const isAdding = useIsMutating({
      mutationKey: `${studyPackId}-add-flashcard`,
    });

    return (
      <>
        <Flex flexDirection="column">
          {!isAdding && !isLoading ? (
            <>
              {flashcards && !isEmpty(flashcards) ? (
                <>
                  {flashcards.map(
                    (flashcard: FlashcardInterface, index: number) => (
                      <Fragment key={flashcard.flashcard.id}>
                        <StudySetFlashcard
                          index={index + 1}
                          setFlashcards={setFlashcards}
                          flashcardId={flashcard.flashcard.id}
                          studyPackId={flashcard.flashcard.study_pack_id}
                          frontBlocks={flashcard.front_blocks}
                          backBlocks={flashcard.back_blocks}
                        />
                        <Spacer height={theme.spacers.size32} />
                      </Fragment>
                    )
                  )}
                </>
              ) : null}
            </>
          ) : (
            <StyledSkeleton width="100%" height="164px" count={2} />
          )}
        </Flex>
      </>
    );
  };

const StyledSkeleton = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.spacers.size32};
`;

export default StudySetFlashcardsContainer;
