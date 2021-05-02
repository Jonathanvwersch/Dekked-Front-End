import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import {
  noMatchingBlocksData,
  NoteTakingBlocksData,
} from "./NotetakingBlocks.data";

import { ScrollerModal } from "../../common";
import { getCurrentBlock, positionBlockEditor } from "../Editor/Editor.helpers";
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
}

const NotetakingBlocksModal: React.FC<NotetakingBlocksModalProps> = ({
  onToggle,
  editorState,
}) => {
  const intl = useIntl();
  const [open, setOpen] = useState<boolean>(false);
  const [currentTextLength, setCurrentTextLength] = useState<number>(0);
  const [data, setData] = useState<ScrollerModalData>(NoteTakingBlocksData);
  const [coords, setCoords] = useState<CoordsType>();
  const currentBlock = getCurrentBlock(editorState);
  const currentText = currentBlock.getText().slice(1).toLowerCase();

  const updatePosition = () => {
    const nodeSelected = getSelectedBlockNode(window);
    if (nodeSelected) {
      const selectedBox = nodeSelected.getBoundingClientRect();
      const blockHeight = 180;
      const newCoords = positionBlockEditor(selectedBox, blockHeight);
      setCoords({
        ...newCoords,
      });
    }
  };

  const handleToggle = (style: BLOCK_TYPES, e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(style);
  };

  useEffect(() => {
    if (currentBlock.getText()[0] === "/") {
      updatePosition();
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [currentBlock]);

  useEffect(() => {
    if (open) {
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

      // If the data is only made up of the special no matching results block
      // and the length of the text is greater than 6, close the modal
      // as it is now clear that user does not want to use the modal.
      // Six is an arbitrary number.
      if (
        filteredData === noMatchingBlocksData &&
        currentText.length > currentTextLength + 6
      ) {
        setOpen(false);
      }

      setData(filteredData);
    }
  }, [open, currentText]);

  return (
    <>
      {coords ? (
        <ScrollerModal
          open={open}
          handleClose={() => setOpen(false)}
          coords={coords}
          clickFunctions={handleToggle}
          data={data}
          type={MODAL_TYPE.NON_MODAL_NON_LIGHTBOX}
        />
      ) : null}
    </>
  );
};

export default React.memo(NotetakingBlocksModal);
