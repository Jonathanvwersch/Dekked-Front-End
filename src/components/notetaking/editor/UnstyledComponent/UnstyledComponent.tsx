import React from "react";
import { ContentBlock, EditorBlock } from "draft-js";
import styled from "styled-components";
import { getCurrentBlock } from "../../Utils/editorUtils";

const UnstyledComponent = (props: any) => {
  const currentBlock: ContentBlock = props.block;
  const hasText = currentBlock.getText() !== "";
  const currentBlockKey = getCurrentBlock(
    props.blockProps.editorState
  ).getKey();
  const blockKey = props.offsetKey.split("-")[0];
  console.log(props.selection.hasFocus);

  return (
    <>
      {!hasText && currentBlockKey === blockKey ? <EmptyCommandBlock /> : null}
      <EditorBlock {...props} />
    </>
  );
};

const EmptyCommandBlock = styled.div`
  color: ${({ theme }) => theme.colors.grey1};
  position: absolute;

  &:empty:before {
    content: "Type '/' to view block types";
  }
`;

export default UnstyledComponent;
