import React from "react";
import { BlockOptions } from "./BlockOptionsModal.data";
import { ScrollerModal } from "../../common";
import { CoordsProps } from "../../../helpers/positionModals";

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
  const clickFunctions = (type: string) => {};

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
