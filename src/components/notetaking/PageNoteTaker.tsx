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
import { EditorContext } from "../../contexts";
import { useBlocks } from "../../services/note-taking/useBlocks";
import { usePage } from "../../services/note-taking/usePage";
import { Params } from "../../shared";
import RichEditor from "./Editor/RichEditor";

interface PageNoteTakerProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

const PageNoteTaker: React.FC<PageNoteTakerProps> = ({
  editorState,
  setEditorState,
}) => {
  const { setSaving, setSaveError } = useContext(EditorContext);
  const { id } = useParams<Params>();
  const { page, savePage } = usePage(id);
  const blocks = useBlocks(page?.id);
  const [loading, setLoading] = useState<boolean>(isNull(blocks));
  const [editorHasFocus, setEditorHasFocus] = useState<boolean>(false);

  // Make call to server to save text blocks
  const onSave = async (editorState: EditorState, id: string | undefined) => {
    setSaving(true);
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const keys = rawContent.blocks.map((val) => val.key);
    const blocks = rawContent.blocks.map((val) => JSON.stringify(val));
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
    (editorState: EditorState, id: string | undefined) => {
      debounced(editorState, id);
    },
    []
  );

  useEffect(() => {
    setLoading(isNull(blocks));
  }, [id, blocks]);

  // Set editor state on mount
  useEffect(() => {
    if (blocks && !isEmpty(blocks) && blocks[0] !== null) {
      console.log(blocks);
      const parsedBlocks: RawDraftContentBlock[] = blocks.map((block) =>
        JSON.parse(block)
      );
      const savedState = convertFromRaw({
        blocks: parsedBlocks,
        entityMap: {},
      });
      setEditorState(EditorState.createWithContent(savedState));
    }
  }, [blocks]);

  return (
    <RichEditor
      hasFocus={editorHasFocus}
      setHasFocus={setEditorHasFocus}
      loading={loading}
      editorState={editorState}
      setEditorState={setEditorState}
      saveEditor={autoSave}
      id={page?.id}
    />
  );
};

export default memo(PageNoteTaker);
