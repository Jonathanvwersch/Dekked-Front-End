import Draft, {
  ContentBlock,
  DraftEditorCommand,
  EditorState,
  Modifier,
  RichUtils,
  SelectionState,
  Editor,
  DraftHandleValue,
} from "draft-js";

import "draft-js/dist/Draft.css";

import React, { memo, useContext, useEffect, useState } from "react";

import {
  addNewBlockAt,
  getCurrentBlock,
  isSoftNewlineEvent,
} from "./Editor.helpers";

import styled, { ThemeContext } from "styled-components";
import NotetakingBlocksModal from "../TextModal/NotetakingBlocksModal";
import { BLOCK_TYPES } from "../../../shared";
import { ComponentLoadingSpinner } from "../../common";
import { formatMessage } from "../../../intl";
import { useIntl } from "react-intl";
import { styleMap } from "./Editor.data";
import GeneralBlock from "../GeneralBlock/GeneralBlock";
import { CurrentBlockContext, LinkedFlashcardContext } from "../../../contexts";
const Immutable = require("immutable");

export type EditorType = "flashcard" | "page";

interface RichEditorProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  setHasFocus: React.Dispatch<React.SetStateAction<boolean>>;
  saveEditor?: (editorState: EditorState) => void;
  hasFocus?: boolean;
  isLoading?: boolean;
  editorType?: EditorType;
  isEditable?: boolean;
  editorRef?: React.RefObject<any>;
}

const RichEditor: React.FC<RichEditorProps> = ({
  editorState,
  setEditorState,
  saveEditor,
  isLoading,
  setHasFocus,
  hasFocus = true,
  isEditable = true,
  editorType = "page",
  editorRef,
}) => {
  const intl = useIntl();
  const currentBlock = getCurrentBlock(editorState);
  const [dragBlockKey, setDragBlockKey] = useState<string | undefined>();
  const theme = useContext(ThemeContext);

  const handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  const toggleBlockType = (blockType: BLOCK_TYPES) => {
    const currentContent = editorState.getCurrentContent();

    const targetRange = new SelectionState({
      anchorKey: currentBlock.getKey(),
      anchorOffset: 0,
      focusKey: currentBlock.getKey(),
      focusOffset: currentBlock.getText().length,
      hasFocus: true,
    });

    const newContent = Modifier.removeRange(
      currentContent,
      targetRange,
      "backward"
    );

    const newEditorState = EditorState.push(
      editorState,
      newContent,
      "insert-characters"
    );

    setEditorState(RichUtils.toggleBlockType(newEditorState, blockType));
  };

  // block type selector
  const myBlockRenderer = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    return {
      component: GeneralBlock,
      props: {
        editorState,
        setEditorState,
        dragBlockKey,
        setDragBlockKey,
        type,
        editorType,
        isEditable,
      },
    };
  };

  // handle what happens when return key is pressed
  const handleReturn = (e: any): DraftHandleValue => {
    if (isSoftNewlineEvent(e)) {
      setEditorState(RichUtils.insertSoftNewline(editorState));
      return "handled";
    }
    const currentBlock = getCurrentBlock(editorState);
    const blockType = currentBlock.getType();
    if (
      blockType === "unstyled" ||
      blockType === "unordered-list-item" ||
      blockType === "ordered-list-item" ||
      blockType === "to-do"
    ) {
      return "not-handled";
    }

    setEditorState(addNewBlockAt(editorState, currentBlock.getKey()));
    return "handled";
  };

  const onChange = (newEditorState: EditorState) => {
    // const currentState = editorState.getCurrentContent();
    // const newState = newEditorState.getCurrentContent();
    // const hasContentChanged = currentState !== newState;
    saveEditor && saveEditor(newEditorState);
    setEditorState(newEditorState);
  };

  // see https://draftjs.org/docs/advanced-topics-block-styling
  // essentially the following bit of code defines what happens
  // when the block quote block-type is selected
  const myBlockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type === "blockquote") {
      return "custom-blockquote";
    } else return "";
  };

  // see https://draftjs.org/docs/advanced-topics-custom-block-render-map
  const blockRenderMap = Immutable.Map({});

  const extendedBlockRenderMap =
    Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

  const showPlaceholder = editorType === "flashcard" ? hasFocus : true;

  const onTab = (event: React.KeyboardEvent<{}>) => {
    setEditorState(RichUtils.onTab(event, editorState, 4));
  };

  const { blockLink, isLinked } = useContext(LinkedFlashcardContext);
  const div = document.getElementById(`${blockLink}-0-0`);

  useEffect(() => {
    // style block if is linked
    if (isLinked) {
      if (div) div.style.borderRight = `solid 4px ${theme.colors.primary}`;
    } else if (div) {
      div.style.borderRight = "none";
    }
  }, [isLinked, div, blockLink, theme]);

  return (
    <>
      {!isLoading ? (
        <EditorContainer
          isEditable={isEditable}
          onFocus={() => {
            setHasFocus(true);
            editorRef?.current.focus();
          }}
          onClick={() => {
            setHasFocus(true);
            editorRef?.current.focus();
          }}
          onBlur={() => setHasFocus(false)}
          editorType={editorType}
          isLinked={isLinked}
        >
          <Editor
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
            ref={editorRef}
            onTab={onTab}
            blockRendererFn={myBlockRenderer}
            readOnly={!isEditable}
            handleReturn={handleReturn}
            blockStyleFn={myBlockStyleFn}
            blockRenderMap={extendedBlockRenderMap}
            customStyleMap={styleMap}
            placeholder={
              showPlaceholder &&
              getCurrentBlock(editorState).getType() === BLOCK_TYPES.UNSTYLED
                ? formatMessage(`studySet.notetaking.placeholder`, intl)
                : ""
            }
          />
          <NotetakingBlocksModal
            onToggle={toggleBlockType}
            editorState={editorState}
          />
        </EditorContainer>
      ) : (
        <ComponentLoadingSpinner />
      )}
    </>
  );
};

