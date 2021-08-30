import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "styled-components";
import { FullLogoIcon, Flex, ThemeType } from "dekked-design-system";
import { LogInSignUp } from "../../components/login-signup";

interface LogInPageProps {
  login: boolean;
}

const LogInPage: React.FC<LogInPageProps> = ({ login }) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <Flex
      style={{ backgroundColor: theme.colors.secondary }}
      flexDirection="column"
    >
      {/* <StyledLink href="https://www.dekked.com">
        <FullLogoIcon color={theme.colors.primary} height="30px" />
      </StyledLink> */}
      <Flex width="100%" height="100%" justifyContent="center">
        <LogInSignUp login={login} />
      </Flex>
    </Flex>
  );
};

const StyledLink = styled.a`
  padding: ${({ theme }) => theme.spacers.size32};
  position: absolute;
`;

export default LogInPage;
