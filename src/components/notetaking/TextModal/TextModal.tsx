import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { TextModalData } from "./TextModal.data";

import { ScrollerModal } from "../../common";
import { positionBlockEditor } from "../Utils/editorUtils";
import { getSelectedBlockNode } from "./TextModal.helpers";
import { MODAL_TYPE, CoordsType } from "../../../shared";

interface TextModalProps {
  onToggle: (style: string) => void;
  editorState: EditorState;
}

const TextModal: React.FC<TextModalProps> = ({ onToggle, editorState }) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<CoordsType>();

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

  const getCurrentBlock = () => {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selectionState.getStartKey());
    return block;
  };

  const currentBlock = getCurrentBlock();

  useEffect(() => {
    updatePosition();
    if (
      currentBlock.getText() === "/" &&
      currentBlock.getType() === "unstyled"
    ) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [currentBlock]);

  const handleToggle = (style: string, e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(style);
  };

  return (
    <>
      {coords ? (
        <ScrollerModal
          open={open}
          handleClose={() => setOpen(false)}
          coords={coords}
          clickFunctions={handleToggle}
          data={TextModalData}
          type={MODAL_TYPE.NON_MODAL_NON_LIGHTBOX}
        />
      ) : null}
    </>
  );
};

export default TextModal;
