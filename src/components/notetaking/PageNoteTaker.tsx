import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentBlock,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { debounce, isEmpty, isNull } from "lodash";

import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { CurrentBlockContext, SavingEditorContext } from "../../contexts";
import { useBlocks } from "../../services/note-taking/useBlocks";
import { usePage } from "../../services/note-taking/usePage";
import { Params } from "../../shared";
import {
  convertBlocksToContent,
  createKeysAndBlocks,
  getCurrentBlock,
} from "./Editor/Editor.helpers";
import RichEditor from "./Editor/RichEditor";

interface PageNoteTakerProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

const PageNoteTaker: React.FC<PageNoteTakerProps> = ({
  editorState,
  setEditorState,
}) => {
  const [editorHasFocus, setEditorHasFocus] = useState<boolean>(false);
  const { setCurrentBlock } = useContext(CurrentBlockContext);
  const { setSaving, setSaveError } = useContext(SavingEditorContext);
  const { id } = useParams<Params>();
  const { page, savePage, getPageByStudyPackId } = usePage(id);
  const pageId = page?.id;
  const blocks = useBlocks(pageId);
  const [loading, setLoading] = useState<boolean>(false);
  const currentBlock = editorState && getCurrentBlock(editorState);

  // Make call to server to save text blocks
  const onSave = async (editorState: EditorState, id: string | undefined) => {
    setSaving(true);
    const { keys, blocks } = createKeysAndBlocks(editorState);
    const response = await savePage({
      draft_keys: keys,
      blocks,
      id,
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
    (editorState: EditorState, id: string | undefined) =>
      onSave(editorState, id),
    750
  );

  const autoSave = useCallback(
    (editorState: EditorState) => {
      debounced(editorState, id);
    },
    [id]
  );

  const saveRaw = () => {
    var contentRaw = convertToRaw(editorState.getCurrentContent());
    localStorage.setItem("page-editor", JSON.stringify(contentRaw));
    localStorage.removeItem("page-editor");
  };

  useEffect(() => {
    saveRaw();
  }, [editorState]);

  const storeRaw = localStorage.getItem("page-editor");

  useEffect(() => {
    if (storeRaw) {
      const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
      setEditorState(EditorState.createWithContent(rawContentFromStore));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, []);

  useEffect(() => {
    editorState === EditorState.createEmpty() && id && getPageByStudyPackId();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (storeRaw) {
      setLoading(false);
    } else {
      blocks && setLoading(false);
    }
  }, [blocks]);

  // Set editor state on mount
  useEffect(() => {
    if (
      editorState === EditorState.createEmpty() &&
      blocks &&
      !isEmpty(blocks) &&
      blocks[0] !== null
    ) {
      const savedState = convertBlocksToContent(blocks);
      setEditorState(EditorState.createWithContent(savedState));
    }
  }, [blocks]);

  useEffect(() => {
    setCurrentBlock({ key: currentBlock.getKey(), hasFocus: editorHasFocus });
  }, [editorHasFocus, currentBlock, setCurrentBlock]);

  return (
    <RichEditor
      hasFocus={editorHasFocus}
      setHasFocus={setEditorHasFocus}
      loading={loading}
      editorState={editorState}
      setEditorState={setEditorState}
      saveEditor={autoSave}
    />
  );
};

export default memo(PageNoteTaker);
