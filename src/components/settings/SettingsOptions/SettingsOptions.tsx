import React, { SyntheticEvent, useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ThemeContext } from "styled-components";
import { SettingsAccount, SettingsAppearance } from "..";
import { UserContext } from "../../../contexts";
import { updateUser } from "../../../services/authentication/updateUser";
import { BUTTON_TYPES, SIZES } from "../../../shared";
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
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { mutate: updateUserData } = useMutation(user.id, updateUser, {
    onSuccess: (data) => {
      queryClient.setQueryData([user.id], data.json);
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
