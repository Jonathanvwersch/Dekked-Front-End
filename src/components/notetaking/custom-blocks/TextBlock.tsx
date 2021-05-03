import { EditorBlock } from "draft-js";
import React, { memo } from "react";
import styled from "styled-components";
import BlockSettings from "../BlockSettings/BlockSettings";

interface TextBlockProps {}

const TextBlock: React.FC<TextBlockProps> = (props: any) => {
  const data = props.block.getData();
  let alignment = data.has("alignment") && data.get("alignment");

  // only allow alignment to be set if block has text to prevent misplaced placeholder text
  if (props.block.getText().length === 0) {
    alignment = "left";
  }

  return (
    <BlockSettings>
      <AlignBlock alignment={alignment}>
        <EditorBlock {...props} />
      </AlignBlock>
    </BlockSettings>
  );
};

const AlignBlock = styled.div<{ alignment?: string }>`
  div {
    text-align: ${({ alignment }) => alignment}!important;
  }
`;

export default memo(TextBlock);
