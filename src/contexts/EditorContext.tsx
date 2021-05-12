import {
  EditorState,
  RichUtils,
  convertToRaw,
  RawDraftContentBlock,
  convertFromRaw,
  ContentBlock,
} from "draft-js";
import { createContext, useCallback, useEffect, useState } from "react";
import React from "react";
import { usePage } from "../services/note-taking/usePage";
import { useParams } from "react-router";
import { useBlocks } from "../services/note-taking/useBlocks";
import { BLOCK_TYPES, Params, TEXT_STYLES } from "../shared";
import { debounce, isNull } from "lodash";
import {
  getCurrentBlock,
  getWordCount,
  removeSpecificBlockStyle,
  returnWholeBlockEditorState,
} from "../components/notetaking/Editor/Editor.helpers";

export interface EditorContextProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  toggleInlineStyle: (
    style: TEXT_STYLES,
    stylesToRemove?: string[] | undefined
  ) => void;
  toggleBlockType: (style: BLOCK_TYPES) => void;
  numOfWords: number;
  toggleBlockStyle: (
    style: TEXT_STYLES,
    stylesToRemove?: TEXT_STYLES[] | undefined
  ) => void;
  loading: boolean;
  autoSave: (editorState: EditorState, page: PageInterface | undefined) => void;
  saving: boolean;
  saveError: boolean;
  page: PageInterface | undefined;
  currentBlock: ContentBlock;
  setDragBlockKey: React.Dispatch<React.SetStateAction<string | undefined>>;
  dragBlockKey: string | undefined;
}

export const EditorContext = createContext<EditorContextProps>(
  {} as EditorContextProps
);

export const EditorContextProvider: React.FC = ({ children }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [numOfWords, setNumOfWords] = useState<number>(0);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<boolean>(false);
  const { id } = useParams<Params>();
  const { page, savePage } = usePage(id);
  const blocks = useBlocks(page?.id);
  const [loading, setLoading] = useState<boolean>(isNull(blocks));
  const [dragBlockKey, setDragBlockKey] = useState<string | undefined>();

  useEffect(() => {
    setLoading(isNull(blocks));
  }, [id, blocks]);

  const currentBlock = getCurrentBlock(editorState);

  // Changes style of inline text
  const toggleInlineStyle = (style: TEXT_STYLES, stylesToRemove?: string[]) => {
    let newEditorState = editorState;
    if (stylesToRemove) {
      newEditorState = removeSpecificBlockStyle(stylesToRemove, editorState);
    }
    setEditorState(RichUtils.toggleInlineStyle(newEditorState, style));
  };

  // Changes style of all text in a given block
  // Can also specify which styles to delete before style change
  const toggleBlockStyle = (
    style: TEXT_STYLES,
    stylesToRemove?: TEXT_STYLES[]
  ) => {
    let newEditorState = returnWholeBlockEditorState(editorState);
    if (stylesToRemove) {
      newEditorState = removeSpecificBlockStyle(stylesToRemove, editorState);
    }
    setEditorState(RichUtils.toggleInlineStyle(newEditorState, style));
  };

  // changes type of block
  const toggleBlockType = (type: BLOCK_TYPES) => {
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };

  // Make call to server to save text blocks
  const onSave = async (
    editorState: EditorState,
    page: PageInterface | undefined
  ) => {
    setSaving(true);
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const keys = rawContent.blocks.map((val) => val.key);
    const blocks = rawContent.blocks.map((val) => JSON.stringify(val));
    const response = await savePage({
      draft_keys: keys,
      blocks,
      page,
    });
    if (!response.success) {
      setSaveError(true);
    } else {
      setSaving(!response.success);
      setSaveError(false);
    }
  };

  // Debounce function to autosave notes
  const debounced = debounce(
    (editorState: EditorState, page: PageInterface | undefined) =>
      onSave(editorState, page),
    500
  );

  const autoSave = useCallback(
    (editorState: EditorState, page: PageInterface | undefined) => {
      debounced(editorState, page);
    },
    []
  );

  // Set editor state on mount
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

  // Calculate the number of words in text
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
        numOfWords,
        toggleBlockStyle,
        loading,
        autoSave,
        saving,
        page,
        currentBlock,
        saveError,
        dragBlockKey,
        setDragBlockKey,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
