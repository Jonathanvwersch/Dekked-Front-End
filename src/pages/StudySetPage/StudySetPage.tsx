import React, { useCallback, useRef, useState } from "react";
import { Route } from "react-router-dom";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/common/MainFrame/MainFrame";
import {
  StudySetFlashcardsContainer,
  StudySetHeader,
  StudySetNotesContainer,
} from "../../components/study-set";
import { EditorContextProvider } from "../../contexts/EditorContext";
import { TextAlignmentsContextProvider } from "../../contexts/TextAlignmentsContext";
import { useResize } from "../../hooks/useResize";
import CustomSwitch from "../../Router/CustomSwitch";
import { FILETREE_TYPES, SIZES, TAB_TYPE } from "../../shared";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [initialWidth, setInitialWidth] = useState(0);
  const { dimensions, position } = useResize(headerRef);

  // This ref is used to get the initial width of the flashcard as the headerRef is undefined on mount
  const initialRef = useCallback((node) => {
    if (node !== null) {
      setInitialWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <EditorContextProvider>
      <MainFrame>
        <InsetPage size={SIZES.SMALL}>
          <TextAlignmentsContextProvider>
            <StudySetHeader headerRef={headerRef} />
            <CustomSwitch>
              <Route
                path={`/${FILETREE_TYPES.STUDY_SET}/:id/${TAB_TYPE.NOTES}`}
                render={() => (
                  <StudySetNotesContainer
                    notesRef={initialRef}
                    flashcardSize={
                      dimensions.width ? dimensions.width : initialWidth
                    }
                    flashcardPosition={position.left && position.left}
                  />
                )}
              />
              <Route
                path={`/${FILETREE_TYPES.STUDY_SET}/:id/${TAB_TYPE.FLASHCARDS}`}
                component={StudySetFlashcardsContainer}
              />
            </CustomSwitch>
          </TextAlignmentsContextProvider>
        </InsetPage>
      </MainFrame>
    </EditorContextProvider>
  );
};

export default StudySetPage;
