import React from "react";
import { ContentBlock, EditorBlock } from "draft-js";
import styled from "styled-components";

const UnstyledComponent = (props: any) => {
  const currentBlock: ContentBlock = props.block;
  const hasText = currentBlock.getText() !== "";
  return (
    <>
      {!hasText ? (
        <EmptyCommandBlack contentEditable={false}>
          Type '/' for commands
        </EmptyCommandBlack>
      ) : null}
      <EditorBlock {...props} />
    </>
  );
};

const EmptyCommandBlack = styled.span`
  user-select: none;
  color: ${({ theme }) => theme.colors.grey1};
  position: absolute;
`;

export default UnstyledComponent;
