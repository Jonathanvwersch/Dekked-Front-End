import { EditorBlock } from "draft-js";
import React from "react";
import styled from "styled-components";
import { BLOCK_TYPES } from "../../../shared";

interface TextBlockProps {
  props: any;
  type: BLOCK_TYPES;
}

const TextBlock: React.FC<TextBlockProps> = ({ props }) => {
  const data = props.block.getData();
  let alignment = data.has("alignment") && data.get("alignment");

  // only allow alignment to be set if block has text to prevent misplaced placeholder text
  if (props.block.getText().length === 0 || props.block.getText()[0] === "/") {
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

export default TextBlock;
