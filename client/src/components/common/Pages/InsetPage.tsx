import React from "react";
import styled from "styled-components";
import { FILETREE_TYPES } from "../../../contexts/FileTreeContext";

interface InsetPageProps {
  type?: FILETREE_TYPES;
}

const InsetPage: React.FC<InsetPageProps> = ({ children, type }) => {
  return type === FILETREE_TYPES.STUDY_SET ? (
    <StudySetPage>{children}</StudySetPage>
  ) : (
    <GeneralPage>{children}</GeneralPage>
  );
};

const StudySetPage = styled.div`
  padding-left: calc(100px + env(safe-area-inset-left));
  padding-right: calc(100px + env(safe-area-inset-right));
  width: 100%;
  flex-grow: 1;
  max-width: 1200px;
  margin-bottom: 100px;
`;

const GeneralPage = styled.div`
  padding-left: calc(100px + env(safe-area-inset-left));
  padding-right: calc(100px + env(safe-area-inset-right));
  width: 100%;
  flex-grow: 1;
  max-width: 1400px;
  margin-bottom: 100px;
`;

export default InsetPage;
