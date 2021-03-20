import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Route, Switch } from "react-router-dom";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/common/MainFrame/MainFrame";
import { SIZES } from "../../components/common/Pages/InsetPage";
import {
  FlashcardsContainer,
  StudySetHeader,
  NotesContainer,
} from "../../components/study-set";
import { EditorContextProvider } from "../../contexts/EditorContext";
import { FILETREE_TYPES, TAB_TYPE } from "../../contexts/FileTreeContext";
import { useResize } from "../../hooks/useResize";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [initialWidth, setInitialWidth] = useState(0);
  const { width } = useResize(headerRef);

  // This ref is used to get the initial width of the flashcard as the headerRef is undefined on mount
  const initialRef = useCallback((node) => {
    if (node !== null) {
      setInitialWidth(node.getBoundingClientRect().width - 200);
    }
  }, []);

  return (
    <EditorContextProvider>
      <MainFrame>
        <InsetPage initialRef={initialRef} size={SIZES.SMALL}>
          <StudySetHeader headerRef={headerRef} />
          <Switch>
            <Route
              path={`/${FILETREE_TYPES.STUDY_SET}/:id/${TAB_TYPE.NOTES}`}
              render={() => (
                <NotesContainer flashcardSize={width ? width : initialWidth} />
              )}
            />
            <Route
              path={`/${FILETREE_TYPES.STUDY_SET}/:id/${TAB_TYPE.FLASHCARDS}`}
              component={FlashcardsContainer}
            />
          </Switch>
        </InsetPage>
      </MainFrame>
    </EditorContextProvider>
  );
};

export default StudySetPage;
