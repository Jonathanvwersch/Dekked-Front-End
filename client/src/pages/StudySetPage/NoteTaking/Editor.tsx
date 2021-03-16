import {
  ContentBlock,
  ContentState,
  convertToRaw,
  DraftEditorCommand,
  DraftHandleValue,
  Editor,
  EditorBlock,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  Modifier,
  RawDraftContentState,
  RichUtils,
  SelectionState,
} from "draft-js";

import "draft-js/dist/Draft.css";
import "./styles/TextEditor.css";

import React from "react";
// import BlockToolBar from "./BlockToolBar";

import {
  addNewBlockAt,
  getCurrentBlock,
  isSoftNewlineEvent,
} from "./Utils/editorUtils";
import BlockToolBar from "./BlockToolBar";

function UnstyledComponent(props: any) {
  const currentBlock: ContentBlock = props.block;
  const hasText = currentBlock.getText() != "";
  return (
    <div>
      {!hasText && (
        <span
          contentEditable={false}
          style={{ position: "absolute", userSelect: "none", color: "#9197a3" }}
        >
          Type '/' for commands
        </span>
      )}
      <EditorBlock {...props} />
    </div>
  );
}

function StyledComponent(props: any) {
  const currentBlock: ContentBlock = props.block;
  const contentState: ContentState = props.contentState;
  const key = currentBlock.getKey();
  const targetRange = new SelectionState({
    anchorKey: key,
    anchorOffset: 0,
    focusKey: key,
    focusOffset: currentBlock.getLength() + 1,
  });

  const newContentState = Modifier.replaceText(
    contentState,
    targetRange,
    "backward"
  );

  let newProps = { ...props };
  newProps.contentState = newContentState;

  return <EditorBlock {...newProps} />;
}

export default function RichEditor({
  savedContent,
  setRawContent,
  onSave,
}: {
  savedContent?: ContentState;
  setRawContent: React.Dispatch<
    React.SetStateAction<RawDraftContentState | undefined>
  >;
  onSave: () => void;
}) {
  const [editorState, setEditorState] = React.useState(() =>
    savedContent
      ? EditorState.createWithContent(savedContent)
      : EditorState.createEmpty()
  );
  const editor = React.useRef<any>();
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

  const focus = () => {
    editor.current?.focus();
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

  React.useEffect(() => {
    focusLast();
  }, []);

  const toggleBlockType = (blockType: string) => {
    // setShowToolBar(false);
    // setBlockType(blockType);
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };
  function myBlockRenderer(contentBlock: ContentBlock) {
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
  }

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
  function myKeyBindingFn(e: any): string | null {
    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
      return "myeditor-save";
    }
    return getDefaultKeyBinding(e);
  }

  const onChange = (e: EditorState) => {
    const raw = convertToRaw(e.getCurrentContent());
    setRawContent(raw);
    setEditorState(e);
  };
  return (
    <div
      id="draft-editor-container"
      style={{ position: "relative", marginTop: "8px", marginBottom: "8px" }}
    >
      <div
        onClick={focus}
        style={{
          flex: 1,
          cursor: "text",
          zIndex: 1,
          border: "1px solid red",
          width: "100%",
        }}
      >
        <Editor
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          ref={(node) => (editor.current = node)}
          blockRendererFn={myBlockRenderer}
          handleReturn={handleReturn}
          keyBindingFn={myKeyBindingFn}
        />
      </div>
      <BlockToolBar
        onToggle={toggleBlockType}
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </div>
  );
}
