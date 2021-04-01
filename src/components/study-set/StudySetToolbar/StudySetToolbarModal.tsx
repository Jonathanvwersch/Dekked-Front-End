import React, { useContext } from "react";
import { StudySetToolbarModalData } from "./StudySetToolbarModal.data";
import { ScrollerModal } from "../../common";
import { CoordsProps } from "../../../helpers/positionModals";
import { EditorContext } from "../../../contexts/EditorContext";

interface StudySetToolbarModalProps {
  open: boolean;
  handleClose: () => void;
  coords: CoordsProps;
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
