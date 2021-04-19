import { ContentBlock, EditorBlock } from "draft-js";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { formatMessage } from "../../../../intl";
import { STYLES } from "../../../../shared";

const StyledComponent = (props: any) => {
  const messagePrefix = "studySet.notetaking";
  const currentBlock: ContentBlock = props.block;
  const hasText = currentBlock.getText() !== "";
  const style = currentBlock.getType();
  const intl = useIntl();

  // function to output the block placeholder based on the style of block
  const placeholder = () => {
    switch (style) {
      case STYLES.HEADER_ONE:
        return `${messagePrefix}.toolbar.largeHeading`;

      case STYLES.HEADER_TWO:
        return `${messagePrefix}.toolbar.mediumHeading`;

      case STYLES.HEADER_THREE:
        return `${messagePrefix}.toolbar.smallHeading`;

      case STYLES.BULLETED_LIST:
        return `${messagePrefix}.toolbar.bulletedList`;

      case STYLES.NUMBERED_LIST:
        return `${messagePrefix}.toolbar.numberedList`;

      default:
        return "";
    }
  };

  return (
    <>
      {!hasText ? (
        <EmptyCommandBlock placeholder={formatMessage(placeholder(), intl)} />
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
export default StyledComponent;
