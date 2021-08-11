import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "styled-components";
import { FullLogoIcon, Card, Flex, ThemeType } from "dekked-design-system";
import { LogInSignUp } from "../../components/login-signup";

interface LogInPageProps {
  login: boolean;
}

const LogInPage: React.FC<LogInPageProps> = ({ login }) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <Card backgroundColor={theme.colors.secondary} borderRadius="0px">
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
