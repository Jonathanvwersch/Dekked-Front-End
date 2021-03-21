import { EditorBlock } from "draft-js";
import { useEffect, useRef } from "react";

const StyledComponent = (props: any) => {
  return <EditorBlock {...props} />;
};

export default StyledComponent;
