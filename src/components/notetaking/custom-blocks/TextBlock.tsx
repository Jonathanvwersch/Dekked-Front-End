import { EditorBlock } from "draft-js";
import React, { memo, ReactElement } from "react";
import styled from "styled-components";
import { ConditionalWrapper } from "../../common";
import BlockSettings from "../BlockSettings/BlockSettings";

const TextBlock: React.FC = (props: any) => {
  const data = props.block.getData();
  const { withSettings } = props.blockProps;

  let alignment = data.has("alignment") && data.get("alignment");

  // only allow alignment to be set if block has text to prevent misplaced placeholder text
  if (props.block.getText().length === 0) {
    alignment = "left";
  }

  return (
    <ConditionalWrapper
      condition={withSettings == null ? true : withSettings}
      wrapper={(children: ReactElement) => (
        <BlockSettings
          blockType={props.block.getType()}
          blockKey={props.block.getKey()}
          block={props.block}
        >
          {children}
        </BlockSettings>
      )}
    >
      <AlignBlock alignment={alignment}>
        <EditorBlock {...props} />
      </AlignBlock>
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