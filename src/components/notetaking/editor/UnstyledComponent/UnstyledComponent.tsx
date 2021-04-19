import React from "react";
import { ContentBlock, EditorBlock } from "draft-js";
import styled from "styled-components/macro";
import { getCurrentBlock } from "../../Utils/editorUtils";
import { useIntl } from "react-intl";
import { formatMessage } from "../../../../intl";

const UnstyledComponent = (props: any) => {
  const currentBlock: ContentBlock = props.block;
  const hasText = currentBlock.getText() !== "";
  const currentBlockKey = getCurrentBlock(
    props.blockProps.editorState
  ).getKey();
  const blockKey = props.offsetKey.split("-")[0];
  const intl = useIntl();

  return (
    <>
      {!hasText && currentBlockKey === blockKey ? (
        <EmptyCommandBlock
          placeholder={formatMessage("studySet.notetaking.placeholder", intl)}
        />
      ) : null}
      <EditorBlock {...props} />
    </>
  );
};

const EmptyCommandBlock = styled.div`
  color: ${({ theme }) => theme.colors.grey2};
  position: absolute;

  &:empty:before {
    content: attr(placeholder);
  }
`;

export default UnstyledComponent;
