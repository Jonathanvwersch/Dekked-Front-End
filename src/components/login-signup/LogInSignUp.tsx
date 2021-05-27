import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SignUpForm, LogInForm } from ".";
import { Spacer, Flex, ShadowCard, H2, Text } from "../../components/common";
import { SIZES } from "../../shared";
import { usePageSetupHelpers } from "../../hooks";

interface LogInSignUpProps {
  login: boolean;
}

const LogInSignUp: React.FC<LogInSignUpProps> = ({ login }) => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const header = login ? "forms.logIn.header" : "forms.signUp.header";
  const subHeader = login ? "forms.logIn.subHeader" : "forms.signUp.subHeader";
  const linkText = login ? "forms.logIn.noAccount" : "forms.signUp.haveAccount";
  const link = login ? "forms.signUp.signUp" : "forms.logIn.logIn";
  const slug = login ? "/sign-up" : "/login";

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <H2> {formatMessage(header)}</H2>
        <Text fontSize={theme.typography.fontSizes.size20}>
          {formatMessage(subHeader)}
        </Text>
      </Flex>
      <Spacer height={theme.spacers.size32} />
      <ShadowCard
        width={theme.sizes.modal[SIZES.LARGE]}
        padding={`${theme.spacers.size48} ${theme.spacers.size48}`}
      >
        {login ? <LogInForm /> : <SignUpForm />}
      </ShadowCard>
      <Spacer height={theme.spacers.size32} />
      <Text fontSize={theme.typography.fontSizes.size16}>
        {formatMessage(linkText)}
        <StyledLink to={`${slug}`}> {formatMessage(link)}</StyledLink>
      </Text>
    </Flex>
  );
};

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  &:hover {
    filter: ${({ theme }) => theme.colors.hover.filter};
  }
  &:active {
    color: ${({ theme }) => theme.colors.active.filter};
  }
`;

export default LogInSignUp;
