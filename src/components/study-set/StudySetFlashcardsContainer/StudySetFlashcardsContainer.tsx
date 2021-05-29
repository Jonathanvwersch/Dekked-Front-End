import { isEmpty } from "lodash";
import React, { Fragment, useContext } from "react";
import { ThemeContext } from "styled-components";
import { StudySetFlashcard } from "..";
import { FlashcardsContext } from "../../../contexts";

import { ComponentLoadingSpinner, Spacer, Flex } from "../../common";

interface StudySetFlashcardsContainerProps {}

const StudySetFlashcardsContainer: React.FC<StudySetFlashcardsContainerProps> =
  () => {
    const theme = useContext(ThemeContext);
    const { flashcards, isLoading, setFlashcards } =
      useContext(FlashcardsContext);

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
                        setFlashcards={setFlashcards}
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
