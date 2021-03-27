import React, { useContext } from "react";
import { ToolbarModalData } from "./ToolbarModal.data";
import { ScrollerModal } from "../../common";
import { CoordsProps } from "../../../helpers/positionModals";
import { EditorContext } from "../../../contexts/EditorContext";

interface ToolbarModalProps {
  open: boolean;
  handleClose: () => void;
  coords: CoordsProps;
}

const ToolbarModal: React.FC<ToolbarModalProps> = ({
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
      data={ToolbarModalData}
    />
  );
};

export default ToolbarModal;
