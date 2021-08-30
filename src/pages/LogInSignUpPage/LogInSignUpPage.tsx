import React from "react";
import { LogInSignUp } from "../../components/login-signup";

interface LogInPageProps {
  login: boolean;
}

const LogInPage: React.FC<LogInPageProps> = ({ login }) => {
  return <LogInSignUp login={login} />;
};

// const StyledLink = styled.a`
//   padding: ${({ theme }) => theme.spacers.size32};
//   position: absolute;
// `;

export default LogInPage;
