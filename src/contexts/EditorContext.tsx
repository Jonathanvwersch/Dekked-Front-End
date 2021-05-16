import { createContext, useState } from "react";
import React from "react";

export interface EditorContextProps {
  saving: boolean;
  saveError: boolean;
  setSaveError: React.Dispatch<React.SetStateAction<boolean>>;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditorContext = createContext<EditorContextProps>(
  {} as EditorContextProps
);

export const EditorContextProvider: React.FC = ({ children }) => {
  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<boolean>(false);

  return (
    <EditorContext.Provider
      value={{
        saving,
        saveError,
        setSaveError,
        setSaving,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
