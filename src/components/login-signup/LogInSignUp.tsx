import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SignUpForm, LogInForm } from ".";
import { SIZES } from "../../shared";
import { usePageSetupHelpers } from "../../hooks";
import { Flex, H1, ShadowCard, Spacer, Text } from "dekked-design-system";

interface LogInSignUpProps {
  login: boolean;
}

const LogInSignUp: React.FC<LogInSignUpProps> = ({ login }) => {
  const { theme, formatMessage } = usePageSetupHelpers();
  // const header = login ? "forms.logIn.header" : "forms.signUp.header";
  const linkText = login ? "forms.logIn.noAccount" : "forms.signUp.haveAccount";
  const link = login ? "forms.signUp.signUp" : "forms.logIn.logIn";
  const slug = login ? "/sign-up" : "/login";

  return (
    <Flex flexDirection="column" px={theme.spacers.size16}>
      <Spacer height={theme.spacers.size20} />
      <FormCard padding={`${theme.spacers.size32} ${theme.spacers.size20}`}>
        {login ? <LogInForm /> : <SignUpForm />}
      </FormCard>
      <Spacer height={theme.spacers.size32} />
      <Text fontSize={theme.typography.fontSizes.size16}>
        {formatMessage(linkText)}
        <StyledLink to={`${slug}`}> {formatMessage(link)}</StyledLink>
      </Text>
      <Spacer height={theme.spacers.size32} />
    </Flex>
  );
};

const FormCard = styled(ShadowCard)`
  max-width: ${({ theme }) => theme.sizes.modal[SIZES.LARGE]};
  margin-top: ${({ theme }) => theme.spacers.size128};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  &:hover {
    filter: ${({ theme }) => theme.colors.hover.filter};
    text-decoration: underline;
  }
  &:active {
    color: ${({ theme }) => theme.colors.active.filter};
  }
`;

export default LogInSignUp;
