import { convertFromRaw, EditorState, RawDraftContentBlock } from "draft-js";
import "draft-js/dist/Draft.css";
import { debounce, isEmpty } from "lodash";

import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import { NotesContext } from "../../contexts";

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
  const { onSave, blocks, loading, pageId } = useContext(NotesContext);

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

  // Set editor state on mount
  useMemo(() => {
    if (blocks && !isEmpty(blocks) && blocks[0] !== null) {
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
      id={pageId}
    />
  );
};

export default memo(PageNoteTaker);
