import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { config } from "../../../config";
import { updateDataOfBlock } from "../Editor/Editor.helpers";

export type EditorType = "flashcard" | "page";
const fallBackImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

const ImageBlock: React.FC = (props: any) => {
  const { block, contentState, blockProps } = props;

  const { setEditorState, editorState, saveEditor } = blockProps;
  const data = block.getData();

  const [width, setWidth] = useState<any>(data?.get("width") || "100%");
  const [height, setHeight] = useState<any>(data?.get("height") || "100%");

  const onLoad = (event: any) => {
    event.target.classList.add("loaded");
    if (!data?.has("height") && data.has("src")) {
      setHeight(event?.target?.height);
      setWidth(event?.target?.width);
      const newEditorState = updateDataOfBlock(editorState, block, {
        src: data.get("src"),
        alt: data.get("alt"),
        width: event?.target?.width,
        height: event?.target?.height,
      });
      setEditorState(newEditorState);
      saveEditor && saveEditor(newEditorState);
    }
  };

  useLayoutEffect(() => {
    if (!data.has("src") && !data?.has("height") && block?.getEntityAt(0)) {
      const entity = contentState?.getEntity(block?.getEntityAt(0));
      const { src, alt } = entity?.getData();
      const newEditorState = updateDataOfBlock(editorState, block, {
        src,
        alt,
      });
      setEditorState(newEditorState);
      saveEditor && saveEditor(newEditorState);
    }
  }, [data, block, editorState, contentState, setEditorState, saveEditor]);

  return (
    <Image
      src={`${config.API}${data.get("src")}`}
      alt={data.get("alt")}
      width={width}
      height={height}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

const onError = (event: any) => {
  event.target.classList.add("error");
};

const Image = styled.img`
  display: block;
  // Add a smooth animation on loading
  @keyframes loading {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
  &.loaded:not(.error) {
    animation: loaded 300ms ease-in-out;
  }
  &.error {
    // fallback to placeholder image on error
    content: url(${fallBackImage});
  }
`;

export default ImageBlock;
