import { createContext, useState } from "react";
import React from "react";

export interface LinkedFlashcardContextProps {
  isLinked: boolean;
  setIsLinked: React.Dispatch<React.SetStateAction<boolean>>;
  studyModeUrl: string | undefined;
  setStudyModeUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const LinkedFlashcardContext =
  createContext<LinkedFlashcardContextProps>({} as LinkedFlashcardContextProps);

export const LinkedFlashcardContextProvider: React.FC = ({ children }) => {
  const [isLinked, setIsLinked] = useState<boolean>(false);
  const [studyModeUrl, setStudyModeUrl] = useState<string>();

  return (
    <LinkedFlashcardContext.Provider
      value={{
        isLinked,
        setIsLinked,
        studyModeUrl,
        setStudyModeUrl,
      }}
    >
      {children}
    </LinkedFlashcardContext.Provider>
  );
};
