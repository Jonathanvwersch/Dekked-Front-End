import { EditorBlock } from "draft-js";
import React, { memo } from "react";
import styled from "styled-components";
import { ConditionalWrapper } from "../../common";
import BlockSettings from "../BlockSettings/BlockSettings";

interface TextBlockProps {
  withSettings?: boolean;
}

const TextBlock: React.FC<TextBlockProps> = (
  props: any,
  { withSettings = true }
) => {
  const data = props.block.getData();
  let alignment = data.has("alignment") && data.get("alignment");

  // only allow alignment to be set if block has text to prevent misplaced placeholder text
  if (props.block.getText().length === 0) {
    alignment = "left";
  }

  const children = (
    <AlignBlock alignment={alignment}>
      <EditorBlock {...props} />
    </AlignBlock>
  );

  return (
    <ConditionalWrapper
      condition={withSettings}
      wrapper={() => (
        <BlockSettings
          blockType={props.block.getType()}
          blockKey={props.block.getKey()}
        >
          {children}
        </BlockSettings>
      )}
    >
      {children}
    </ConditionalWrapper>
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
