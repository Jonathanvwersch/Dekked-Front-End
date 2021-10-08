import React, { useEffect } from "react";
import { ScrollerModal } from "../../common";
import {
  OPEN_SETTINGS_DATA,
  OpenSettingsModalData,
} from "./OpenSettingsModal.data";
import { CoordsType } from "../../../shared";
import { MainSettingsModal } from "..";
import { queryClient } from "../../..";
import { useMutation } from "react-query";
import { logout } from "../../../api";
import { FullPageLoadingSpinner } from "dekked-design-system";
import { useHistory } from "react-router-dom";
import { removeCookie } from "../../../helpers";

interface OpenSettingsModalProps {
  open: boolean;
  handleClose: () => void;
  coords?: CoordsType;
  setOpenMainSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  openMainSettingsModal: boolean;
}

const OpenSettingsModal: React.FC<OpenSettingsModalProps> = ({
  handleClose,
  open,
  coords,
  openMainSettingsModal,
  setOpenMainSettingsModal,
}) => {
  const { mutate: logoutApp, isLoading, data } = useMutation("log-out", logout);
  const history = useHistory();

  const clickFunctions = (option: OPEN_SETTINGS_DATA) => {
    handleClose();
    if (option === OPEN_SETTINGS_DATA.SETTINGS) {
      setOpenMainSettingsModal(true);
    }
    if (option === OPEN_SETTINGS_DATA.LOGOUT) {
      queryClient.clear();
      queryClient.removeQueries();
      removeCookie();
      logoutApp();
    }
  };

  useEffect(() => {
    if (data?.success) history.push("/logout");
  }, [data, history]);

  return (
    <>
      {isLoading ? (
        <FullPageLoadingSpinner />
      ) : (
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
      )}
    </>
  );
};

export default OpenSettingsModal;
