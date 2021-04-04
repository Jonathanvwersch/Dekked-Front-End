import React from "react";
import { ContentBlock, EditorBlock } from "draft-js";
import styled from "styled-components";
import { getCurrentBlock } from "../../Utils/editorUtils";
import { useIntl, IntlShape } from "react-intl";
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
        <EmptyCommandBlock intl={intl} />
      ) : null}
      <EditorBlock {...props} />
    </>
  );
};

const EmptyCommandBlock = styled.div<{ intl: IntlShape }>`
  color: ${({ theme }) => theme.colors.grey1};
  position: absolute;

  &:empty:before {
    content: " ${({ intl }) =>
      formatMessage("studySet.notetaking.placeholder", intl)}";
  }
`;

export default UnstyledComponent;
