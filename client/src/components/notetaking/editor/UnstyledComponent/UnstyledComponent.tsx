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
  const hasFocus = props.selection.hasFocus;

  return (
    <>
      {!hasText && currentBlockKey === blockKey && hasFocus ? (
        <EmptyCommandBlock />
      ) : null}
      <EditorBlock {...props} />
    </>
  );
};

const EmptyCommandBlock = styled.div`
  color: ${({ theme }) => theme.colors.grey1};
  position: absolute;

  &:empty:before {
    content: "Start writing or type '/' to view commands";
  }
`;

export default UnstyledComponent;
