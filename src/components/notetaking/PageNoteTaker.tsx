import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { debounce } from "lodash";

import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { CurrentBlockContext, SavingEditorContext } from "../../contexts";
import { usePage } from "../../services/note-taking/usePage";
import { Params } from "../../shared";
import { createKeysAndBlocks, getCurrentBlock } from "./Editor/Editor.helpers";
import RichEditor from "./Editor/RichEditor";

interface PageNoteTakerProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  pageId?: string;
  loading?: boolean;
}

const PageNoteTaker: React.FC<PageNoteTakerProps> = ({
  editorState,
  setEditorState,
  pageId,
  loading,
}) => {
  const [editorHasFocus, setEditorHasFocus] = useState<boolean>(false);
  const { setCurrentBlock } = useContext(CurrentBlockContext);
  const { setSaving, setSaveError } = useContext(SavingEditorContext);
  const { id: studyPackId } = useParams<Params>();
  const { savePage } = usePage(studyPackId);
  const currentBlock = editorState && getCurrentBlock(editorState);

  // Make call to server to save text blocks
  const onSave = async (
    editorState: EditorState,
    pageId: string | undefined
  ) => {
    setSaving(true);
    const { keys, blocks } = createKeysAndBlocks(editorState);
    const response = await savePage({
      draft_keys: keys,
      blocks,
      id: pageId,
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
    (editorState: EditorState, pageId: string | undefined) =>
      onSave(editorState, pageId),
    750
  );

  const autoSave = useCallback(
    (editorState: EditorState) => {
      debounced(editorState, pageId);
    },
    [pageId]
  );

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
