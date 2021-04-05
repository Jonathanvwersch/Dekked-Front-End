import {
  ContentBlock,
  ContentState,
  DraftEditorCommand,
  DraftHandleValue,
  Editor,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  Modifier,
  RichUtils,
  SelectionState,
} from "draft-js";

import "draft-js/dist/Draft.css";

import React, { useContext, useRef } from "react";

import {
  addNewBlockAt,
  getCurrentBlock,
  isSoftNewlineEvent,
} from "../Utils/editorUtils";
import TextModal from "../TextModal/TextModal";

import UnstyledComponent from "./UnstyledComponent/UnstyledComponent";
import StyledComponent from "./StyledComponent/StyledComponent";
import styled from "styled-components/macro";
import { EditorContext } from "../../../contexts/EditorContext";

interface EditorProps {
  savedContent?: ContentState;
}

const RichEditor: React.FC<EditorProps> = ({ savedContent }) => {
  // const [editorState, setEditorState] = useState(() =>
  //   savedContent
  //     ? EditorState.createWithContent(savedContent)
  //     : EditorState.createEmpty()
  // );
  const { editorState, setEditorState, onSave } = useContext(EditorContext);

  const editorRef = useRef<any>();

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

  // const focus = () => {
  //   editorRef.current?.focus();
  // };

  // const focusLast = () => {
  //   const lastBlock = editorState.getCurrentContent().getLastBlock();
  //   const selection = new SelectionState({
  //     anchorKey: lastBlock.getKey(),
  //     anchorOffset: lastBlock.getLength(),
  //     focusKey: lastBlock.getKey(),
  //     focusOffset: lastBlock.getLength(),
  //     hasFocus: true,
  //     isBackward: false,
  //   });

  //   setEditorState(EditorState.forceSelection(editorState, selection));
  //   setTimeout(() => {
  //     window.getSelection()?.anchorNode?.parentElement?.scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }, 200);
  // };

  // useEffect(() => {
  //   focusLast();
  // }, []);

  const toggleBlockType = (blockType: string) => {
    const currentContent = editorState.getCurrentContent();
    const currentBlock = getCurrentBlock(editorState);

    const targetRange = new SelectionState({
      anchorKey: currentBlock.getKey(),
      anchorOffset: 0,
      focusKey: currentBlock.getKey(),
      focusOffset: 1,
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

  const myBlockRenderer = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type === "unstyled") {
      return {
        component: UnstyledComponent,
        editable: true,
        props: {
          editorState,
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
    setEditorState(e);
  };

  return (
    <EditorContainer>
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
        ref={(node) => (editorRef.current = node)}
        blockRendererFn={myBlockRenderer}
        handleReturn={handleReturn}
        keyBindingFn={myKeyBindingFn}
      />
      <TextModal onToggle={toggleBlockType} editorState={editorState} />
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
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
`;

export default RichEditor;
