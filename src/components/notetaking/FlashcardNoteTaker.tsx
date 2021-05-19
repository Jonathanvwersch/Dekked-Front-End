import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import React from "react";

import RichEditor from "./Editor/RichEditor";

interface FlashcardNoteTakerProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  setHasFocus: React.Dispatch<React.SetStateAction<boolean>>;
  hasFocus: boolean;
  autoSave: (
    editorState: EditorState,
    flashcardId: string | undefined,
    ownerId: string | undefined
  ) => void;
  id: string | undefined;
  ownerId: string | undefined;
}

const FlashcardNoteTaker: React.FC<FlashcardNoteTakerProps> = ({
  editorState,
  setEditorState,
  setHasFocus,
  hasFocus,
  autoSave,
  id,
  ownerId,
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
      ownerId={ownerId}
    />
  );
};

export default FlashcardNoteTaker;
