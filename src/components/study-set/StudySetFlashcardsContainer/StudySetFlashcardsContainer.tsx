import { isEmpty } from "lodash";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useIsMutating, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { StudySetFlashcard } from "..";
import { getFlashcards } from "../../../services/flashcards/flashcards-api";

import { Params } from "../../../shared";
import { ComponentLoadingSpinner, Spacer, Flex } from "../../common";

interface StudySetFlashcardsContainerProps {}

const StudySetFlashcardsContainer: React.FC<StudySetFlashcardsContainerProps> =
  () => {
    const theme = useContext(ThemeContext);
    const [isAddingOrDeleting, setIsAddingOrDeleting] = useState<number>(0);
    const { id: studyPackId } = useParams<Params>();
    const isAdding = useIsMutating({
      mutationKey: `${studyPackId}-add-flashcard`,
    });

    const isDeleting = useIsMutating({
      mutationKey: `${studyPackId}-delete-flashcard`,
    });

    useEffect(() => {
      setIsAddingOrDeleting(isAdding);
    }, [isAdding]);

    useEffect(() => {
      setIsAddingOrDeleting(isDeleting);
    }, [isDeleting]);

    const { data: flashcards, isLoading } = useQuery(
      `${studyPackId}-get-flashcards`,
      () => getFlashcards(studyPackId),
      { enabled: isAddingOrDeleting === 0 }
    );

    return (
      <>
        {!isLoading ? (
          <Flex flexDirection="column">
            {flashcards && !isEmpty(flashcards) ? (
              <>
                {flashcards.map(
                  (flashcard: FlashcardInterface, index: number) => (
                    <Fragment key={flashcard.flashcard.id}>
                      <StudySetFlashcard
                        index={index + 1}
                        flashcardId={flashcard.flashcard.id}
                        studyPackId={flashcard.flashcard.study_pack_id}
                        frontBlocks={flashcard.front_blocks}
                        backBlocks={flashcard.back_blocks}
                        ownerId={flashcard.flashcard.owner_id}
                      />
                      <Spacer height={theme.spacers.size32} />
                    </Fragment>
                  )
                )}
              </>
            ) : null}
          </Flex>
        ) : (
          <ComponentLoadingSpinner />
        )}
      </>
    );
  };

export default StudySetFlashcardsContainer;
