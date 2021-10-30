import React from "react";
import { BLOCK_TYPES } from "../../../shared";
import { DividerBlock, TextBlock } from "../custom-blocks";

const GeneralBlock: React.FC = (props: any) => {
  const {
    // editorState,
    // setEditorState,
    // dragBlockKey,
    // setDragBlockKey,
    type,
    // editorType,
    // isEditable,
  } = props.blockProps;

  const GeneralBlock = () => {
    switch (type) {
      case BLOCK_TYPES.UNSTYLED:
        return <TextBlock props={props} type={type} />;
      case BLOCK_TYPES.DIVIDER:
        return <DividerBlock {...props} />;
      // case BLOCK_TYPES.TODO:
      //   return <TodoBlock {...props} />;
      default:
        return <TextBlock type={type} props={props} />;
    }
  };

  // const HoverBlocks = (children: ReactElement) => (
  //   <BlockSettings
  //     editorState={editorState}
  //     setEditorState={setEditorState}
  //     blockKey={props.block.getKey()}
  //     block={props.block}
  //     dragBlockKey={dragBlockKey}
  //     setDragBlockKey={setDragBlockKey}
  //     blockType={type}
  //     editorType={editorType}
  //   >
  //     {children}
  //   </BlockSettings>
  // );

  return <>{GeneralBlock()}</>;
  // <ConditionalWrapper
  //   condition={isEditable}
  //   wrapper={(children: ReactElement) => HoverBlocks(children)}
  // >
  //   {GeneralBlock()}
  // </ConditionalWrapper>
};

export default GeneralBlock;
