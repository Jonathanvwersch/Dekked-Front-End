import Draft, {
  ContentBlock,
  DraftEditorCommand,
  EditorState,
  RichUtils,
  Editor,
  DraftHandleValue,
} from "draft-js";

import "draft-js/dist/Draft.css";

import React, { useCallback, useContext, useEffect, useState } from "react";

import {
  addNewBlockAt,
  getCurrentBlock,
  isSoftNewlineEvent,
  myBlockStyleFn,
  onSuccessOfImageUpload,
  removeCharacters,
  toggleInlineStyle,
} from "./Editor.helpers";

import styled, { ThemeContext } from "styled-components";
import NotetakingBlocksModal from "../TextModal/NotetakingBlocksModal";
import { BLOCK_TYPES, TEXT_STYLES } from "../../../shared";
import Skeleton from "react-loading-skeleton";
import { formatMessage } from "../../../intl";
import { useIntl } from "react-intl";
import { styleMap } from "./Editor.data";
import GeneralBlock from "../GeneralBlock/GeneralBlock";
import { blockLinkAtom, isFlashcardLinkedAtom } from "../../../store";
import { useAtom } from "jotai";
import { SIZES } from "dekked-design-system";
import { ImageBlock } from "..";
import { uploadImage } from "../../../api";
import { useMutation } from "react-query";
const Immutable = require("immutable");

export type EditorType = "flashcard" | "page";

interface RichEditorProps {
  editorState: EditorState;
  setHasFocus: React.Dispatch<React.SetStateAction<boolean>>;
  setEditorState?: React.Dispatch<React.SetStateAction<EditorState>>;
  saveEditor?: (args: any) => void;
  hasFocus?: boolean;
  isLoading?: boolean;
  editorType?: EditorType;
  isEditable?: boolean;
  editorRef?: React.RefObject<any>;
  styles?: React.CSSProperties | undefined;
}

