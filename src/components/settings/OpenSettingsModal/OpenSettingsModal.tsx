import React, { useContext, useState } from "react";
import { ScrollerModal } from "../../common";
import {
  OPEN_SETTINGS_DATA,
  OpenSettingsModalData,
} from "./OpenSettingsModal.data";
import { CoordsType } from "../../../shared";
import { MainSettingsModal } from "..";
import { useHistory } from "react-router-dom";
import { removeCookie } from "../../../helpers";
import { UserContext } from "../../../contexts";

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
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const clickFunctions = (option: OPEN_SETTINGS_DATA) => {
    handleClose();
    if (option === OPEN_SETTINGS_DATA.SETTINGS) {
      setOpenMainSettingsModal(true);
    }
    if (option === OPEN_SETTINGS_DATA.LOGOUT) {
      removeCookie();
      setUser({ firstName: "", lastName: "", id: "", emailAddress: "" });
      history.push("/login");
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
