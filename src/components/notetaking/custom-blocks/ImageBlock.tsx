import {
  Flex,
  ImageIcon,
  MODAL_TYPE,
  Overlay,
  SIZES,
  Spacer,
  Text,
} from "dekked-design-system";
import React, { useLayoutEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Halo } from "../..";
import { config } from "../../../config";
import { useTheme } from "../../../hooks";
import { updateDataOfBlock } from "../Editor/Editor.helpers";

export type EditorType = "flashcard" | "page";

const ImageBlock: React.FC = (props: any) => {
  const theme = useTheme();
  const { block, contentState, blockProps } = props;

  const { setEditorState, editorState, saveEditor } = blockProps;
  const data = block.getData();

  const [width, setWidth] = useState<any>(data?.get("width") || "100%");
  const [error, setError] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const onError = (event: any) => {
    setError(true);
    event.target.classList.add("error");
  };

  const onLoad = (event: any) => {
    event.target.classList.add("loaded");
    if (!data?.has("width") && data.has("src")) {
      setWidth(event?.target?.width);
      const newEditorState = updateDataOfBlock(editorState, block, {
        src: data.get("src"),
        alt: data.get("alt"),
        width: event?.target?.width,
      });
      setEditorState(newEditorState);
      saveEditor && saveEditor(newEditorState);
    }
  };

  useLayoutEffect(() => {
    if (!data.has("src") && !data?.has("height") && block?.getEntityAt(0)) {
      const entity = contentState?.getEntity(block?.getEntityAt(0));
      const { src, alt, key } = entity?.getData();
      const newEditorState = updateDataOfBlock(editorState, block, {
        src,
        alt,
        key,
      });
      setEditorState(newEditorState);
      saveEditor && saveEditor(newEditorState);
    }
  }, [data, block, editorState, contentState, setEditorState, saveEditor]);

  const ImageComponent = (
    <Image
      id={`${block.getKey()}Image`}
      src={`${config.API}${data.get("src")}`}
      alt={data.get("alt")}
      width={width}
      onLoad={onLoad}
      onError={onError}
      onDoubleClick={() => setFullscreen((prevState) => !prevState)}
    />
  );

  return (
    <>
      <Halo
        editable={false}
        saveEditor={saveEditor}
        editorState={editorState}
        setEditorState={setEditorState}
        blockKey={block.getKey()}
      >
        <ImageContainer className={error ? "error" : undefined}>
          {error && (
            <Flex flexDirection="column">
              <ImageIcon
                color={theme.colors.danger}
                size={theme.spacers.size32}
              />
              <Spacer height={theme.spacers.size20} />
              <Text
                as="p"
                fontColor={theme.colors.grey1}
                fontSize={theme.typography.fontSizes.size14}
              >
                <FormattedMessage id="studySet.notetaking.imageError" />
              </Text>
            </Flex>
          )}
          {ImageComponent}
        </ImageContainer>
      </Halo>
      <Overlay
        isOpen={fullscreen}
        handleClose={() => setFullscreen(false)}
        center
        extraDarkLightBox
        topRightClose
        type={MODAL_TYPE.MODAL_LIGHTBOX}
        modalWidth="1000px"
      >
        {ImageComponent}
      </Overlay>
    </>
  );
};

const ImageContainer = styled.div`
  width: 100%;
  cursor: pointer;
  &.error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 600px;
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.grey3};
    border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.LARGE]};
    border-collapse: separate;
  }
`;

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
    display: none;
  }
`;

export default ImageBlock;
