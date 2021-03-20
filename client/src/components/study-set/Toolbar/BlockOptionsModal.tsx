import React, { useContext } from "react";
import { BlockOptions } from "./BlockOptionsModal.data";
import { ScrollerModal } from "../../common";
import { CoordsProps } from "../../../helpers/positionModals";
import { EditorContext } from "../../../contexts/EditorContext";

interface BlockOptionsModalProps {
  open: boolean;
  handleClose: () => void;
  coords: CoordsProps;
}

const BlockOptionsModal: React.FC<BlockOptionsModalProps> = ({
  handleClose,
  open,
  coords,
}) => {
  const { toggleBlockStyle } = useContext(EditorContext);
  const clickFunctions = (type: string) => {
    toggleBlockStyle(type);
  };

  return (
    <ScrollerModal
      coords={coords}
      clickFunctions={clickFunctions}
      open={open}
      handleClose={handleClose}
      data={BlockOptions}
    />
  );
};

export default BlockOptionsModal;
