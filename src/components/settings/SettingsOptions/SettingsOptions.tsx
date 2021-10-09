import { useAtom } from "jotai";
import React, { SyntheticEvent, useContext, useState } from "react";
import { useMutation } from "react-query";
import { ThemeContext } from "styled-components";
import { SettingsAccount, SettingsAppearance } from "..";
import { getSessionCookie } from "../../../helpers";
import { updateUser } from "../../../api";
import { BUTTON_TYPES, SIZES } from "../../../shared";
import { userAtom } from "../../../store";
import { SETTINGS_SIDEBAR_DATA } from "../SettingsSidebar/SettingSidebar.data";
import { Box } from "dekked-design-system";
import { Footer } from "../../common";
import { queryClient } from "../../..";

interface SettingsOptionsProps {
  activeSetting: SETTINGS_SIDEBAR_DATA;
  handleCloseModal: () => void;
}

const SettingsOptions: React.FC<SettingsOptionsProps> = ({
  activeSetting,
  handleCloseModal,
}) => {
  const theme = useContext(ThemeContext);
  const [user] = useAtom(userAtom);

  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);

  const { mutate: updateUserData } = useMutation("update-user", updateUser, {
    onSuccess: (data) => {
      queryClient.setQueryData([`${getSessionCookie()}-user`], data);
    },
  });

  const handleAccountSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleCloseModal();

    updateUserData({
      first_name: firstName,
      last_name: lastName,
    });
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
