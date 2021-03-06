import React from "react";
import MainFrame from "../../components/unique/main-frame/MainFrame";
import StudySetHeader from "./StudySetHeader";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  return (
    <MainFrame>
      <StudySetHeader />
    </MainFrame>
  );
};

export default StudySetPage;
