import React from "react";
import styled from "styled-components";
import { H1 } from "../../components/common";

const PageHeader: React.FC = ({ children }) => {
  return (
    <StyledH1
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onPaste={(e) => {
        e.preventDefault();
        return false;
      }}
      contentEditable={true}
      spellCheck={false}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      {children}
    </StyledH1>
  );
};

const StyledH1 = styled(H1)`
  width: 100%;
`;

export default PageHeader;
