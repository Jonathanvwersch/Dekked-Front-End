import { createContext, useEffect, useLayoutEffect, useState } from "react";
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
  handleDeleteFlashcard: (flashcardId: string, ownerId: string) => void;
}

export const FlashcardsContext = createContext<FlashcardsContextProps>(
  {} as FlashcardsContextProps
);

export const FlashcardsContextProvider: React.FC = ({ children }) => {
  const { getFlashcards, flashcards, addFlashcard, deleteFlashcard } =
    useFlashcards();
  const [loading, setLoading] = useState<boolean>(isNull(flashcards));

  const { id, tab } = useParams<Params>();

  useEffect(() => {
    id && getFlashcards(id);
  }, [id, tab]);

  console.log(loading);

  useEffect(() => {
    setLoading(isNull(flashcards));
  }, [flashcards, id]);

  useLayoutEffect(() => {
    setLoading(true);
  }, [id, tab]);

  const handleDeleteFlashcard = (flashcardId: string, ownerId: string) => {
    deleteFlashcard(ownerId, flashcardId, id);
  };

  return (
    <FlashcardsContext.Provider
      value={{
        flashcards,
        addFlashcard,
        loading,
        handleDeleteFlashcard,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
};
