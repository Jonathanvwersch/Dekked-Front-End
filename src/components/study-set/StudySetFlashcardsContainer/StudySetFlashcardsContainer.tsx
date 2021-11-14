import { isEmpty, isEqual } from "lodash";
import React, { Fragment, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { StudySetFlashcard } from "..";
import Skeleton from "react-loading-skeleton";
import { Spacer, Flex, Text } from "dekked-design-system";
import { addedLinkedFlashcardAtom, flashcardsAtom } from "../../../store";
import { useAtom } from "jotai";
import { useIsMutating, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Params } from "../../../shared";
import { getDeckByStudySetId, getFlashcards } from "../../../api";
import { useTheme } from "../../../hooks";
import { FormattedMessage } from "react-intl";

interface StudySetFlashcardsContainerProps {}

export const sortFlashcardsByStarred = (
  a: FlashcardInterface,
  b: FlashcardInterface
) => {
  if (a.starred) return -1;
  else if (b.starred) return 1;
  else return 0;
};

const StudySetFlashcardsContainer: React.FC<StudySetFlashcardsContainerProps> =
  () => {
    const theme = useTheme();
    const { id: studySetId, type } = useParams<Params>();
    const [flashcards, setFlashcards] = useAtom(flashcardsAtom);
    const isAdding = useIsMutating({
      mutationKey: `${studySetId}-add-flashcard`,
    });
    const endOfFlashcardsContainer = useRef<HTMLDivElement>(null);
    const [addedLinkedFlashcard, setAddedLinkedFlashcard] = useAtom(
      addedLinkedFlashcardAtom
    );

    useLayoutEffect(() => {
      addedLinkedFlashcard !== 0 && setAddedLinkedFlashcard(0);
    }, [addedLinkedFlashcard, setAddedLinkedFlashcard]);

    const { data: deck } = useQuery(
      `${studySetId}-get-deck`,
      () => getDeckByStudySetId({ studySetId }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      }
    );

    const { data: fetchedFlashcards, isLoading } = useQuery(
      `${studySetId}-get-flashcards`,
      () => getFlashcards({ id: studySetId, type }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      }
    );

    useLayoutEffect(() => {
      setFlashcards(fetchedFlashcards);
    }, [fetchedFlashcards, setFlashcards]);

    return (
      <Flex flexDirection="column">
        {!isAdding && !isLoading ? (
          <>
            {flashcards && !isEmpty(flashcards) ? (
              <>
                {flashcards
                  ?.sort(sortFlashcardsByStarred)
                  .map((flashcard: FlashcardInterface, index: number) => (
                    <Fragment key={flashcard?.id}>
                      <StudySetFlashcard
                        index={index + 1}
                        deckId={deck?.id}
                        flashcardId={flashcard?.id}
                        frontBlocks={flashcard?.front_blocks}
                        backBlocks={flashcard?.back_blocks}
                        setFlashcards={setFlashcards}
                        starred={flashcard?.starred}
                      />
                      <Spacer height={theme.spacers.size32} />
                    </Fragment>
                  ))}
                <div ref={endOfFlashcardsContainer} />
              </>
            ) : (
              <Text
                as="p"
                fontSize={theme.typography.fontSizes.size16}
                fontColor={theme.colors.grey1}
              >
                <FormattedMessage id="studySet.flashcards.noFlashcards" />
              </Text>
            )}
          </>
        ) : (
          <Div>
            <StyledSkeleton width="100%" height="164px" count={2} />
          </Div>
        )}
      </Flex>
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

export default React.memo(
  StudySetFlashcardsContainer,
  (prevProps, newProps) => {
    return isEqual(newProps, prevProps);
  }
);
