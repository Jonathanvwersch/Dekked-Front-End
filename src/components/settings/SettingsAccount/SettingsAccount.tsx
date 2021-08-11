import {
  Box,
  ComponentLoadingSpinner,
  Divider,
  H4,
  Input,
  Spacer,
  Text,
} from "dekked-design-system";
import { useAtom } from "jotai";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useIsFetching } from "react-query";
import { getSessionCookie } from "../../../helpers";
import { usePageSetupHelpers } from "../../../hooks";
import { userAtom } from "../../../store";

interface SettingsAccountProps {
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
}

const SettingsAccount: React.FC<SettingsAccountProps> = ({
  setFirstName,
  setLastName,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const [user] = useAtom(userAtom);
  const isFetchingUser = useIsFetching([`${getSessionCookie()}-user`]);

  return (
    <>
      {!isFetchingUser ? (
        <>
          <H4>
            <FormattedMessage id="settings.account.header" />
          </H4>
          <Divider />
          <Box my={theme.spacers.size32}>
            <Text fontSize={theme.typography.fontSizes.size16}>
              <FormattedMessage id="settings.account.personalInformation" />
            </Text>
            <Spacer height={theme.spacers.size16} />
            <Input
              defaultValue={user?.first_name || ""}
              onChange={(e) => setFirstName(e.target.value)}
              label={formatMessage("forms.names.firstName")}
            />
            <Spacer height={theme.spacers.size8} />
            <Input
              defaultValue={user?.last_name || ""}
              onChange={(e) => setLastName(e.target.value)}
              label={formatMessage("forms.names.lastName")}
            />
          </Box>
        </>
      ) : (
        <ComponentLoadingSpinner height="100%" width="100%" />
      )}
    </>
  );
};

export default SettingsAccount;

/* <Divider />
      <Box my={theme.spacers.size32}>
        <Text fontSize={theme.typography.fontSizes.size16}>
          <FormattedMessage id="forms.password.password" />
        </Text>
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
          <FormattedMessage id="forms.password.length" />
        </Text> */
/* </Box> */
