import {
  ContentBlock,
  ContentState,
  DefaultDraftBlockRenderMap,
  DraftEditorCommand,
  Editor,
  EditorState,
  genKey,
  getDefaultKeyBinding,
  KeyBindingUtil,
  RichUtils,
} from "draft-js";

import Immutable, { List, Map } from "immutable";
import "draft-js/dist/Draft.css";

import React from "react";

function Title({ children }: { children: any }) {
  return (
    <div>
      <h1 style={{ fontSize: 42 }}>{children}</h1>
    </div>
  );
}

export const addNewBlockAt = (
  editorState: EditorState,
  pivotBlockKey: string,
  newBlockType = "unstyled"
) => {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  const block = blockMap.get(pivotBlockKey);
  if (!block) {
    throw new Error(
      `The pivot key - ${pivotBlockKey} is not present in blockMap.`
    );
  }
  const blocksBefore = blockMap.toSeq().takeUntil((v) => v === block);
  const blocksAfter = blockMap
    .toSeq()
    .skipUntil((v) => v === block)
    .rest();
  const newBlockKey = genKey();

  const newBlock = new ContentBlock({
    key: newBlockKey,
    type: newBlockType,
    text: "",
    characterList: List(),
    depth: 0,
    data: Map({}),
  });

  const newBlockMap = blocksBefore
    .concat(
      [
        [pivotBlockKey, block],
        [newBlockKey, newBlock],
      ],
      blocksAfter
    )
    .toOrderedMap();

  const selection = editorState.getSelection();

  const newContent: any = content.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: newBlockKey,
      anchorOffset: 0,
      focusKey: newBlockKey,
      focusOffset: 0,
      isBackward: false,
    }),
  });

  return EditorState.push(editorState, newContent, "split-block");
};

export default function TitleEditor({
  savedTitle,
  setTitle,
  onSave,
}: {
  savedTitle?: ContentState;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
}) {
  const editor = React.useRef<any>();
  const [editorState, setEditorState] = React.useState(() =>
    savedTitle
      ? EditorState.createWithContent(savedTitle)
      : EditorState.createEmpty()
  );
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

  function getTitleStyle(block: ContentBlock): any {
    switch (block.getType()) {
      case "title":
        return {
          component: Title,
          editable: true,
        };
      default:
        return null;
    }
  }

  // React.useEffect(() => {
  //   focus();
  //   // setEditorState(RichUtils.toggleBlockType(editorState, 'title'));
  // }, []);

  const blockRenderMap = Immutable.Map({
    title: {
      element: Title,
    },
    unstyled: {
      element: Title,
    },
  });
  const titleRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

  const onChange = (e: EditorState) => {
    setTitle(e.getCurrentContent().getPlainText());
    setEditorState(e);
  };
  const { hasCommandModifier } = KeyBindingUtil;

  function myKeyBindingFn(e: any): string | null {
    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
      return "myeditor-save";
    }
    return getDefaultKeyBinding(e);
  }

  return (
    <div>
      <div id="title" onClick={focus} style={{ flex: 1, cursor: "text" }}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          placeholder="Untitled"
          ref={editor}
          blockRenderMap={titleRenderMap}
          blockStyleFn={getTitleStyle}
          keyBindingFn={myKeyBindingFn}
        />
      </div>
    </div>
  );
}
