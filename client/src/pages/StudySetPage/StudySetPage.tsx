import React from "react";
import MainFrame from "../../components/unique/main-frame/MainFrame";
import Page from "./NoteTaking/Page";
import StudySetHeader from "./StudySetHeader";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  return (
    <MainFrame>
      <StudySetHeader />
      <Page />
    </MainFrame>
  );
};

export default StudySetPage;
