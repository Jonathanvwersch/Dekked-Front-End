import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { debounce, isEmpty } from "lodash";

import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CurrentBlockContext } from "../../contexts";
import {
  getBlocksByPageId,
  savePage,
} from "../../services/note-taking/blocks-api";
import { Params } from "../../shared";
import {
  convertBlocksToContent,
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
  const { id: studyPackId } = useParams<Params>();

  const currentBlock = editorState && getCurrentBlock(editorState);
  const { data: blocks, isLoading } = useQuery(
    `${studyPackId}-notes`,
    () => getBlocksByPageId({ studyPackId }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  );

  const pageId = blocks?.pageId;

  const { mutate: _savePage } = useMutation(
    `${studyPackId}-save-notes`,
    (editorState: EditorState) => savePage({ editorState, pageId })
  );

  // Set editor state on mount with the blocks
  useEffect(() => {
    if (blocks?.data && !isEmpty(blocks?.data)) {
      const savedState = convertBlocksToContent(blocks?.data);
      setEditorState(EditorState.createWithContent(savedState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [blocks, setEditorState]);

  // Debounce function to autosave notes
  const debounced = debounce(
    (editorState: EditorState) => _savePage(editorState),
    1000
  );

  const autoSave = useCallback(
    (editorState: EditorState) => {
      debounced(editorState);
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
      isLoading={isLoading}
      editorState={editorState}
      setEditorState={setEditorState}
      saveEditor={autoSave}
    />
  );
};

export default memo(PageNoteTaker);
