import React from "react";
import { StudySetLinkedFlashcard } from "..";
import PageNoteTaker from "../../notetaking/PageNoteTaker";
import { VFlex } from "../../common";
import { EditorState } from "draft-js";
import ReturnToStudyModeButton from "../../study-mode/ReturnToStudyModeButton/ReturnToStudyModeButton";

interface StudySetNotesContainerProps {
  flashcardSize: number;
  flashcardPosition: number;
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  notesRef?: (node: any) => void;
}

const StudySetNotesContainer: React.FC<StudySetNotesContainerProps> = ({
  flashcardSize,
  flashcardPosition,
  editorState,
  setEditorState,
  notesRef,
}) => {
  return (
    <div ref={notesRef}>
      <VFlex height="auto">
        <PageNoteTaker
          editorState={editorState}
          setEditorState={setEditorState}
        />
      </VFlex>
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
