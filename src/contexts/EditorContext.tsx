import {
  EditorState,
  convertToRaw,
  RawDraftContentBlock,
  convertFromRaw,
} from "draft-js";
import { createContext, useCallback, useEffect, useState } from "react";
import React from "react";
import { usePage } from "../services/note-taking/usePage";
import { useParams } from "react-router";
import { useBlocks } from "../services/note-taking/useBlocks";
import { Params } from "../shared";
import { debounce, isNull } from "lodash";

export interface EditorContextProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  loading: boolean;
  autoSave: (editorState: EditorState, page: PageInterface | undefined) => void;
  saving: boolean;
  saveError: boolean;
  page: PageInterface | undefined;
  setDragBlockKey: React.Dispatch<React.SetStateAction<string | undefined>>;
  dragBlockKey: string | undefined;
}

export const EditorContext = createContext<EditorContextProps>(
  {} as EditorContextProps
);

export const EditorContextProvider: React.FC = ({ children }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
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

  return (
    <EditorContext.Provider
      value={{
        editorState,
        setEditorState,
        loading,
        autoSave,
        saving,
        page,
        saveError,
        dragBlockKey,
        setDragBlockKey,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
