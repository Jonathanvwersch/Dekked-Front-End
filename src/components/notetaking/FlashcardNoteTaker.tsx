import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import React from "react";
import RichEditor from "./Editor/RichEditor";

interface FlashcardNoteTakerProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

const FlashcardNoteTaker: React.FC<FlashcardNoteTakerProps> = ({
  editorState,
  setEditorState,
}) => {
  return (
    <RichEditor editorState={editorState} setEditorState={setEditorState} />
  );
};

export default FlashcardNoteTaker;
