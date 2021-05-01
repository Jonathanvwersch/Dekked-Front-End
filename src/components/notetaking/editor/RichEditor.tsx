import Draft, {
  ContentBlock,
  ContentState,
  DraftEditorCommand,
  DraftHandleValue,
  EditorState,
  Modifier,
  RichUtils,
  SelectionState,
  Editor,
} from "draft-js";

import "draft-js/dist/Draft.css";

import React, { useContext, useRef } from "react";

import {
  addNewBlockAt,
  getCurrentBlock,
  isSoftNewlineEvent,
} from "./Editor.helpers";

import styled from "styled-components/macro";
import { EditorContext } from "../../../contexts/EditorContext";
import NotetakingBlocksModal from "../TextModal/NotetakingBlocksModal";
import PlaceholderBlock from "../custom-blocks/PlaceholderBlock";
import { TodoBlock, DividerBlock } from "../custom-blocks";
import { BLOCK_TYPES } from "../../../shared";
import { ComponentLoadingSpinner } from "../../common";
const Immutable = require("immutable");

interface EditorProps {
  savedContent?: ContentState;
}

const NoteEditor: React.FC<EditorProps> = ({ savedContent }) => {
  const {
    editorState,
    setEditorState,
    toggleBlockStyle,
    loading,
    autoSave,
    page,
  } = useContext(EditorContext);

  const editorRef = useRef<any>(null);

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
    const currentBlock = getCurrentBlock(editorState);

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

    switch (type) {
      case "divider":
        return {
          component: DividerBlock,
          editable: false,
          props: {
            editorState,
            setEditorState,
          },
        };

      case "to-do":
        return {
          component: TodoBlock,
          editable: true,
          props: {
            editorState,
            setEditorState,
            toggleBlockStyle,
          },
        };

      default:
        return {
          component: PlaceholderBlock,
          editable: true,
          props: {
            editorState,
            toggleBlockType,
          },
        };
    }
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
    autoSave(newEditorState, page);
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

  const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(
    blockRenderMap
  );

  const styleMap = {
    ALIGN_CENTER: {
      textAlign: "center" as "center",
    },
    ALIGN_LEFT: {
      textAlign: "left" as "left",
    },
    ALIGN_RIGHT: {
      textAlign: "right" as "right",
    },
    SUPERSCRIPT: {
      fontSize: "smaller",
      verticalAlign: "super",
    },
    SUBSCRIPT: {
      fontSize: "smaller",
      verticalAlign: "sub",
    },
  };

  return (
    <>
      {!loading ? (
        <EditorContainer>
          <Editor
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
            ref={(node) => (editorRef.current = node)}
            blockRendererFn={myBlockRenderer}
            handleReturn={handleReturn}
            blockStyleFn={myBlockStyleFn}
            blockRenderMap={extendedBlockRenderMap}
            customStyleMap={styleMap}
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

const EditorContainer = styled.div`
  padding-bottom: 100px;
  div[data-editor] {
    padding: ${({ theme }) => theme.spacers.size4} 0px;
  }
  width: 100%;
  position: relative;

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

  // .public-DraftStyleDefault-ltr > span {
  //   display: block;
  // }
`;

export default NoteEditor;
