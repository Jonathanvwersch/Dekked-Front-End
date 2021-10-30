import { EditorState } from "draft-js";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  noMatchingBlocksData,
  NoteTakingBlocksData,
} from "./NotetakingBlocks.data";

import { ScrollerModal } from "../../common";
import {
  getCurrentBlock,
  positionBlockEditorModal,
} from "../Editor/Editor.helpers";
import { getSelectedBlockNode } from "./NotetakingBlocksModal.helpers";
import {
  MODAL_TYPE,
  CoordsType,
  BLOCK_TYPES,
  ScrollerModalData,
} from "../../../shared";
import { formatMessage } from "../../../intl";
import { useIntl } from "react-intl";

interface NotetakingBlocksModalProps {
  onToggle: (style: BLOCK_TYPES) => void;
  editorState: EditorState;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotetakingBlocksModal: React.FC<NotetakingBlocksModalProps> = ({
  onToggle,
  editorState,
  isOpen,
  setIsOpen,
}) => {
  const intl = useIntl();
  const [currentTextLength, setCurrentTextLength] = useState<number>(0);
  const [data, setData] = useState<ScrollerModalData>(NoteTakingBlocksData);
  const [coords, setCoords] = useState<CoordsType | undefined>();
  const currentBlock = getCurrentBlock(editorState);
  const currentText = currentBlock.getText().slice(1).toLowerCase();
  const editorHasFocus = editorState.getSelection().getHasFocus();

  const updatePosition = () => {
    const nodeSelected = getSelectedBlockNode(window);
    if (nodeSelected) {
      const selectedBox = nodeSelected.getBoundingClientRect();
      const blockHeight = 180;
      const newCoords = positionBlockEditorModal(selectedBox, blockHeight);
      setCoords({
        ...newCoords,
      });
    }
  };

  const toggleBlockStyle = (style: BLOCK_TYPES) => {
    onToggle(style);
  };

  useLayoutEffect(() => {
    if (
      currentBlock.getText()[0] === "/" &&
      editorHasFocus &&
      currentBlock.getType() === "unstyled"
    ) {
      updatePosition();
    }
  }, [currentBlock, editorHasFocus]);

  useLayoutEffect(() => {
    if (
      currentBlock.getText()[0] === "/" &&
      editorHasFocus &&
      currentBlock.getType() === "unstyled" &&
      coords
    ) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [currentBlock, editorHasFocus, setIsOpen, coords]);

  useEffect(() => {
    if (isOpen) {
      // Filter data of modal based on what user types
      let filteredData = NoteTakingBlocksData.filter((item) => {
        const label = formatMessage(item.label, intl).toLowerCase();
        return label.includes(currentText);
      });

      // Show special 'no results block' in modal,
      // if current text does not match any blocks
      if (filteredData.length === 0) {
        filteredData = noMatchingBlocksData;
      }

      if (filteredData !== noMatchingBlocksData) {
        setCurrentTextLength(currentText.length);
      }

      // If the data is only made up of the special 'no matching results block'
      // and the length of the text is greater than 6, close the modal
      // as it is now clear that user does not want to use the modal.
      // Six is an arbitrary number.
      if (
        filteredData === noMatchingBlocksData &&
        currentText.length > currentTextLength + 6
      ) {
        setIsOpen(false);
      }

      setData(filteredData);
    }
  }, [isOpen, currentText]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isOpen ? (
        <ScrollerModal
          open={isOpen}
          handleClose={() => setIsOpen(false)}
          coords={coords}
          clickFunctions={toggleBlockStyle}
          data={data}
          type={MODAL_TYPE.NON_MODAL_NON_LIGHTBOX}
          fakeFocus
          preventDefault
        />
      ) : null}
    </>
  );
};

export default React.memo(NotetakingBlocksModal);
