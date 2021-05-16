import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import React from "react";
import RichEditor from "./Editor/RichEditor";

interface NotetakerProps {
  editorState?: EditorState;
  setEditorState?: React.Dispatch<React.SetStateAction<EditorState>>;
}

const NoteTaker: React.FC<NotetakerProps> = ({
  editorState,
  setEditorState,
}) => {
  return <RichEditor />;
};

export default NoteTaker;
