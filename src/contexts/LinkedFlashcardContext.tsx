import { createContext, useState } from "react";
import React from "react";

export interface LinkedFlashcardContextProps {
  isLinked: boolean;
  setIsLinked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LinkedFlashcardContext =
  createContext<LinkedFlashcardContextProps>({} as LinkedFlashcardContextProps);

export const LinkedFlashcardContextProvider: React.FC = ({ children }) => {
  const [isLinked, setIsLinked] = useState<boolean>(false);

  return (
    <LinkedFlashcardContext.Provider
      value={{
        isLinked,
        setIsLinked,
      }}
    >
      {children}
    </LinkedFlashcardContext.Provider>
  );
};
