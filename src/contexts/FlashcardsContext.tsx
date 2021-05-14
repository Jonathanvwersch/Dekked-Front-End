import React, { createContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useFlashcards } from "../services/file-structure";
import { Params } from "../shared";

interface FlashcardsContextTypes {
  addFlashcard: (
    parentId: string | undefined,
    studySetId: string | undefined
  ) => void;
  flashcards: FlashcardInterface | undefined;
}

export const FlashcardsContext = createContext<FlashcardsContextTypes>(
  {} as FlashcardsContextTypes
);

export const FlashcardsContextProvider: React.FC = ({ children }) => {
  const { id } = useParams<Params>();
  const { flashcards, addFlashcard: add, getFlashcards } = useFlashcards();

  const addFlashcard = (
    parentId: string | undefined,
    studySetId: string | undefined
  ) => {
    parentId && studySetId && add(parentId, studySetId);
  };

  useEffect(() => {
    if (id) {
      getFlashcards(id);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FlashcardsContext.Provider value={{ addFlashcard, flashcards }}>
      {children}
    </FlashcardsContext.Provider>
  );
};
