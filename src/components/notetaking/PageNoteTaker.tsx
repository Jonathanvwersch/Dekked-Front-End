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
import { FILETREE_TYPES, Params } from "../../shared";
import {
  addedLinkedFlashcardAtom,
  currentBlockAtom,
  pageEditorStateAtom,
  pageIdAtom,
} from "../../store";
import {
  convertBlocksToContent,
  createKeysAndBlocks,
  getCurrentBlock,
} from "./Editor/Editor.helpers";
import RichEditor from "./Editor/RichEditor";

interface PageNoteTakerProps {}

const PageNoteTaker: React.FC<PageNoteTakerProps> = () => {
  const [editorHasFocus, setEditorHasFocus] = useState<boolean>(false);
  const [newBlock, setNewBlock] = useAtom(currentBlockAtom);
  const [, setPageId] = useAtom(pageIdAtom);
  const { id: studySetId, type } = useParams<Params>();
  const [editorState, setEditorState] = useAtom(pageEditorStateAtom);
  const [addedLinkedFlashcard, setAddedLinkedFlashcard] = useAtom(
    addedLinkedFlashcardAtom
  );

  useEffect(() => {
    addedLinkedFlashcard !== 0 && setAddedLinkedFlashcard(0);
  }, [studySetId]);

  const {
    data: blocks,
    isLoading,
    isFetching,
    isRefetching,
    isSuccess,
  } = useQuery(`${studySetId}-notes`, () => getBlocksByPageId({ studySetId }), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    enabled: type === FILETREE_TYPES.STUDY_SET,
  });

  const pageId = blocks?.pageId;

  useEffect(() => {
    setPageId(pageId);
  }, [pageId, setPageId]);

  const { mutate: updatePage } = useMutation(
    `${studySetId}-save-notes`,
    ({
      editorState,
      pageId,
      studySetId,
    }: {
      editorState: EditorState;
      pageId?: string;
      studySetId?: string;
    }) => savePage({ editorState, pageId, studySetId })
  );

  // Set editor state on mount with the blocks
  useLayoutEffect(() => {
    if (blocks && !isEmpty(blocks)) {
      const savedState = convertBlocksToContent(blocks?.data);
      setEditorState(EditorState.createWithContent(savedState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [studySetId, isSuccess]);

  // Debounce function to autosave notes
  const debounced = debounce(
    (editorState: EditorState) =>
      pageId && updatePage({ editorState, pageId, studySetId }),
    250
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
  const currentBlock = editorState && getCurrentBlock(editorState);
  useLayoutEffect(() => {
    if (currentBlock?.getKey() !== newBlock.key && editorHasFocus) {
      setNewBlock({ key: currentBlock?.getKey(), hasFocus: editorHasFocus });
    }
  }, [editorHasFocus, currentBlock, setNewBlock, newBlock]);

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