const RichEditor: React.FC<RichEditorProps> = ({
  editorState,
  setEditorState,
  saveEditor,
  isLoading,
  setHasFocus,
  hasFocus = true,
  isEditable = true,
  editorType = "page",
  editorRef,
  styles,
}) => {
  const intl = useIntl();
  const currentBlock = getCurrentBlock(editorState);
  const [dragBlockKey, setDragBlockKey] = useState<string | undefined>();
  const theme = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<any>();

  const { mutate: saveImage } = useMutation<{ imagePath: string }>(
    `${currentBlock.getKey()}-upload-image`,
    uploadImage,
    {
      onSuccess: (data, variables) => {
        const newEditorState = onSuccessOfImageUpload(
          data?.imagePath,
          //@ts-ignore
          variables?.name,
          editorState
        );
        setEditorState && setEditorState(newEditorState);
      },
    }
  );

  const handleImageUpload = useCallback(
    (e: any) => {
      setImageFile(e?.target?.files?.[0]);
    },
    [imageFile]
  );

  useEffect(() => {
    if (imageFile) {
      saveImage(imageFile);
      return () =>
        document
          ?.getElementById("ImageUpload")
          ?.removeEventListener("change", handleImageUpload);
    }
  }, [imageFile, saveImage]);

  const handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState && setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  const toggleBlockType = (blockType: BLOCK_TYPES) => {
    if (blockType === BLOCK_TYPES.IMAGE) {
      const imageUpload = document.getElementById("ImageUpload");
      imageUpload?.click();
      imageUpload?.addEventListener("change", handleImageUpload);

      const newEditorState = removeCharacters(
        editorState,
        0,
        currentBlock?.getText().length
      );
      setEditorState && setEditorState(newEditorState);
    } else {
      const newEditorState = removeCharacters(
        editorState,
        0,
        currentBlock?.getText().length
      );

      setEditorState &&
        setEditorState(RichUtils.toggleBlockType(newEditorState, blockType));
    }
  };

  // block type selector
  const myBlockRenderer = (contentBlock: ContentBlock) => {
    if (contentBlock?.getType() === "atomic") {
      return {
        component: ImageBlock,
        editable: false,
        props: {
          editorState,
          setEditorState,
          saveEditor,
          isEditable,
          currentBlock,
        },
      };
    } else {
      const type = contentBlock?.getType();
      return {
        component: GeneralBlock,
        props: {
          editorState,
          setEditorState,
          dragBlockKey,
          setDragBlockKey,
          type,
          editorType,
          isEditable,
          saveEditor,
        },
      };
    }
  };

  // handle what happens when return key is pressed
  const handleReturn = (e: any): DraftHandleValue => {
    if (isOpen) return "handled";
    if (isSoftNewlineEvent(e)) {
      setEditorState &&
        setEditorState(RichUtils.insertSoftNewline(editorState));
      return "handled";
    }
    const currentBlock = getCurrentBlock(editorState);
    const blockType = currentBlock?.getType();
    if (
      blockType === "unstyled" ||
      blockType === "unordered-list-item" ||
      blockType === "ordered-list-item" ||
      blockType === "to-do"
    ) {
      return "not-handled";
    }

    setEditorState &&
      setEditorState(addNewBlockAt(editorState, currentBlock?.getKey()));
    return "handled";
  };

  const onChange = (newEditorState: EditorState) => {
    setEditorState && setEditorState(newEditorState);

    const currentContentState = editorState?.getCurrentContent();
    const newContentState = newEditorState?.getCurrentContent();

    if (currentContentState !== newContentState) {
      saveEditor && saveEditor(newEditorState);
    }
  };

  // see https://draftjs.org/docs/advanced-topics-custom-block-render-map
  const blockRenderMap = Immutable.Map({});

  const extendedBlockRenderMap =
    Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

  const showPlaceholder = editorType === "flashcard" ? hasFocus : true;

  const onTab = (event: React.KeyboardEvent<{}>) => {
    setEditorState && setEditorState(RichUtils.onTab(event, editorState, 4));
  };

  const [isLinked] = useAtom(isFlashcardLinkedAtom);
  const [blockLink] = useAtom(blockLinkAtom);
  const blockLinkDiv = document.getElementById(`${blockLink}-0-0`);

  useEffect(() => {
    // style block if is linked
    if (isLinked) {
      const distanceFromTop = blockLinkDiv?.getBoundingClientRect().top ?? 0;
      const topOffset = -200;

      document
        .getElementById("Page")
        ?.scrollTo({ top: topOffset + distanceFromTop, behavior: "smooth" });

      if (blockLinkDiv) {
        blockLinkDiv.style.boxShadow = theme.boxShadow;
        blockLinkDiv.style.padding = "4px";
        blockLinkDiv.style.borderRadius = "8px";
      }
    } else if (blockLinkDiv) {
      blockLinkDiv.style.boxShadow = "none";
      blockLinkDiv.style.padding = "0px";
      blockLinkDiv.style.borderRadius = "none";
    }
  }, [isLinked, blockLinkDiv, blockLink, theme]);

  useEffect(() => {
    if (currentBlock?.getText()[currentBlock?.getLength() - 1] === "^") {
      const newEditorState = removeCharacters(
        editorState,
        currentBlock?.getLength() - 1,
        currentBlock?.getLength()
      );
      setEditorState &&
        setEditorState(
          toggleInlineStyle(newEditorState, TEXT_STYLES.SUPERSCRIPT)
        );
    }
  }, [currentBlock, editorState, setEditorState]);

  const handlePastedFiles = (files: any) => {
    // handleImageUpload
    const acceptFilesType = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/x-png",
      "image/bmp",
    ];

    if (acceptFilesType.includes(files?.[0]?.type)) setImageFile(files[0]);

    return "handled" as DraftHandleValue;
  };

  return (
    <>
      {!isLoading ? (
        <EditorContainer
          style={styles}
          isEditable={isEditable}
          onFocus={() => {
            setHasFocus(true);
            editorRef?.current.focus();
          }}
          onClick={() => {
            setHasFocus(true);
            editorRef?.current.focus();
          }}
          onBlur={() => setHasFocus(false)}
          editorType={editorType}
          isLinked={isLinked}
        >
          <Editor
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
            ref={editorRef}
            onTab={onTab}
            spellCheck={true}
            blockRendererFn={myBlockRenderer}
            readOnly={!isEditable}
            handleReturn={handleReturn}
            handlePastedFiles={handlePastedFiles}
            blockStyleFn={myBlockStyleFn}
            blockRenderMap={extendedBlockRenderMap}
            customStyleMap={styleMap(theme)}
            placeholder={
              showPlaceholder &&
              getCurrentBlock(editorState)?.getType() === BLOCK_TYPES.UNSTYLED
                ? formatMessage(`studySet.notetaking.placeholder`, intl)
                : ""
            }
          />

          <NotetakingBlocksModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onToggle={toggleBlockType}
            editorState={editorState}
          />
        </EditorContainer>
      ) : (
        <SkeletonContainer>
          <StyledSkeleton
            count={5}
            width="100%"
            height={theme.spacers.size32}
          />
        </SkeletonContainer>
      )}
    </>
  );
};

