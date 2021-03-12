import React from "react";
import { useParams } from "react-router-dom";
import { InsetPage } from "../../common";
import MainFrame from "../../common/MainFrame/MainFrame";
import { FILETREE_TYPES, TAB_TYPE } from "../../contexts/FileTreeContext";
import StudySetFlashcards from "./StudySetFlashcards";
import StudySetHeader from "./StudySetHeader";
import StudySetNotes from "./StudySetNotes";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  const { tab } = useParams<{ tab: TAB_TYPE }>();

  return (
    <MainFrame>
      <InsetPage type={FILETREE_TYPES.STUDY_SET}>
        <StudySetHeader />
        {tab === TAB_TYPE.NOTES ? <StudySetNotes /> : <StudySetFlashcards />}
      </InsetPage>
    </MainFrame>
  );
};

export default StudySetPage;
