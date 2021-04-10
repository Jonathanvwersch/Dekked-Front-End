import React, { useContext } from "react";
import { StudySetToolbarModalData } from "./StudySetToolbarModal.data";
import { ScrollerModal } from "../../common";
import { EditorContext } from "../../../contexts/EditorContext";
import { CoordsType } from "../../../shared";

interface StudySetToolbarModalProps {
  open: boolean;
  handleClose: () => void;
  coords: CoordsType;
}

const StudySetToolbarModal: React.FC<StudySetToolbarModalProps> = ({
  handleClose,
  open,
  coords,
}) => {
  const { toggleBlockStyle } = useContext(EditorContext);
  const clickFunctions = (type: string) => {
    handleClose();
    toggleBlockStyle(type);
  };

  return (
    <ScrollerModal
      coords={coords}
      clickFunctions={clickFunctions}
      open={open}
      handleClose={handleClose}
      data={StudySetToolbarModalData}
    />
  );
};

export default StudySetToolbarModal;
