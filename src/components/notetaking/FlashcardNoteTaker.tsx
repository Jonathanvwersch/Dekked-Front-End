import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import React from "react";

import RichEditor from "./Editor/RichEditor";

interface FlashcardNoteTakerProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  setHasFocus: React.Dispatch<React.SetStateAction<boolean>>;
  hasFocus: boolean;
  autoSave: (editorState: EditorState) => void;
}

const FlashcardNoteTaker: React.FC<FlashcardNoteTakerProps> = ({
  editorState,
  setEditorState,
  setHasFocus,
  hasFocus,
  autoSave,
}) => {
  return (
    <RichEditor
      editorType="flashcard"
      editorState={editorState}
      setEditorState={setEditorState}
      setHasFocus={setHasFocus}
      hasFocus={hasFocus}
      saveEditor={autoSave}
    />
  );
};

export default FlashcardNoteTaker;
