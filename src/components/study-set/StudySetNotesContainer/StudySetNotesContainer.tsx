import React from "react";
import { StudySetLinkedFlashcard } from "..";
import PageNoteTaker from "../../notetaking/PageNoteTaker";
import { Flex } from "../../common";
import { EditorState } from "draft-js";
import ReturnToStudyModeButton from "../../study-mode/ReturnToStudyModeButton/ReturnToStudyModeButton";

interface StudySetNotesContainerProps {
  flashcardSize: number;
  flashcardPosition: number;
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  notesRef?: (node: any) => void;
  pageId?: string;
  loading?: boolean;
}

const StudySetNotesContainer: React.FC<StudySetNotesContainerProps> = ({
  flashcardSize,
  flashcardPosition,
  editorState,
  setEditorState,
  notesRef,
  pageId,
  loading,
}) => {
  return (
    <div ref={notesRef}>
      <Flex flexDirection="column" height="auto">
        <PageNoteTaker
          editorState={editorState}
          setEditorState={setEditorState}
          pageId={pageId}
          loading={loading}
        />
      </Flex>
      {flashcardSize ? (
        <StudySetLinkedFlashcard
          flashcardSize={flashcardSize}
          flashcardPosition={flashcardPosition}
        />
      ) : null}
      <ReturnToStudyModeButton
        pageWidth={flashcardSize}
        buttonPosition={flashcardPosition}
      />
    </div>
  );
};

export default StudySetNotesContainer;
