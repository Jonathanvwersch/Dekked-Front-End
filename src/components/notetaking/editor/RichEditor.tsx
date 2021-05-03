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
  AtomicBlockUtils,
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
import TextBlock from "../custom-blocks/TextBlock";
import { TodoBlock, DividerBlock } from "../custom-blocks";
import { BLOCK_TYPES } from "../../../shared";
import { ComponentLoadingSpinner } from "../../common";
import { formatMessage } from "../../../intl";
import { useIntl } from "react-intl";
import { styleMap } from "./Editor.data";
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
  const intl = useIntl();

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
          component: TextBlock,
          editable: true,
          props: {
            editorState,
            toggleBlockType,
            setEditorState,
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

  // const insertImage = (url: any) => {
  //   const contentState = editorState.getCurrentContent();
  //   const contentStateWithEntity = contentState.createEntity(
  //     "IMAGE",
  //     "IMMUTABLE",
  //     { src: url }
  //   );
  //   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  //   const newEditorState = EditorState.set(editorState, {
  //     currentContent: contentStateWithEntity,
  //   });
  //   return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  // };

  // const handlePastedFiles = (files: any) => {
  //   const formData = new FormData();
  //   formData.append("file", files[0]);
  //   fetch("/api/uploads", { method: "POST", body: formData })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.file) {
  //         setEditorState(insertImage(data.file)); //created below
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
            // handlePastedFiles={handlePastedFiles}
            placeholder={
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

const EditorContainer = styled.div`
  color: ${({ theme }) => theme.colors.fontColor};
  padding-bottom: 100px;
  div[data-editor] {
    padding: ${({ theme }) => theme.spacers.size4} 0px;
  }
  width: 100%;
  position: relative;

  & .public-DraftEditorPlaceholder-root {
    margin-top: ${({ theme }) => theme.spacers.size4};
  }

  & .public-DraftEditorPlaceholder-inner {
    color: ${({ theme }) => theme.colors.grey2};
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

export default NoteEditor;
