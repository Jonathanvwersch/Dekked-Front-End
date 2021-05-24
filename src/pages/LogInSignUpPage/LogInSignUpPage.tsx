import React, { useContext } from "react";
import styled from "styled-components/macro";
import { ThemeContext } from "styled-components/macro";
import FullLogoIcon from "../../assets/icons/FullLogoIcon";
import { Card, Flex } from "../../components/common";
import { ThemeType } from "../../styles/theme";
import { LogInSignUp } from "../../components/login-signup";

interface LogInPageProps {
  login: boolean;
}

const LogInPage: React.FC<LogInPageProps> = ({ login }) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <Card backgroundColor={theme.colors.secondary}>
      <StyledLink href="https://www.dekked.com">
        <FullLogoIcon color={theme.colors.primary} />
      </StyledLink>
      <Flex width="100%" height="100%" justifyContent="center">
        <LogInSignUp login={login} />
      </Flex>
    </Card>
  );
};

const StyledLink = styled.a`
  position: absolute;
  left: ${({ theme }) => theme.spacers.size32};
  top: ${({ theme }) => theme.spacers.size32};
`;

export default LogInPage;
