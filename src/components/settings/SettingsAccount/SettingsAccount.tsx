import React from "react";
import { ThemeContext } from "styled-components";
import { usePageSetupHelpers } from "../../../hooks";
import { Box, Divider, H4, Text, Input, Spacer } from "../../common";
import { useIntl } from "react-intl";

interface SettingsAccountProps {}

const SettingsAccount: React.FC<SettingsAccountProps> = () => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers(ThemeContext, intl);

  return (
    <>
      <H4>Account</H4>
      <Divider />
      <Box my={theme.spacers.size32}>
        <Text fontSize={theme.typography.fontSizes.size16}>
          Personal Information
        </Text>
        <Spacer height={theme.spacers.size16} />
        <Input label={formatMessage("forms.names.firstName")}></Input>
        <Spacer height={theme.spacers.size8} />
        <Input label={formatMessage("forms.names.lastName")}></Input>
      </Box>
      <Divider />
      <Box my={theme.spacers.size32}>
        <Text fontSize={theme.typography.fontSizes.size16}>Password</Text>
        <Spacer height={theme.spacers.size16} />
        <Input
          type="password"
          label={formatMessage("forms.password.newPassword")}
        />
        <Spacer height={theme.spacers.size8} />
        <Input
          label={formatMessage("forms.password.repeatPassword")}
          type="password"
        />
        <Spacer height={theme.spacers.size8} />
        <Text fontColor={theme.colors.grey1}>
          {formatMessage("forms.password.length")}
        </Text>
      </Box>
    </>
  );
};

export default SettingsAccount;
