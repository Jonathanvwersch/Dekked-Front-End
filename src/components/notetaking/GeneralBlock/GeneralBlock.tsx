import React, { memo } from "react";
import { BLOCK_TYPES } from "../../../shared";
import BlockSettings from "../BlockSettings/BlockSettings";
import { DividerBlock, TextBlock, TodoBlock } from "../custom-blocks";

const GeneralBlock: React.FC = (props: any) => {
  const { editorState, setEditorState, dragBlockKey, setDragBlockKey, type } =
    props.blockProps;

  const GeneralBlock = () => {
    switch (type) {
      case BLOCK_TYPES.DIVIDER:
        return <DividerBlock {...props} />;
      case BLOCK_TYPES.TODO:
        return <TodoBlock {...props} />;
      default:
        return <TextBlock {...props} />;
    }
  };

  return (
    <BlockSettings
      editorState={editorState}
      setEditorState={setEditorState}
      blockKey={props.block.getKey()}
      block={props.block}
      dragBlockKey={dragBlockKey}
      setDragBlockKey={setDragBlockKey}
      blockType={type}
    >
      {GeneralBlock()}
    </BlockSettings>
  );
};

export default memo(GeneralBlock);
