import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import React from "react";

import RichEditor from "./Editor/RichEditor";

interface FlashcardNoteTakerProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  setHasFocus: React.Dispatch<React.SetStateAction<boolean>>;
  hasFocus: boolean;
  isEditable: boolean;
  editorRef: React.MutableRefObject<any>;
}

const FlashcardNoteTaker: React.FC<FlashcardNoteTakerProps> = ({
  editorState,
  setEditorState,
  setHasFocus,
  hasFocus,
  isEditable,
  editorRef,
}) => {
  return (
    <RichEditor
      editorType="flashcard"
      editorState={editorState}
      setEditorState={setEditorState}
      setHasFocus={setHasFocus}
      hasFocus={hasFocus}
      isEditable={isEditable}
      editorRef={editorRef}
    />
  );
};

export default FlashcardNoteTaker;
