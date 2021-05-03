import React, { useContext } from "react";
import { ScrollerModal } from "../../common";
import { EditorContext } from "../../../contexts/EditorContext";
import { BLOCK_TYPES, CoordsType } from "../../../shared";
import { ConvertToBlockData } from "../../notetaking/TextModal/NotetakingBlocks.data";

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
  const { toggleBlockType } = useContext(EditorContext);
  const clickFunctions = (type: BLOCK_TYPES) => {
    handleClose();
    toggleBlockType(type);
  };

  return (
    <ScrollerModal
      coords={coords}
      clickFunctions={clickFunctions}
      open={open}
      handleClose={handleClose}
      data={ConvertToBlockData}
      fullHeight={true}
    />
  );
};

export default StudySetToolbarModal;
