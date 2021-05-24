import { createContext, useState } from "react";
import React from "react";

export interface SavingEditorContextProps {
  saving: boolean;
  saveError: boolean;
  setSaveError: React.Dispatch<React.SetStateAction<boolean>>;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SavingEditorContext = createContext<SavingEditorContextProps>(
  {} as SavingEditorContextProps
);

export const SavingEditorContextProvider: React.FC = ({ children }) => {
  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<boolean>(false);

  return (
    <SavingEditorContext.Provider
      value={{
        saving,
        saveError,
        setSaveError,
        setSaving,
      }}
    >
      {children}
    </SavingEditorContext.Provider>
  );
};
