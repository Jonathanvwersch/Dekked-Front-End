import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { InsetPage } from "../../common";
import MainFrame from "../../common/MainFrame/MainFrame";
import { FILETREE_TYPES, TAB_TYPE } from "../../contexts/FileTreeContext";
import { useResize } from "../../hooks/useResize";
import StudySetFlashcards from "./StudySetFlashcards";
import StudySetHeader from "./StudySetHeader";
import StudySetNotes from "./StudySetNotes";

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
          <StudySetNotes flashcardSize={width ? width - 200 : 1000} />
        ) : (
          <StudySetFlashcards />
        )}
      </InsetPage>
    </MainFrame>
  );
};

export default StudySetPage;
