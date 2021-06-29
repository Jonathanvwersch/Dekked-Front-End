import React from "react";
import { StudySetLinkedFlashcard } from "..";
import PageNoteTaker from "../../notetaking/PageNoteTaker";
import { Flex } from "../../common";
import ReturnToStudyModeButton from "../../study-mode/ReturnToStudyModeButton/ReturnToStudyModeButton";

interface StudySetNotesContainerProps {
  flashcardSize: number;
  flashcardPosition: number;
  notesRef?: (node: any) => void;
}

const StudySetNotesContainer: React.FC<StudySetNotesContainerProps> = ({
  flashcardSize,
  flashcardPosition,
  notesRef,
}) => (
  <div ref={notesRef}>
    <Flex flexDirection="column" height="auto">
      <PageNoteTaker />
    </Flex>
    {flashcardSize && (
      <StudySetLinkedFlashcard
        flashcardSize={flashcardSize}
        flashcardPosition={flashcardPosition}
      />
    )}
    <ReturnToStudyModeButton />
  </div>
);

export default StudySetNotesContainer;
