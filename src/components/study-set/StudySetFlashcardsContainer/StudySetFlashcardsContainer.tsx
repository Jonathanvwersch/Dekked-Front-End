import { isEmpty, isEqual } from "lodash";
import React, { Fragment, useContext, useEffect, useRef } from "react";
import styled, { ThemeContext } from "styled-components";
import { StudySetFlashcard } from "..";
import Skeleton from "react-loading-skeleton";
import { Spacer, Flex } from "../../common";
import { deckAtom, flashcardsAtom, srFlashcardsAtom } from "../../../store";
import { useAtom } from "jotai";
import { useIsMutating, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Params } from "../../../shared";
import {
  getDeckByStudySetId,
  getFlashcardsByDeckId,
  getSpacedRepetitionFlashcardsByDeckId,
} from "../../../api/flashcards/flashcardsApi";

interface StudySetFlashcardsContainerProps {}

const StudySetFlashcardsContainer: React.FC<StudySetFlashcardsContainerProps> =
  () => {
    const theme = useContext(ThemeContext);
    const { id: studySetId } = useParams<Params>();
    const [flashcards, setFlashcards] = useAtom(flashcardsAtom);
    const [, setSrFlashcards] = useAtom(srFlashcardsAtom);
    const [, setDeck] = useAtom(deckAtom);
    const isAdding = useIsMutating({
      mutationKey: `${studySetId}-add-flashcard`,
    });
    const endOfFlashcardsContainer = useRef<HTMLDivElement>(null);

    const { data: deck } = useQuery(
      `${studySetId}-get-deck`,
      () => getDeckByStudySetId({ studySetId }),
      { refetchOnReconnect: false, refetchOnWindowFocus: false }
    );

    const { data: fetchedSrFlashcards } = useQuery<FlashcardInterface[]>(
      `${studySetId}-get-sr-flashcards`,
      () => getSpacedRepetitionFlashcardsByDeckId({ deckId: deck?.id }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: Boolean(deck?.id),
      }
    );

    const { data: fetchedFlashcards, isLoading } = useQuery<
      FlashcardInterface[]
    >(
      `${studySetId}-get-flashcards`,
      () => getFlashcardsByDeckId({ deckId: deck?.id }),
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: Boolean(deck?.id),
      }
    );

    useEffect(() => {
      setFlashcards(fetchedFlashcards);
    }, [fetchedFlashcards, setFlashcards]);

    useEffect(() => {
      setSrFlashcards(fetchedSrFlashcards);
    }, [fetchedSrFlashcards, setSrFlashcards]);

    useEffect(() => {
      setDeck(deck);
    }, [setDeck, deck]);

    return (
      <Flex flexDirection="column">
        {!isAdding && !isLoading ? (
          <>
            {flashcards && !isEmpty(flashcards) ? (
              <>
                {flashcards.map(
                  (flashcard: FlashcardInterface, index: number) => (
                    <Fragment key={flashcard.id}>
                      <StudySetFlashcard
                        index={index + 1}
                        flashcardId={flashcard.id}
                        frontBlocks={flashcard.front_blocks}
                        backBlocks={flashcard.back_blocks}
                        setFlashcards={setFlashcards}
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
