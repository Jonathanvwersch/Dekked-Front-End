import { createContext, useEffect, useState } from "react";
import React from "react";
import { useFlashcards } from "../services/file-structure";
import { useParams } from "react-router-dom";
import { Params, TAB_TYPE } from "../shared";
import { isNull } from "lodash";

export interface FlashcardsContextProps {
  flashcards: FlashcardInterface[] | null;
  addFlashcard: (
    owner_id: string,
    study_pack_id: string,
    block_link?: string | undefined
  ) => Promise<void>;
  loading: boolean;
  handleDeleteFlashcard: (flashcardId: string) => void;
}

export const FlashcardsContext = createContext<FlashcardsContextProps>(
  {} as FlashcardsContextProps
);

export const FlashcardsContextProvider: React.FC = ({ children }) => {
  const { getFlashcards, flashcards, addFlashcard, deleteFlashcard } =
    useFlashcards();
  const [loading, setLoading] = useState<boolean>(isNull(flashcards));

  const { id: studyPackId, tab } = useParams<Params>();

  useEffect(() => {
    setLoading(isNull(flashcards));
  }, [flashcards, studyPackId]);

  useEffect(() => {
    setLoading(true);
  }, [studyPackId]);

  const handleDeleteFlashcard = (flashcardId: string) => {
    deleteFlashcard(flashcardId, studyPackId);
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
