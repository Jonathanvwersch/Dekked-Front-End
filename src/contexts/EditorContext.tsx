import {
  EditorState,
  RichUtils,
  convertToRaw,
  RawDraftContentBlock,
  convertFromRaw,
} from "draft-js";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { usePage } from "../services/note-taking/usePage";
import { useParams } from "react-router";
import { useBlocks } from "../services/note-taking/useBlocks";
import { Params } from "../shared";

interface EditorContextProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  toggleInLineStyle: (style: string) => void;
  toggleBlockStyle: (style: string) => void;
  onSave: () => void;
}

export const EditorContext = createContext<EditorContextProps>(
  {} as EditorContextProps
);

export const EditorContextProvider: React.FC = ({ children }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { id } = useParams<Params>();
  const { page, savePage } = usePage(id);
  const blocks = useBlocks(page?.id);
  const toggleInLineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockStyle = (style: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, style));
  };

  const onSave = async () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const keys = rawContent.blocks.map((val) => val.key);
    const blocks = rawContent.blocks.map((val) => JSON.stringify(val));
    const response = await savePage({
      draft_keys: keys,
      blocks,
    });

    console.log(response);
  };

  useEffect(() => {
    if (blocks) {
      const parsedBlocks: RawDraftContentBlock[] = blocks.map((blocks) =>
        JSON.parse(blocks)
      );
      const savedState = convertFromRaw({
        blocks: parsedBlocks,
        entityMap: {},
      });
      setEditorState(EditorState.createWithContent(savedState));
    }
  }, [blocks]);

  return (
    <EditorContext.Provider
      value={{
        editorState,
        setEditorState,
        toggleInLineStyle,
        toggleBlockStyle,
        onSave,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
