import {
  ContentBlock,
  convertFromRaw,
  convertToRaw,
  EditorState,
  genKey,
  Modifier,
  RawDraftContentBlock,
  RichUtils,
  SelectionState,
} from "draft-js";
import { List, Map } from "immutable";
import { reduce } from "lodash";
import { TEXT_STYLES } from "../../../shared";

export function isSoftNewlineEvent(e: any) {
  return (
    e.key === "Enter" &&
    (e.getModifierState("Shift") ||
      e.getModifierState("Alt") ||
      e.getModifierState("Control"))
  );
}

// Function to get data associated with current block
export function getCurrentBlock(editorState: EditorState) {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selectionState.getStartKey());
  return block;
}

// Function to return the whole block editor state, i.e. the editor state
// associated with all the elements in a block
export const returnWholeBlockEditorState = (editorState: EditorState) => {
  const currentBlock = getCurrentBlock(editorState);
  const currentKey = currentBlock.getKey();
  const selectionState = SelectionState.createEmpty(currentKey);

  const entireBlockSelectionState = selectionState.merge({
    anchorKey: currentKey,
    anchorOffset: 0,
    focusKey: currentKey,
    focusOffset: currentBlock.getText().length,
  });

  const newEditorState = EditorState.forceSelection(
    editorState,
    entireBlockSelectionState
  );

  return newEditorState;
};

// Function to remove a specific block style or all block styles if removeAll = true
export const removeSpecificBlockStyle = (
  styles: string[] | undefined,
  editorState: EditorState,
  removeAll?: boolean
) => {
  let blockStyles = styles;
  if (removeAll) {
    blockStyles = [...Object.keys(TEXT_STYLES)];
  }
  const contentWithoutStyles = reduce(
    blockStyles,
    (newContentState, blockStyle) =>
      Modifier.removeInlineStyle(
        newContentState,
        editorState.getSelection(),
        blockStyle
      ),
    editorState.getCurrentContent()
  );

  return EditorState.push(
    editorState,
    contentWithoutStyles,
    "change-inline-style"
  );
};

// Function used to add new block after a specified block (using block key to identify the block)
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
    hasFocus: true,
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
      hasFocus: true,
    }),
  });

  return EditorState.push(editorState, newContent, "split-block");
}

// Function used to remove a block using its key
export const removeBlock = (
  editorState: EditorState,
  pivotBlockKey: string
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

  const newBlockMap = blocksBefore.concat(blocksAfter).toOrderedMap();

  const selection = editorState.getSelection();

  const newContent: any = content.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
  });

  return EditorState.push(editorState, newContent, "split-block");
};

// Function used to change a block's position
export function moveBlock(
  editorState: EditorState,
  pivotBlockKey: string,
  moveBlockKey: string
) {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  const pivotBlock = blockMap.get(pivotBlockKey);
  const moveBlock = blockMap.get(moveBlockKey);

  const blocksBeforeMoveBlock = blockMap
    .toSeq()
    .takeUntil((v) => v === moveBlock);

  const blocksAfterMoveBlock = blockMap
    .toSeq()
    .skipUntil((v) => v === moveBlock)
    .rest();

  const blockMapWithoutMoveBlock = blocksBeforeMoveBlock
    .concat(blocksAfterMoveBlock)
    .toOrderedMap();

  const blocksBeforePivotBlock = blockMapWithoutMoveBlock
    .toSeq()
    .takeUntil((v) => v === pivotBlock);
  const blocksAfterPivotBlock = blockMapWithoutMoveBlock
    .toSeq()
    .skipUntil((v) => v === pivotBlock)
    .rest();

  const newBlockMap = blocksBeforePivotBlock
    .concat(
      [
        [pivotBlockKey, pivotBlock],
        [moveBlock.getKey(), moveBlock],
      ],
      blocksAfterPivotBlock
    )
    .toOrderedMap();

  const selection = editorState.getSelection();

  const newContent: any = content.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
  });

  return EditorState.push(editorState, newContent, "split-block");
}

// Function that checks whether a block has a specific style
export const doesBlockContainStyle = (
  editorState: EditorState,
  style: TEXT_STYLES
) => {
  const inlineStyle = editorState.getCurrentInlineStyle();
  return inlineStyle.has(style);
};

// Function used to get position of block editor
export const getBlockEditorPosition = (rect: DOMRect) => {
  const distanceToTop = rect.y + rect.height; // Distance from mouse click to top of window
  const distanceToBottom = window.innerHeight - distanceToTop + rect.height; // Distance from mouse click to bottom of window
  const distanceToLeft = rect.x; // Distance from mouse click to left of window
  const distanceToRight = window.innerWidth - distanceToLeft; // Distance from mouse click to right of window
  return {
    top: distanceToTop,
    right: distanceToRight,
    bottom: distanceToBottom,
    left: distanceToLeft,
  };
};

export const positionBlockEditorModal = (
  rect: DOMRect,
  componentHeight: number
) => {
  const { top, left, bottom } = getBlockEditorPosition(rect);
  let newCoordinate;

  if (componentHeight && bottom - componentHeight < componentHeight) {
    newCoordinate = { bottom: bottom && bottom };
  } else {
    newCoordinate = { top: top && top };
  }
  return { ...newCoordinate, left: left };
};

// Function used to get word count
export const getWordCount = (editorState: EditorState) => {
  const plainText = editorState.getCurrentContent().getPlainText("");
  const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
  const cleanString = plainText.replace(regex, " ").trim(); // replace above characters w/ space
  const wordArray = cleanString.match(/\S+/g); // matches words according to whitespace
  return wordArray ? wordArray.length : 0;
};

// Function to update meta date of a block e.g. for the to-do block we can use
// this function to save the checked state of the block
export const updateDataOfBlock = (
  editorState: any,
  block: any,
  newData: any
) => {
  const contentState = editorState.getCurrentContent();
  const newBlock = block.merge({
    data: newData,
  });
  const newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock),
  });
  return EditorState.push(editorState, newContentState, "change-block-type");
};

// Changes style of all text in a given block
// Can also specify which styles to delete before style change
export const toggleBlockStyle = (
  editorState: EditorState,
  style: TEXT_STYLES,
  stylesToRemove?: TEXT_STYLES[]
) => {
  let newEditorState = returnWholeBlockEditorState(editorState);
  if (stylesToRemove) {
    newEditorState = removeSpecificBlockStyle(stylesToRemove, editorState);
  }
  return RichUtils.toggleInlineStyle(newEditorState, style);
};

// Changes style of inline text
export const toggleInlineStyle = (
  editorState: EditorState,
  style: TEXT_STYLES,
  stylesToRemove?: string[]
) => {
  let newEditorState = editorState;
  if (stylesToRemove) {
    newEditorState = removeSpecificBlockStyle(stylesToRemove, editorState);
  }
  return RichUtils.toggleInlineStyle(newEditorState, style);
};

export const createKeysAndBlocks = (editorState: EditorState) => {
  const rawContent = convertToRaw(editorState.getCurrentContent());
  const keys = rawContent.blocks.map((val) => val.key);
  const blocks = rawContent.blocks.map((val) => JSON.stringify(val));
  return { keys, blocks };
};

export const convertBlocksToContent = (blocks: string[]) => {
  const parsedBlocks: RawDraftContentBlock[] = blocks.map((block) =>
    JSON.parse(block)
  );
  const content = convertFromRaw({
    blocks: parsedBlocks,
    entityMap: {},
  });
  return content;
};
