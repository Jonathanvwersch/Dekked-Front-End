import {
  EditorState,
  RichUtils,
  convertToRaw,
  RawDraftContentBlock,
  convertFromRaw,
  SelectionState,
  ContentBlock,
} from "draft-js";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { usePage } from "../services/note-taking/usePage";
import { useParams } from "react-router";
import { useBlocks } from "../services/note-taking/useBlocks";
import { BLOCK_TYPES, Params, TEXT_STYLES } from "../shared";
import { getWordCount } from "../components/notetaking/Utils/editorUtils";
import { isNull } from "lodash";

interface EditorContextProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  toggleInlineStyle: (style: TEXT_STYLES) => void;
  toggleBlockType: (style: BLOCK_TYPES) => void;
  onSave: () => void;
  numOfWords: number;
  toggleBlockStyle: (
    style: TEXT_STYLES,
    currentBlock: ContentBlock,
    currentKey: any
  ) => void;
  updateDataOfBlock: (currentBlock: ContentBlock, newData: any) => EditorState;
  loading: boolean;
}

export const EditorContext = createContext<EditorContextProps>(
  {} as EditorContextProps
);

export const EditorContextProvider: React.FC = ({ children }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [numOfWords, setNumOfWords] = useState<number>(0);
  const { id } = useParams<Params>();
  const { page, savePage } = usePage(id);
  const blocks = useBlocks(page?.id);
  const loading = isNull(blocks);

  // Changes style of inline text
  const toggleInlineStyle = (style: TEXT_STYLES) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Changes style of all text in a given block
  const toggleBlockStyle = (
    style: TEXT_STYLES,
    currentBlock: ContentBlock,
    currentKey: any
  ) => {
    const selectionState = SelectionState.createEmpty(currentKey);

    const entireBlockSelectionState = selectionState.merge({
      anchorKey: currentKey,
      anchorOffset: 0,
      focusKey: currentKey,
      focusOffset: currentBlock.getText().length,
    });

    const newEditorState = EditorState.forceSelection(
      editorState,
      entireBlockSelectionState
    );
    setEditorState(RichUtils.toggleInlineStyle(newEditorState, style));
  };

  const toggleBlockType = (type: BLOCK_TYPES) => {
    setEditorState(RichUtils.toggleBlockType(editorState, type));
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

  const updateDataOfBlock = (currentBlock: any, newData: any) => {
    const contentState = editorState.getCurrentContent();
    const newBlock = currentBlock.merge({
      data: newData,
    });
    console.log(newData);
    const newContentState = contentState.merge({
      blockMap: contentState.getBlockMap().set(currentBlock.getKey(), newBlock),
    });
    return EditorState.push(
      editorState,
      newContentState as any,
      "change-block-type"
    );
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

  useEffect(() => {
    setNumOfWords(getWordCount(editorState));
  }, [numOfWords, editorState, setNumOfWords]);

  return (
    <EditorContext.Provider
      value={{
        editorState,
        setEditorState,
        toggleInlineStyle,
        toggleBlockType,
        onSave,
        numOfWords,
        toggleBlockStyle,
        updateDataOfBlock,
        loading,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
