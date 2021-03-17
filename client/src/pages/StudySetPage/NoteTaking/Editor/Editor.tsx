import {
  ContentBlock,
  ContentState,
  convertToRaw,
  DraftEditorCommand,
  DraftHandleValue,
  Editor,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  RawDraftContentState,
  RichUtils,
  SelectionState,
} from "draft-js";

import "draft-js/dist/Draft.css";
import "../styles/TextEditor.css";

import React, { useEffect, useRef, useState } from "react";

import {
  addNewBlockAt,
  getCurrentBlock,
  isSoftNewlineEvent,
} from "../Utils/editorUtils";
import TextModal from "../TextModal/TextModal";

import UnstyledComponent from "./UnstyledComponent/UnstyledComponent";
import StyledComponent from "./StyledComponent/StyledComponent";
import styled from "styled-components";

interface EditorProps {
  savedContent?: ContentState;
  setRawContent: React.Dispatch<
    React.SetStateAction<RawDraftContentState | undefined>
  >;
  onSave: () => void;
}

const RichEditor: React.FC<EditorProps> = ({
  savedContent,
  setRawContent,
  onSave,
}) => {
  const [editorState, setEditorState] = useState(() =>
    savedContent
      ? EditorState.createWithContent(savedContent)
      : EditorState.createEmpty()
  );
  const editor = useRef<any>();

  const handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (String(command) === "myeditor-save") {
      onSave();
    }

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const focusLast = () => {
    const lastBlock = editorState.getCurrentContent().getLastBlock();
    const selection = new SelectionState({
      anchorKey: lastBlock.getKey(),
      anchorOffset: lastBlock.getLength(),
      focusKey: lastBlock.getKey(),
      focusOffset: lastBlock.getLength(),
      hasFocus: true,
      isBackward: false,
    });

    setEditorState(EditorState.forceSelection(editorState, selection));
    setTimeout(() => {
      window.getSelection()?.anchorNode?.parentElement?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  };

  useEffect(() => {
    focusLast();
  }, []);

  const toggleBlockType = (blockType: string) => {
    // setShowToolBar(false);
    // setBlockType(blockType);
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const myBlockRenderer = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type === "unstyled") {
      return {
        component: UnstyledComponent,
        editable: true,
        props: {
          toggleBlockType,
        },
      };
    } else {
      return {
        component: StyledComponent,
        editable: true,
      };
    }
  };

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
      blockType === "ordered-list-item"
    ) {
      return "not-handled";
    }

    setEditorState(addNewBlockAt(editorState, currentBlock.getKey()));
    return "handled";
  };

  const { hasCommandModifier } = KeyBindingUtil;

  const myKeyBindingFn = (e: any): string | null => {
    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
      return "myeditor-save";
    }
    return getDefaultKeyBinding(e);
  };

  const onChange = (e: EditorState) => {
    const raw = convertToRaw(e.getCurrentContent());
    console.log(e);
    setRawContent(raw);
    setEditorState(e);
  };

  return (
    <EditorContainer>
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
        ref={(node) => (editor.current = node)}
        blockRendererFn={myBlockRenderer}
        handleReturn={handleReturn}
        keyBindingFn={myKeyBindingFn}
      />
      <TextModal
        onToggle={toggleBlockType}
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  width: 100%;
  position: relative;

  h1 {
    margin-top: ${({ theme }) => theme.spacers.size32};
  }

  h2 {
    margin-top: ${({ theme }) => theme.spacers.size24};
  }

  h2 {
    margin-top: ${({ theme }) => theme.spacers.size16};
  }
`;

export default RichEditor;
