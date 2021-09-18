import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { SignUpForm, LogInForm } from ".";
import { SIZES } from "../../shared";
import {
  Flex,
  ShadowCard,
  Spacer,
  Text,
  H1,
  FullLogoIcon,
  Link as DekkedLink,
} from "dekked-design-system";
import { FormattedMessage } from "react-intl";
import { InternalLink } from "../common";

interface LogInSignUpProps {
  login: boolean;
}

const LogInSignUp: React.FC<LogInSignUpProps> = ({ login }) => {
  const theme = useContext(ThemeContext);
  const header = login ? "forms.logIn.logIn" : "forms.signUp.signUp";
  const linkText = login ? "forms.logIn.noAccount" : "forms.signUp.haveAccount";
  const link = login ? "forms.signUp.signUp" : "forms.logIn.logIn";
  const slug = login ? "/sign-up" : "/login";

  return (
    <Flex
      flexDirection="column"
      px={theme.spacers.size16}
      py={theme.spacers.size64}
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
          <FormattedMessage id={header} />
        </H1>
        <Spacer height={theme.spacers.size32} />
        {login ? <LogInForm /> : <SignUpForm />}
      </FormCard>
      <Spacer height={theme.spacers.size32} />
      <Text fontSize={theme.typography.fontSizes.size16}>
        <FormattedMessage id={linkText} />
        <InternalLink
          to={`${slug}`}
          fontSize={theme.typography.fontSizes.size16}
          textDecoration="underline"
        >
          {" "}
          <FormattedMessage id={link} />
        </InternalLink>
      </Text>
      <Spacer height={theme.spacers.size32} />
    </Flex>
  );
};

const FormCard = styled(ShadowCard)`
  max-width: ${({ theme }) => theme.sizes.modal[SIZES.LARGE]};
  overflow: unset;
`;

export default LogInSignUp;
