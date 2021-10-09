import React from "react";
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
import { useAtom } from "jotai";
import { fileTreeAtom } from "../../../store";

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
  const { mutate: logoutApp, isLoading } = useMutation("log-out", logout, {
    onSuccess: () => history.push("/"),
  });
  const history = useHistory();
  const [, setFileTree] = useAtom(fileTreeAtom);

  const clickFunctions = (option: OPEN_SETTINGS_DATA) => {
    handleClose();
    if (option === OPEN_SETTINGS_DATA.SETTINGS) {
      setOpenMainSettingsModal(true);
    }
    if (option === OPEN_SETTINGS_DATA.LOGOUT) {
      queryClient.clear();
      queryClient.removeQueries();
      setFileTree(undefined);
      removeCookie();
      logoutApp();
    }
  };

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
