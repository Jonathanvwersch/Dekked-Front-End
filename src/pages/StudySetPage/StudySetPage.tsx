import { EditorState } from "draft-js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Route, useParams } from "react-router-dom";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/common/MainFrame/MainFrame";
import {
  StudySetFlashcardsContainer,
  StudySetHeader,
  StudySetNotesContainer,
} from "../../components/study-set";
import { CurrentBlockContextProvider } from "../../contexts/CurrentBlockContext";
import { FlashcardsContextProvider } from "../../contexts/FlashcardsContext";
import { SavingEditorContextProvider } from "../../contexts/SavingEditorContext";
import { useResize } from "../../hooks/useResize";
import CustomSwitch from "../../Router/CustomSwitch";
import { FILETREE_TYPES, Params, SIZES, TAB_TYPE } from "../../shared";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [initialWidth, setInitialWidth] = useState(0);
  const [pageEditorState, setPageEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const { dimensions, position } = useResize(headerRef);

  // This ref is used to get the initial width of the flashcard as the headerRef is undefined on mount
  const initialRef = useCallback((node) => {
    if (node !== null) {
      setInitialWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const { id } = useParams<Params>();

  useEffect(() => {
    localStorage.removeItem("page-editor");
  }, []);

  return (
    <CurrentBlockContextProvider>
      <SavingEditorContextProvider>
        <FlashcardsContextProvider>
          <MainFrame>
            <InsetPage size={SIZES.SMALL}>
              <StudySetHeader
                editorState={pageEditorState}
                setEditorState={setPageEditorState}
                headerRef={headerRef}
              />
              <CustomSwitch>
                <Route
                  path={`/${FILETREE_TYPES.STUDY_SET}/:id/${TAB_TYPE.NOTES}`}
                  render={() => (
                    <StudySetNotesContainer
                      editorState={pageEditorState}
                      setEditorState={setPageEditorState}
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
            </InsetPage>
          </MainFrame>
        </FlashcardsContextProvider>
      </SavingEditorContextProvider>
    </CurrentBlockContextProvider>
  );
};

export default StudySetPage;
