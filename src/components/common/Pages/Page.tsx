import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Params, STUDY_MODE_TYPES } from "../../../shared";
import { StudyQueueContainer } from "../../shared";

const Page: React.FC = ({ children }) => {
  const { studyModes } = useParams<Params>();

  return (
    <StyledPage studyMode={studyModes} id="Page">
      {children}
      {/* hide study queue on study mode page */}
      {!studyModes ? <StudyQueueContainer /> : null}
    </StyledPage>
  );
};

const StyledPage = styled.div<{ studyMode: STUDY_MODE_TYPES }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ studyMode }) => studyMode && "center"};
  flex-grow: 1;
  align-items: center;
  overflow: auto;
`;

export default Page;
