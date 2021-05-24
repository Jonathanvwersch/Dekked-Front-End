import { createContext, useState } from "react";
import React from "react";

export interface CurrentBlockContextProps {
  saving: boolean;
  saveError: boolean;
  setSaveError: React.Dispatch<React.SetStateAction<boolean>>;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  currentBlock: {
    key: string | undefined;
    hasFocus: boolean;
  };
  setCurrentBlock: React.Dispatch<
    React.SetStateAction<{
      key: string | undefined;
      hasFocus: boolean;
    }>
  >;
}

export const CurrentBlockContext = createContext<CurrentBlockContextProps>(
  {} as CurrentBlockContextProps
);

export const CurrentBlockContextProvider: React.FC = ({ children }) => {
  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<boolean>(false);
  const [currentBlock, setCurrentBlock] = useState<{
    key: string | undefined;
    hasFocus: boolean;
  }>({ key: "", hasFocus: false });

  return (
    <CurrentBlockContext.Provider
      value={{
        saving,
        saveError,
        setSaveError,
        setSaving,
        currentBlock,
        setCurrentBlock,
      }}
    >
      {children}
    </CurrentBlockContext.Provider>
  );
};
