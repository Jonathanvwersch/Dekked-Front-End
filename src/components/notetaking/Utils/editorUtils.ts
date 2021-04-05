import { ContentBlock, EditorState, genKey } from "draft-js";
import { List, Map } from "immutable";

export function isSoftNewlineEvent(e: any) {
  return (
    e.key === "Enter" &&
    (e.getModifierState("Shift") ||
      e.getModifierState("Alt") ||
      e.getModifierState("Control"))
  );
}

export function getCurrentBlock(editorState: EditorState) {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selectionState.getStartKey());
  return block;
}

export function addNewBlockAt(
  editorState: EditorState,
  pivotBlockKey: string,
  newBlockType = "unstyled"
) {
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
}

// Function used to get position of block editor
export const getBlockEditorPosition = (rect: DOMRect) => {
  const distanceToTop = rect.y; // Distance from mouse click to top of window
  const distanceToBottom = window.innerHeight - distanceToTop; // Distance from mouse click to bottom of window
  const distanceToLeft = rect.x; // Distance from mouse click to left of window
  const distanceToRight = window.innerWidth - distanceToLeft; // Distance from mouse click to right of window
  return {
    top: distanceToTop,
    right: distanceToRight,
    bottom: distanceToBottom + 15,
    left: distanceToLeft,
  };
};

export const positionBlockEditor = (rect: DOMRect, componentHeight: number) => {
  const { top, left, bottom } = getBlockEditorPosition(rect);
  let newCoordinate;

  if (componentHeight && bottom - componentHeight < componentHeight) {
    newCoordinate = { bottom: bottom && bottom - 15 };
  } else {
    newCoordinate = { top: top && top + 15 };
  }
  return { ...newCoordinate, left: left };
};

// Function used to get word count
export const getWordCount = (editorState: EditorState) => {
  const plainText = editorState.getCurrentContent().getPlainText("");
  const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
  const cleanString = plainText.replace(regex, " ").trim(); // replace above characters w/ space
  const wordArray = cleanString.match(/\S+/g); // matches words according to whitespace
  console.log(wordArray);
  return wordArray ? wordArray.length : 0;
};