const EditorContainer = styled.div<{
  isEditable: boolean;
  editorType: EditorType;
  isLinked?: boolean;
}>`
  color: ${({ theme }) => theme.colors.fontColor};
  padding-bottom: 100px;
  width: 100%;
  position: relative;
  font-size: ${({ theme, editorType }) =>
    editorType === "page"
      ? theme.typography.fontSizes.size16
      : theme.typography.fontSizes.size14};

  div[data-editor] {
    padding: ${({ theme }) => theme.spacers.size4} 0px;
    position: relative;
  }

  li {
    position: relative;
  }

  & .public-DraftEditorPlaceholder-root {
    margin-top: ${({ theme }) => theme.spacers.size4};
  }

  & .public-DraftEditorPlaceholder-inner {
    color: ${({ theme }) => theme.colors.grey2};
    display: ${({ isEditable }) => (!isEditable ? "none" : "auto")};
  }

  h1 {
    margin-top: ${({ theme }) => theme.spacers.size16};
    margin-bottom: ${({ theme }) => theme.spacers.size24};
  }

  h2 {
    margin-top: ${({ theme }) => theme.spacers.size12};
    margin-bottom: ${({ theme }) => theme.spacers.size20};
  }

  h3 {
    margin-top: ${({ theme }) => theme.spacers.size8};
    margin-bottom: ${({ theme }) => theme.spacers.size16};
  }

  .custom-blockquote {
    margin-top: ${({ theme }) => theme.spacers.size20};
    margin-bottom: ${({ theme }) => theme.spacers.size20};
    border-left: 2px solid ${({ theme }) => theme.colors.fontColor};
    font-style: italic;
    font-size: ${({ theme }) => theme.typography.fontSizes.size18};
    padding-left: ${({ theme }) => theme.spacers.size16};
  }
`;

export default memo(RichEditor);
