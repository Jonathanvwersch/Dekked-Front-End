import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "styled-components";
import FullLogoIcon from "../../assets/icons/FullLogoIcon";
import { Card, HFlex } from "../../components/common";
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
      <HFlex width="100%" height="100%" justifyContent="center">
        <LogInSignUp login={login} />
      </HFlex>
    </Card>
  );
};

const StyledLink = styled.a`
  position: absolute;
  left: 32px;
  top: 32px;
`;

export default LogInPage;
