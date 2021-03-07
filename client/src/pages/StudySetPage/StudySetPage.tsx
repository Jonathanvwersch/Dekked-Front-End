import React from "react";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/unique/main-frame/MainFrame";
import { FILETREE_TYPES } from "../../contexts/FileTreeContext";
import StudySetHeader from "./StudySetHeader";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  return (
    <MainFrame>
      <InsetPage type={FILETREE_TYPES.STUDY_SET}>
        <StudySetHeader />
      </InsetPage>
    </MainFrame>
  );
};

export default StudySetPage;
