import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import {
  Flex,
  ShadowCard,
  Spacer,
  Text,
  H1,
  FullLogoIcon,
  Link as DekkedLink,
  SIZES,
} from "dekked-design-system";
import { FormattedMessage } from "react-intl";
import { InternalLink } from "../../common";
import ForgetYourPasswordForm from "./ForgetYourPasswordForm";
import ResetYourPasswordForm from "./ResetYourPasswordForm";

interface ForgetYourPasswordProps {
  isResetPage: boolean;
}

const ForgetYourPassword: React.FC<ForgetYourPasswordProps> = ({
  isResetPage,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Flex
      flexDirection="column"
      mx={theme.spacers.size16}
      my={theme.spacers.size128}
    >
      <FormCard padding={`${theme.spacers.size32} ${theme.spacers.size20}`}>
        <DekkedLink
          href="https://dekked.com"
          textAlign="center"
          style={{
            justifyContent: "center",
            width: "100%",
            display: "flex",
            marginBottom: theme.spacers.size16,
          }}
        >
          <FullLogoIcon height="32px" color={theme.colors.primary} />
        </DekkedLink>
        <H1 styledAs="h4" textAlign="center">
          <FormattedMessage id="forms.forgetYourPassword.resetYourPassword" />
        </H1>
        <Spacer height={theme.spacers.size32} />
        {isResetPage ? (
          <>
            <ResetYourPasswordForm />
          </>
        ) : (
          <ForgetYourPasswordForm />
        )}
      </FormCard>
      <Spacer height={theme.spacers.size16} />
      {!isResetPage && (
        <>
          <Text fontSize={theme.typography.fontSizes.size16}>
            <InternalLink
              to="/login"
              fontSize={theme.typography.fontSizes.size14}
              textDecoration="underline"
            >
              <FormattedMessage id="forms.forgetYourPassword.goBackToLogin" />
            </InternalLink>
          </Text>
          <Spacer height={theme.spacers.size32} />
        </>
      )}
    </Flex>
  );
};

const FormCard = styled(ShadowCard)`
  max-width: ${({ theme }) => theme.sizes.modal[SIZES.LARGE]};
  overflow: unset;
`;

export default ForgetYourPassword;
