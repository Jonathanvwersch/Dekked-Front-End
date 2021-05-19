import { createContext, useCallback, useEffect, useState } from "react";
import React from "react";
import { useFlashcards } from "../services/file-structure";
import { useParams } from "react-router-dom";
import { Params } from "../shared";
import { isNull } from "lodash";

export interface FlashcardsContextProps {
  flashcards: FlashcardInterface[] | null;
  addFlashcard: (
    owner_id: string,
    study_pack_id: string,
    block_link?: string | undefined
  ) => Promise<void>;
  loading: boolean;
}

export const FlashcardsContext = createContext<FlashcardsContextProps>(
  {} as FlashcardsContextProps
);

export const FlashcardsContextProvider: React.FC = ({ children }) => {
  const { getFlashcards, flashcards, addFlashcard } = useFlashcards();
  const [loading, setLoading] = useState<boolean>(isNull(flashcards));

  const { id } = useParams<Params>();

  useEffect(() => {
    id && getFlashcards(id);
  }, [id]);

  useEffect(() => {
    setLoading(isNull(flashcards));
  }, [flashcards, id]);

  useEffect(() => {
    setLoading(true);
  }, [id]);

  return (
    <FlashcardsContext.Provider
      value={{
        flashcards,
        addFlashcard,
        loading,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
};
