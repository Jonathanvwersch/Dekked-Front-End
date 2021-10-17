import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { useAtom } from "jotai";
import { debounce, isEmpty } from "lodash";

import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getBlocksByPageId, savePage } from "../../api";
import { Params } from "../../shared";
import { currentBlockAtom, pageEditorStateAtom } from "../../store";
import {
  convertBlocksToContent,
  getCurrentBlock,
} from "./Editor/Editor.helpers";
import RichEditor from "./Editor/RichEditor";

interface PageNoteTakerProps {}

const PageNoteTaker: React.FC<PageNoteTakerProps> = () => {
  const [editorHasFocus, setEditorHasFocus] = useState<boolean>(false);
  const [, setCurrentBlock] = useAtom(currentBlockAtom);
  const { id: studySetId } = useParams<Params>();
  const [editorState, setEditorState] = useAtom(pageEditorStateAtom);

  const currentBlock = editorState && getCurrentBlock(editorState);
  const {
    data: blocks,
    isLoading,
    isFetching,
  } = useQuery(`${studySetId}-notes`, () => getBlocksByPageId({ studySetId }), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const pageId = blocks?.pageId;

  const { mutate: updatePage } = useMutation(
    `${studySetId}-save-notes`,
    (editorState: EditorState) => savePage({ editorState, pageId, studySetId })
  );

  // Set editor state on mount with the blocks
  useLayoutEffect(() => {
    if (blocks && !isEmpty(blocks)) {
      const savedState = convertBlocksToContent(blocks?.data);
      setEditorState(EditorState.createWithContent(savedState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [blocks, setEditorState]);

  // Debounce function to autosave notes
  const debounced = debounce(
    (editorState: EditorState) => pageId && updatePage(editorState),
    1000
  );

  const autoSave = useCallback(
    (editorState: EditorState) => {
      debounced(editorState);
    },
    [pageId] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    setCurrentBlock({ key: currentBlock.getKey(), hasFocus: editorHasFocus });
  }, [editorHasFocus, currentBlock, setCurrentBlock]);

  return (
    <RichEditor
      hasFocus={editorHasFocus}
      setHasFocus={setEditorHasFocus}
      isLoading={isLoading || isFetching}
      editorState={editorState}
      setEditorState={setEditorState}
      saveEditor={autoSave}
    />
  );
};

export default memo(PageNoteTaker);
