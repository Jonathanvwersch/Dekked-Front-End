import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { SignUpForm, LogInForm } from ".";
import { Spacer, VFlex, ShadowCard, H2, Text } from "../../components/common";
import { SIZES } from "../../shared";

interface LogInSignUpProps {
  login: boolean;
}

const LogInSignUp: React.FC<LogInSignUpProps> = ({ login }) => {
  const theme = useContext(ThemeContext);
  const header = login ? "Welcome back to Dekked" : "Get started with Dekked";
  const linkText = login
    ? "Don't have an account yet?"
    : "Already have an account?";
  const link = login ? "/sign-up" : "/login";

  return (
    <VFlex>
      <VFlex>
        <H2>{header}</H2>
        <Text fontSize={theme.typography.fontSizes.size20}>
          The most efficient way to learn anything
        </Text>
      </VFlex>
      <Spacer height={theme.spacers.size32} />
      <ShadowCard
        width={theme.sizes.modal[SIZES.LARGE]}
        padding={`${theme.spacers.size48} ${theme.spacers.size48}`}
      >
        {login ? <LogInForm /> : <SignUpForm />}
      </ShadowCard>
      <Spacer height={theme.spacers.size32} />
      <Text fontSize={theme.typography.fontSizes.size16}>
        {linkText}
        <StyledLink to={`${link}`}> Sign up here</StyledLink>
      </Text>
    </VFlex>
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
