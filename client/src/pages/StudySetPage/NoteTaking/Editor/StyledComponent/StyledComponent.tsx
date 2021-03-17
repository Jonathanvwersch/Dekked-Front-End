import {
  ContentBlock,
  EditorBlock,
  ContentState,
  Modifier,
  SelectionState,
} from "draft-js";

function StyledComponent(props: any) {
  const currentBlock: ContentBlock = props.block;
  const contentState: ContentState = props.contentState;
  const key = currentBlock.getKey();
  const targetRange = new SelectionState({
    anchorKey: key,
    anchorOffset: 0,
    focusKey: key,
    focusOffset: currentBlock.getLength() + 1,
  });

  const newContentState = Modifier.replaceText(
    contentState,
    targetRange,
    "backward"
  );

  let newProps = { ...props };
  newProps.contentState = newContentState;

  return <EditorBlock {...newProps} />;
}

export default StyledComponent;
