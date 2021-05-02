import { EditorBlock } from "draft-js";
import { memo } from "react";

interface TextBlockProps {}

const TextBlock: React.FC<TextBlockProps> = (props: any) => {
  return <EditorBlock {...props} />;
};

export default memo(TextBlock);
