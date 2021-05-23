import { EditorBlock } from "draft-js";
import React, { memo } from "react";
import styled from "styled-components/macro";

const TextBlock: React.FC = (props: any) => {
  const data = props.block.getData();

  let alignment = data.has("alignment") && data.get("alignment");

  // only allow alignment to be set if block has text to prevent misplaced placeholder text
  if (props.block.getText().length === 0) {
    alignment = "left";
  }

  return (
    <AlignBlock id={`${props.block.getKey()}-0-0`} alignment={alignment}>
      <EditorBlock {...props} />
    </AlignBlock>
  );
};

const AlignBlock = styled.div<{ alignment?: string }>`
  width: 100%;
  div {
    width: 100%;
    text-align: ${({ alignment }) =>
      alignment ? `${alignment}!important` : "left"};
  }
`;

export default memo(TextBlock);
