import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import {
  noMatchingBlocksData,
  NoteTakingBlocksData,
} from "./NotetakingBlocks.data";

import { ScrollerModal } from "../../common";
import { getCurrentBlock, positionBlockEditor } from "../Editor/Editor.helpers";
import { getSelectedBlockNode } from "./NotetakingBlocksModal.helpers";
import { MODAL_TYPE, CoordsType, BLOCK_TYPES } from "../../../shared";
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
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(NoteTakingBlocksData);
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
    if (
      currentBlock.getText()[0] === "/" &&
      currentBlock.getType() === "unstyled"
    ) {
      updatePosition();
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [currentBlock]);

  const filterData = () => {
    let filteredData = NoteTakingBlocksData;
    if (open) {
      // Filter data of modal based on what user types
      filteredData = NoteTakingBlocksData.filter((item) => {
        const label = formatMessage(item.label, intl).toLowerCase();
        return label.includes(currentText);
      });

      // Show special no results block in modal,
      // if current text does not match any blocks
      if (filteredData.length === 0 && filteredData !== NoteTakingBlocksData) {
        filteredData = noMatchingBlocksData;
      }
      // if the data is only made up of the special no matchin block
      // and the length of the text is greater than 6, close the modal
      // as it is now clear that user does not want to use the modal
      if (filteredData === noMatchingBlocksData && currentText.length > 6) {
        setOpen(false);
      }
    }
    return filteredData;
  };

  return (
    <>
      {coords ? (
        <ScrollerModal
          open={open}
          handleClose={() => setOpen(false)}
          coords={coords}
          clickFunctions={handleToggle}
          data={filterData()}
          type={MODAL_TYPE.NON_MODAL_NON_LIGHTBOX}
        />
      ) : null}
    </>
  );
};

export default React.memo(NotetakingBlocksModal);
