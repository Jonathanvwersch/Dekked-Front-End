import React, { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { AuthenticationContext } from "../../../contexts";
import { usePageSetupHelpers } from "../../../hooks";
import { getUser } from "../../../services/authentication/getUser";
import { UserType } from "../../../shared";
import {
  Box,
  Divider,
  H4,
  Text,
  Input,
  Spacer,
  ComponentLoadingSpinner,
} from "../../common";

interface SettingsAccountProps {
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
}

const SettingsAccount: React.FC<SettingsAccountProps> = ({
  setFirstName,
  setLastName,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const { user } = useContext(AuthenticationContext);
  const { data, isLoading } = useQuery<UserType>(user.id, getUser, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    setFirstName(data?.first_name || "");
    setLastName(data?.last_name || "");
  }, [data, setFirstName, setLastName]);

  return (
    <>
      {!isLoading ? (
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
              defaultValue={data?.first_name || ""}
              onChange={(e) => setFirstName(e.target.value)}
              label={formatMessage("forms.names.firstName")}
            />
            <Spacer height={theme.spacers.size8} />
            <Input
              defaultValue={data?.last_name || ""}
              onChange={(e) => setLastName(e.target.value)}
              label={formatMessage("forms.names.lastName")}
            />
          </Box>
        </>
      ) : (
        <ComponentLoadingSpinner />
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
