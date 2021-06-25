import { useAtom } from "jotai";
import React, { SyntheticEvent, useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ThemeContext } from "styled-components";
import { SettingsAccount, SettingsAppearance } from "..";
import { getSessionCookie } from "../../../helpers";
import { updateUser } from "../../../services/authentication/updateUser";
import { BUTTON_TYPES, SIZES } from "../../../shared";
import { userAtom } from "../../../store";
import { Box, Footer } from "../../common";
import { SETTINGS_SIDEBAR_DATA } from "../SettingsSidebar/SettingSidebar.data";

interface SettingsOptionsProps {
  activeSetting: SETTINGS_SIDEBAR_DATA;
  handleCloseModal: () => void;
}

const SettingsOptions: React.FC<SettingsOptionsProps> = ({
  activeSetting,
  handleCloseModal,
}) => {
  const theme = useContext(ThemeContext);
  const queryClient = useQueryClient();
  const [user] = useAtom(userAtom);

  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);

  const { mutate: updateUserData } = useMutation("update-user", updateUser, {
    onSuccess: (data) => {
      queryClient.setQueryData([`${getSessionCookie()}-user`], data.json);
    },
  });

  const handleAccountSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    updateUserData({
      first_name: firstName,
      last_name: lastName,
    });
    handleCloseModal();
  };

  return (
    <form
      onSubmit={handleAccountSubmit}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Box
        px={theme.spacers.size64}
        pt={theme.spacers.size32}
        width="100%"
        height="100%"
      >
        {activeSetting === SETTINGS_SIDEBAR_DATA.ACCOUNT ? (
          <SettingsAccount
            setFirstName={setFirstName}
            setLastName={setLastName}
          />
        ) : null}
        {activeSetting === SETTINGS_SIDEBAR_DATA.APPEARANCE ? (
          <SettingsAppearance />
        ) : null}
      </Box>
      {activeSetting === SETTINGS_SIDEBAR_DATA.ACCOUNT ? (
        <Footer
          padding={`${theme.spacers.size16} ${theme.spacers.size64}`}
          secondaryButton={{ onClick: handleCloseModal }}
          primaryButton={{
            text: "generics.saveChanges",
            buttonType: BUTTON_TYPES.SUBMIT,
          }}
          alignment="flex-start"
          divider
          buttonSize={SIZES.MEDIUM}
        />
      ) : null}
    </form>
  );
};

export default SettingsOptions;
