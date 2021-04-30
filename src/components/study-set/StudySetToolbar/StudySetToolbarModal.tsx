import React, { useContext, useRef } from "react";
import { ScrollerModal } from "../../common";
import { EditorContext } from "../../../contexts/EditorContext";
import { BLOCK_TYPES, CoordsType } from "../../../shared";
import { NoteTakingBlocksData } from "../../notetaking/TextModal/NotetakingBlocks.data";
import { useOutsideClickListener } from "../../../hooks";

interface StudySetToolbarModalProps {
  open: boolean;
  handleClose: () => void;
  coords?: CoordsType;
}

const StudySetToolbarModal: React.FC<StudySetToolbarModalProps> = ({
  handleClose,
  open,
  coords,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { toggleBlockType } = useContext(EditorContext);
  const clickFunctions = (type: BLOCK_TYPES) => {
    handleClose();
    toggleBlockType(type);
  };

  useOutsideClickListener(cardRef, handleClose, open);

  return (
    <ScrollerModal
      cardRef={cardRef}
      coords={coords}
      clickFunctions={clickFunctions}
      open={open}
      withOverlay={false}
      handleClose={handleClose}
      data={NoteTakingBlocksData}
    />
  );
};

export default StudySetToolbarModal;
