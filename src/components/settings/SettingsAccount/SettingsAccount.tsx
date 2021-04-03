import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Box, Divider, H4, Text, Input, Spacer } from "../../common";

interface SettingsAccountProps {
  handleCloseModal: () => void;
}

const SettingsAccount: React.FC<SettingsAccountProps> = ({
  handleCloseModal,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <H4>Account</H4>
      <Divider />
      <Box my={theme.spacers.size32}>
        <Text fontSize={theme.typography.fontSizes.size16}>
          Personal Information
        </Text>
        <Spacer height={theme.spacers.size16} />
        <Input label="First name"></Input>
        <Spacer height={theme.spacers.size8} />
        <Input label="Last name"></Input>
      </Box>
      <Divider />
      <Box my={theme.spacers.size32}>
        <Text fontSize={theme.typography.fontSizes.size16}>Password</Text>
        <Spacer height={theme.spacers.size16} />
        <Input type="password" label="New password" />
        <Spacer height={theme.spacers.size8} />
        <Input label="Repeat new password" type="password" />
        <Spacer height={theme.spacers.size8} />
        <Text fontColor={theme.colors.grey1}>
          Your password must be atleast eight characters long.
        </Text>
      </Box>
      <Divider />
    </>
  );
};

export default SettingsAccount;
