import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { Params } from "../../../shared";
import { StudyQueueContainer } from "../../shared";

const Page: React.FC = ({ children }) => {
  const { studyModes } = useParams<Params>();

  return (
    <StyledPage>
      {/* hide study queue on study mode page */}
      {!studyModes ? <StudyQueueContainer /> : null}
      {children}
    </StyledPage>
  );
};

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  overflow: auto;
`;

export default Page;
