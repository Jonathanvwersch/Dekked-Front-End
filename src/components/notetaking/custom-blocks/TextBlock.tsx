import { EditorBlock } from "draft-js";
import { memo, useContext } from "react";
import styled from "styled-components";
import { TextAlignmentsContext } from "../../../contexts";
import { getCurrentBlock } from "../Editor/Editor.helpers";

interface TextBlockProps {}

const TextBlock: React.FC<TextBlockProps> = (props: any) => {
  const currentBlockKey = getCurrentBlock(
    props.blockProps.editorState
  ).getKey();
  const { blockTextAlignments } = useContext(TextAlignmentsContext);

  return (
    <Container
      textAlign={blockTextAlignments[currentBlockKey]}
      currentBlockKey={props.offsetKey}
    >
      <EditorBlock {...props} />
    </Container>
  );
};

const Container = styled.div<{
  textAlign?: "left" | "right" | "center";
  currentBlockKey?: string;
}>`
  div[data-offset-key=${({ currentBlockKey }) => currentBlockKey}] {
    text-align: ${({ textAlign }) => textAlign || "left"}!important;
  }
  div::placeholder {
    display: none;
  }
`;

export default memo(TextBlock);
