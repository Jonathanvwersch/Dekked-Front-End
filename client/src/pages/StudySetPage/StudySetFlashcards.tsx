import React from "react";
import { Flashcard, VFlex } from "../../common";
interface StudySetFlashcardsProps {}

const StudySetFlashcards: React.FC<StudySetFlashcardsProps> = () => {
  return (
    <VFlex>
      <Flashcard />
    </VFlex>
  );
};

export default StudySetFlashcards;
