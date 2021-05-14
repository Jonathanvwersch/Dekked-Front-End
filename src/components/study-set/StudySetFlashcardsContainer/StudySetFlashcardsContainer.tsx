import React, { useContext } from "react";
import { StudySetFlashcard } from "..";
import { FlashcardsContext } from "../../../contexts";
import { VFlex } from "../../common";

interface StudySetFlashcardsContainerProps {}

const StudySetFlashcardsContainer: React.FC<StudySetFlashcardsContainerProps> =
  () => {
    const { flashcards } = useContext(FlashcardsContext);
    console.log(flashcards);
    return (
      <VFlex>
        <StudySetFlashcard />
      </VFlex>
    );
  };

export default StudySetFlashcardsContainer;
