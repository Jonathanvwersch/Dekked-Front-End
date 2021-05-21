import React, { memo, ReactElement } from "react";
import { BLOCK_TYPES } from "../../../shared";
import { ConditionalWrapper } from "../../common";
import BlockSettings from "../BlockSettings/BlockSettings";
import { DividerBlock, TextBlock, TodoBlock } from "../custom-blocks";

const GeneralBlock: React.FC = (props: any) => {
  const {
    editorState,
    setEditorState,
    dragBlockKey,
    setDragBlockKey,
    type,
    editorType,
    isEditable,
  } = props.blockProps;

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

  const HoverBlocks = (children: ReactElement) => (
    <BlockSettings
      editorState={editorState}
      setEditorState={setEditorState}
      blockKey={props.block.getKey()}
      block={props.block}
      dragBlockKey={dragBlockKey}
      setDragBlockKey={setDragBlockKey}
      blockType={type}
      editorType={editorType}
    >
      {children}
    </BlockSettings>
  );

  return (
    <ConditionalWrapper
      condition={isEditable}
      wrapper={(children: ReactElement) => HoverBlocks(children)}
    >
      <div id={`${props.block.getKey()}-0-0`}>{GeneralBlock()}</div>
    </ConditionalWrapper>
  );
};

export default memo(GeneralBlock);
