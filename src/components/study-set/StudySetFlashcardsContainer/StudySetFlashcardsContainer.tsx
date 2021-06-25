import { isEmpty } from "lodash";
import React, { Fragment, useContext, useEffect, useRef } from "react";
import styled, { ThemeContext } from "styled-components";
import { StudySetFlashcard } from "..";
import Skeleton from "react-loading-skeleton";
import { Spacer, Flex } from "../../common";
import { flashcardsAtom } from "../../../store";
import { useAtom } from "jotai";
import { useIsMutating, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Params } from "../../../shared";
import { getFlashcards } from "../../../services/flashcards/flashcards-api";

interface StudySetFlashcardsContainerProps {}

const StudySetFlashcardsContainer: React.FC<StudySetFlashcardsContainerProps> =
  () => {
    const theme = useContext(ThemeContext);
    const { id: studyPackId } = useParams<Params>();
    const [flashcards, setFlashcards] = useAtom(flashcardsAtom);
    const isAdding = useIsMutating({
      mutationKey: `${studyPackId}-add-flashcard`,
    });
    const endOfFlashcardsContainer = useRef<HTMLDivElement>(null);

    console.log(flashcards);

    const { data, isLoading } = useQuery(
      `${studyPackId}-get-flashcards`,
      () => getFlashcards({ studyPackId }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      }
    );

    useEffect(() => {
      setFlashcards(data);
    }, [data, setFlashcards]);

    useEffect(() => {
      if (!isAdding) {
        endOfFlashcardsContainer?.current?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, [isAdding]);

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
                  <div ref={endOfFlashcardsContainer} />
                </>
              ) : null}
            </>
          ) : (
            <Div>
              <StyledSkeleton width="100%" height="164px" count={3} />
            </Div>
          )}
        </Flex>
      </>
    );
  };

const Div = styled.div`
  width: 100%;
  & span {
    width: 100%;
  }
`;

const StyledSkeleton = styled(Skeleton)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacers.size32};
`;

export default StudySetFlashcardsContainer;
