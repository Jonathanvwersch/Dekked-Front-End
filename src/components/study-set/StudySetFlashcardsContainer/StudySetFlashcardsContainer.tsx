import { isEmpty } from "lodash";
import React, { Fragment, useContext } from "react";
import { ThemeContext } from "styled-components";
import { StudySetFlashcard } from "..";
import { FlashcardsContext } from "../../../contexts/FlashcardsContext";
import { ComponentLoadingSpinner, Spacer, VFlex } from "../../common";

interface StudySetFlashcardsContainerProps {}

const StudySetFlashcardsContainer: React.FC<StudySetFlashcardsContainerProps> =
  () => {
    const theme = useContext(ThemeContext);
    const { flashcards, loading } = useContext(FlashcardsContext);

    console.log(flashcards);

    return (
      <>
        {!loading ? (
          <VFlex>
            {flashcards && !isEmpty(flashcards) ? (
              <>
                {flashcards.map((flashcard, index) => (
                  <Fragment key={flashcard.flashcard.id}>
                    <StudySetFlashcard
                      loading={loading}
                      index={index + 1}
                      flashcardId={flashcard.flashcard.id}
                    />
                    <Spacer height={theme.spacers.size32} />
                  </Fragment>
                ))}
              </>
            ) : null}
          </VFlex>
        ) : (
          <ComponentLoadingSpinner />
        )}
      </>
    );
  };

export default StudySetFlashcardsContainer;
