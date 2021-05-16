import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StudySetFlashcard } from "..";
import { useFlashcards } from "../../../services/file-structure";
import { Params } from "../../../shared";
import { ComponentLoadingSpinner, VFlex } from "../../common";

interface StudySetFlashcardsContainerProps {}

const StudySetFlashcardsContainer: React.FC<StudySetFlashcardsContainerProps> =
  () => {
    const { loading, flashcards, getFlashcards } = useFlashcards();
    const [saving, setSaving] = useState<boolean>(false);

    const { id } = useParams<Params>();

    useEffect(() => {
      if (id) {
        getFlashcards(id);
      }
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <>
        {!loading ? (
          <VFlex>
            {flashcards && !isEmpty(flashcards) ? (
              <>
                {flashcards.map((flashcard, index) => (
                  <StudySetFlashcard
                    loading={loading}
                    saving={saving}
                    index={index}
                    frontText={flashcard.front_ordering}
                    backText={flashcard.back_ordering}
                  />
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
