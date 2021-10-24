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
import { queryClient } from "../..";
import { getBlocksByPageId, savePage } from "../../api";
import { Params } from "../../shared";
import { currentBlockAtom, pageEditorStateAtom, pageIdAtom } from "../../store";
import {
  convertBlocksToContent,
  createKeysAndBlocks,
  getCurrentBlock,
} from "./Editor/Editor.helpers";
import RichEditor from "./Editor/RichEditor";

interface PageNoteTakerProps {}

const PageNoteTaker: React.FC<PageNoteTakerProps> = () => {
  const [editorHasFocus, setEditorHasFocus] = useState<boolean>(false);
  const [, setCurrentBlock] = useAtom(currentBlockAtom);
  const [, setPageId] = useAtom(pageIdAtom);
  const { id: studySetId } = useParams<Params>();
  const [editorState, setEditorState] = useAtom(pageEditorStateAtom);

  const currentBlock = editorState && getCurrentBlock(editorState);
  const {
    data: blocks,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery(`${studySetId}-notes`, () => getBlocksByPageId({ studySetId }), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const pageId = blocks?.pageId;

  useEffect(() => {
    setPageId(pageId);
  }, [pageId, setPageId]);

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
  }, [studySetId]);

  // Debounce function to autosave notes
  const debounced = debounce(
    (editorState: EditorState) => pageId && updatePage(editorState),
    1000
  );

  const autoSave = useCallback(
    (editorState: EditorState) => {
      const { blocks } = createKeysAndBlocks(editorState);
      queryClient.setQueryData(`${studySetId}-notes`, () => {
        return { pageId: pageId, data: blocks };
      });

      debounced(editorState);
    },
    [pageId] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useLayoutEffect(() => {
    setCurrentBlock({ key: currentBlock.getKey(), hasFocus: editorHasFocus });
  }, [editorHasFocus, currentBlock, setCurrentBlock]);

  return (
    <RichEditor
      hasFocus={editorHasFocus}
      setHasFocus={setEditorHasFocus}
      isLoading={(isLoading || isFetching) && !isRefetching}
      editorState={editorState}
      setEditorState={setEditorState}
      saveEditor={autoSave}
    />
  );
};

export default memo(PageNoteTaker);
