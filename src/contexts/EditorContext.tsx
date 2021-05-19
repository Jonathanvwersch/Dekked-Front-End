import { createContext, useState } from "react";
import React from "react";

export interface EditorContextProps {
  saving: boolean;
  saveError: boolean;
  setSaveError: React.Dispatch<React.SetStateAction<boolean>>;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  currentBlockKey: string | undefined;
  setCurrentBlockKey: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const EditorContext = createContext<EditorContextProps>(
  {} as EditorContextProps
);

export const EditorContextProvider: React.FC = ({ children }) => {
  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<boolean>(false);
  const [currentBlockKey, setCurrentBlockKey] = useState<string | undefined>();

  return (
    <EditorContext.Provider
      value={{
        saving,
        saveError,
        setSaveError,
        setSaving,
        currentBlockKey,
        setCurrentBlockKey,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
