import { createContext, useState } from "react";
import React from "react";

export interface EditorContextProps {
  saving: boolean;
  saveError: boolean;
  setSaveError: React.Dispatch<React.SetStateAction<boolean>>;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  currentBlock:
    | {
        key: string | undefined;
        hasFocus: boolean | undefined;
      }
    | undefined;
  setCurrentBlock: React.Dispatch<
    React.SetStateAction<
      | {
          key: string | undefined;
          hasFocus: boolean | undefined;
        }
      | undefined
    >
  >;
}

export const EditorContext = createContext<EditorContextProps>(
  {} as EditorContextProps
);

export const EditorContextProvider: React.FC = ({ children }) => {
  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<boolean>(false);
  const [currentBlock, setCurrentBlock] =
    useState<{
      key: string | undefined;
      hasFocus: boolean | undefined;
    }>();

  return (
    <EditorContext.Provider
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
    </EditorContext.Provider>
  );
};
