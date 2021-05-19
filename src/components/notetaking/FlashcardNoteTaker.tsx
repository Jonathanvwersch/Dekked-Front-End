import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import React from "react";

import RichEditor from "./Editor/RichEditor";

interface FlashcardNoteTakerProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  setHasFocus: React.Dispatch<React.SetStateAction<boolean>>;
  hasFocus: boolean;
  autoSave: (editorState: EditorState, id: string | undefined) => void;
  id: string | undefined;
}

const FlashcardNoteTaker: React.FC<FlashcardNoteTakerProps> = ({
  editorState,
  setEditorState,
  setHasFocus,
  hasFocus,
  autoSave,
  id,
}) => {
  return (
    <RichEditor
      editorType="flashcard"
      editorState={editorState}
      setEditorState={setEditorState}
      setHasFocus={setHasFocus}
      hasFocus={hasFocus}
      saveEditor={autoSave}
      id={id}
    />
  );
};

export default FlashcardNoteTaker;
