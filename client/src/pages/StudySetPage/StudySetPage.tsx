import React, { useRef } from "react";
import { Route, Switch } from "react-router-dom";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/common/MainFrame/MainFrame";
import { SIZES } from "../../components/common/Pages/InsetPage";
import {
  FlashcardsContainer,
  StudySetHeader,
  NotesContainer,
} from "../../components/study-set";
import { FILETREE_TYPES, TAB_TYPE } from "../../contexts/FileTreeContext";
import { useResize } from "../../hooks/useResize";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  const studySetPageRef = useRef<HTMLDivElement>(null);
  const { width } = useResize(studySetPageRef);

  return (
    <MainFrame>
      <InsetPage pageRef={studySetPageRef} size={SIZES.SMALL}>
        <StudySetHeader />
        <Switch>
          <Route
            path={`/${FILETREE_TYPES.STUDY_SET}/:id/${TAB_TYPE.NOTES}`}
            render={() => (
              <NotesContainer
                flashcardSize={
                  width
                    ? width - 200
                    : studySetPageRef.current?.clientWidth! - 200
                }
              />
            )}
          />
          <Route
            path={`/${FILETREE_TYPES.STUDY_SET}/:id/${TAB_TYPE.FLASHCARDS}`}
            component={FlashcardsContainer}
          />
        </Switch>
      </InsetPage>
    </MainFrame>
  );
};

export default StudySetPage;