const SkeletonContainer = styled.div`
  width: 100%;
  & span {
    width: 100%;
  }
`;

const StyledSkeleton = styled(Skeleton)`
  margin-top: ${({ theme }) => theme.spacers.size16};
`;

const EditorContainer = styled.div<{
  isEditable: boolean;
  editorType: EditorType;
  isLinked?: boolean;
}>`
  margin-bottom: ${({ editorType }) =>
    editorType === "page" ? undefined : "250px"};
  color: ${({ theme }) => theme.colors.fontColor};
  width: 100%;
  position: relative;
  font-size: ${({ theme, editorType }) =>
    editorType === "page"
      ? theme.typography.fontSizes.size16
      : theme.typography.fontSizes.size14};

  div[data-editor] {
    padding: ${({ theme }) => theme.spacers.size4} 0px;
    position: relative;
  }

  li {
    position: relative;
  }

  & .public-DraftEditorPlaceholder-root {
    margin-top: ${({ theme }) => theme.spacers.size4};
  }

  & .public-DraftEditorPlaceholder-inner {
    color: ${({ theme }) => theme.colors.grey2};
    display: ${({ isEditable }) => (!isEditable ? "none" : "auto")};
  }

  h1 {
    margin-top: ${({ theme }) => theme.spacers.size16};
    margin-bottom: ${({ theme }) => theme.spacers.size20};
  }

  h2 {
    margin-top: ${({ theme }) => theme.spacers.size12};
    margin-bottom: ${({ theme }) => theme.spacers.size12};
  }

  h3 {
    margin-top: ${({ theme }) => theme.spacers.size8};
    margin-bottom: ${({ theme }) => theme.spacers.size4};
  }

  .custom-blockquote {
    margin-top: ${({ theme }) => theme.spacers.size20};
    margin-bottom: ${({ theme }) => theme.spacers.size20};
    border-left: 2px solid ${({ theme }) => theme.colors.fontColor};
    font-style: italic;
    font-size: ${({ theme }) => theme.typography.fontSizes.size18};
    padding-left: ${({ theme }) => theme.spacers.size16};
  }

  .custom-image {
    width: 100%;

    img {
      max-width: 100%;
      object-fit: cover;
      height: auto;
    }
  }

  .custom-codeblock {
    margin-top: ${({ theme }) => theme.spacers.size20};
    margin-bottom: ${({ theme }) => theme.spacers.size20};
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.MEDIUM]};
    font-size: ${({ theme }) => theme.typography.fontSizes.size18};
    padding: ${({ theme }) => theme.spacers.size16};
    font-family: "Courier Prime", monospace;
    font-size: ${({ theme }) => theme.typography.fontSizes.size16};
  }
`;

export default RichEditor;
