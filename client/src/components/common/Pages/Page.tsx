import React from "react";
import styled from "styled-components";

const Page: React.FC = ({ children }) => {
  return <StyledPage>{children}</StyledPage>;
};

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  overflow: auto;
  background: ${({ theme }) => theme.colors.backgrounds.pageBackground};
`;

export default Page;
