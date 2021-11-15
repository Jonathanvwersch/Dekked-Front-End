import React, { useCallback, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/common/MainFrame/MainFrame";
import {
  StudySetFlashcardsContainer,
  StudySetHeader,
  StudySetNotesContainer,
} from "../../components/study-set";
import { useResize } from "../../hooks/useResize";
import { FILETREE_TYPES, Params, SIZES, TAB_TYPE } from "../../shared";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [initialWidth, setInitialWidth] = useState(0);
  const { dimensions, position } = useResize(headerRef);
  const { tab, type } = useParams<Params>();

  // This ref is used to get the initial width of the flashcard as the headerRef is undefined on mount
  const initialRef = useCallback((node) => {
    if (node !== null) {
      setInitialWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <>
      {(tab !== TAB_TYPE.FLASHCARDS && tab !== TAB_TYPE.NOTES) ||
      type !== FILETREE_TYPES.STUDY_SET ? (
        <NotFoundPage />
      ) : (
        <MainFrame>
          <StudySetHeader headerRef={headerRef} />
          <InsetPage size={SIZES.SMALL}>
            {tab === TAB_TYPE.NOTES ? (
              <StudySetNotesContainer
                notesRef={initialRef}
                flashcardSize={
                  dimensions.width ? dimensions.width - 64 : initialWidth
                }
                flashcardPosition={position.left && position.left + 100}
              />
            ) : (
              <StudySetFlashcardsContainer />
            )}
          </InsetPage>
        </MainFrame>
      )}
    </>
  );
};

export default StudySetPage;
