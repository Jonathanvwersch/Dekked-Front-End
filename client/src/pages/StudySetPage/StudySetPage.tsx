import React from "react";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/unique/main-frame/MainFrame";
import StudySetHeader from "./StudySetHeader";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  return (
    <MainFrame>
      <InsetPage>
        <StudySetHeader />
      </InsetPage>
    </MainFrame>
  );
};

export default StudySetPage;
