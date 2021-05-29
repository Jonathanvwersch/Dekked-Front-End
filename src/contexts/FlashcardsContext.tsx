import { createContext, useEffect, useState } from "react";
import React from "react";
import useFlashcards from "../services/flashcards/useFlashcards";
import { useParams } from "react-router-dom";
import { Params } from "../shared";

export interface FlashcardsContextProps {
  isLoading: boolean;
  flashcards: FlashcardInterface[];
  setFlashcards: React.Dispatch<React.SetStateAction<FlashcardInterface[]>>;
}

export const FlashcardsContext = createContext<FlashcardsContextProps>(
  {} as FlashcardsContextProps
);

export const FlashcardsContextProvider: React.FC = ({ children }) => {
  const { id: studyPackId } = useParams<Params>();
  const { data, isLoading } = useFlashcards(studyPackId);
  const [flashcards, setFlashcards] = useState<FlashcardInterface[]>(data);

  useEffect(() => {
    setFlashcards(data);
  }, [data]);

  return (
    <FlashcardsContext.Provider
      value={{
        isLoading,
        flashcards,
        setFlashcards,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
};
