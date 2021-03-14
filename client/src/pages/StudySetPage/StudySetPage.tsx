import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/common/MainFrame/MainFrame";
import {
  FlashcardsContainer,
  StudySetHeader,
  NotesContainer,
} from "../../components/study-set";
import { FILETREE_TYPES, TAB_TYPE } from "../../contexts/FileTreeContext";
import { useResize } from "../../hooks/useResize";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  const { tab } = useParams<{ tab: TAB_TYPE }>();
  const studySetPageRef = useRef<HTMLDivElement>(null);
  const { width } = useResize(studySetPageRef);

  return (
    <MainFrame>
      <InsetPage pageRef={studySetPageRef} type={FILETREE_TYPES.STUDY_SET}>
        <StudySetHeader />
        {tab === TAB_TYPE.NOTES ? (
          <NotesContainer flashcardSize={width ? width - 200 : 1000} />
        ) : (
          <FlashcardsContainer />
        )}
      </InsetPage>
    </MainFrame>
  );
};

export default StudySetPage;
