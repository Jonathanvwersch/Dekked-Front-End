import {
  Box,
  ComponentLoadingSpinner,
  Flex,
  ImageIcon,
  MODAL_TYPE,
  Overlay,
  SIZES,
  Spacer,
  Text,
} from "dekked-design-system";
import { useAtom } from "jotai";
import React, { useLayoutEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Halo } from "../..";
import { config } from "../../../config";
import { useLayeredModal, useTheme } from "../../../hooks";
import { isStudyModeFlashcardEditableAtom } from "../../../store";
import { updateDataOfBlock } from "../Editor/Editor.helpers";

export type EditorType = "flashcard" | "page";

const ImageBlock: React.FC = (props: any) => {
  const theme = useTheme();
  const { block, contentState, blockProps } = props;

  const { setEditorState, editorState, saveEditor, isEditable } = blockProps;
  const data = block.getData();

  const [width, setWidth] = useState<any>(data?.get("width") || "100%");
  const [height, setHeight] = useState<any>(data?.get("height") || "auto");
  const [hasImageRendered, setHasImageRendered] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  useLayeredModal(fullscreen);
  const [isFlashcardEditable] = useAtom(isStudyModeFlashcardEditableAtom);

  const onError = (event: any) => {
    setError(true);
    event.target.classList.add("error");
  };

  const startRender = () => {
    requestAnimationFrame(() => setHasImageRendered(true));
  };

  const onLoad = (event: any) => {
    event.target.classList.add("loaded");

    if ((!data?.has("width") || !data?.has("height")) && data.has("src")) {
      setWidth(event?.target?.width);
      setHeight(event?.target?.height);
      const newEditorState = updateDataOfBlock(editorState, block, {
        src: data.get("src"),
        alt: data.get("alt"),
        width: event?.target?.width,
        height: event?.target?.height,
      });
      setEditorState(newEditorState);
      saveEditor && saveEditor(newEditorState);
    }

    requestAnimationFrame(startRender);
  };

  useLayoutEffect(() => {
    if (!data.has("src") && block?.getEntityAt(0)) {
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
      height={height}
      onLoad={onLoad}
      onError={onError}
      onDoubleClick={() =>
        !isFlashcardEditable && setFullscreen((prevState) => !prevState)
      }
    />
  );

  return (
    <>
      <Halo
        editable={!isFlashcardEditable ? false : true}
        saveEditor={saveEditor}
        editorState={editorState}
        setEditorState={setEditorState}
        blockKey={block.getKey()}
      >
        <ImageContainer
          contentEditable={false}
          className={"rendering"}
          isEditable={isEditable}
          style={{ height: height, width: width }}
        >
          {!hasImageRendered && !error ? (
            <Box style={{ position: "absolute" }}>
              <ComponentLoadingSpinner />
            </Box>
          ) : null}
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

const ImageContainer = styled.div<{
  isEditable?: boolean;
}>`
  width: 100%;
  position: relative;
  cursor: ${({ isEditable }) => isEditable && "pointer"};

  &.rendering {
    display: flex;
    align-items: center;
    justify-content: center;
  }

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
