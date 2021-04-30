import { ContentBlock, EditorBlock } from "draft-js";
import { memo } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { usePageSetupHelpers } from "../../../hooks";
import { getCurrentBlock } from "../Editor/Editor.helpers";
import { placeholder } from "../TextModal/NotetakingBlocks.data";

interface PlaceholderProps {}

const PlaceholderBlock: React.FC<PlaceholderProps> = (props: any) => {
  const currentBlock: ContentBlock = props.block;
  const style = currentBlock.getType();
  const hasText = currentBlock.getText() !== "";
  const currentBlockKey = getCurrentBlock(
    props.blockProps.editorState
  ).getKey();
  const blockKey = props.offsetKey.split("-")[0];
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers();

  return (
    <>
      {!hasText && currentBlockKey === blockKey ? (
        <EmptyCommandBlock
          contentEditable={false}
          leftPosition={style === "to-do" ? theme.spacers.size32 : undefined}
          placeholder={
            placeholder(style) ? formatMessage(placeholder(style), intl) : ""
          }
        />
      ) : null}
      <EditorBlock {...props} />
    </>
  );
};

const EmptyCommandBlock = styled.span<{ leftPosition: string | undefined }>`
  color: ${({ theme }) => theme.colors.grey2};
  position: absolute;
  left: ${({ leftPosition }) => leftPosition};

  &:empty:before {
    content: attr(placeholder);
  }
`;

export default memo(PlaceholderBlock);
