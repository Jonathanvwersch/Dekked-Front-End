import React, { useState } from "react";
import { ScrollerModal } from "../../common";
import {
  OPEN_SETTINGS_DATA,
  OpenSettingsModalData,
} from "./OpenSettingsModal.data";
import { CoordsType } from "../../../shared";
import { MainSettingsModal } from "..";
import { useHistory } from "react-router-dom";

interface OpenSettingsModalProps {
  open: boolean;
  handleClose: () => void;
  coords?: CoordsType;
}

const OpenSettingsModal: React.FC<OpenSettingsModalProps> = ({
  handleClose,
  open,
  coords,
}) => {
  const [openMainSettingsModal, setOpenMainSettingsModal] =
    useState<boolean>(false);

  const history = useHistory();

  const clickFunctions = (option: OPEN_SETTINGS_DATA) => {
    handleClose();
    if (option === OPEN_SETTINGS_DATA.SETTINGS) {
      setOpenMainSettingsModal(true);
    }
    if (option === OPEN_SETTINGS_DATA.LOGOUT) {
      history.push("/logout");
    }
  };

  return (
    <>
      <ScrollerModal
        coords={coords}
        clickFunctions={clickFunctions}
        open={open}
        handleClose={handleClose}
        data={OpenSettingsModalData}
      />
      <MainSettingsModal
        handleCloseModal={() => setOpenMainSettingsModal(false)}
        openModal={openMainSettingsModal}
      />
    </>
  );
};

export default OpenSettingsModal;
