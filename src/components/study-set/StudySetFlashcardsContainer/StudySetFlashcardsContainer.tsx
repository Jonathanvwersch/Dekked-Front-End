import React from "react";
import { StudySetFlashcard } from "..";
import { VFlex } from "../../common";

interface StudySetFlashcardsContainerProps {}

const StudySetFlashcardsContainer: React.FC<StudySetFlashcardsContainerProps> = () => {
  return (
    <VFlex>
      <StudySetFlashcard />
    </VFlex>
  );
};

export default StudySetFlashcardsContainer;
