import React, { useLayoutEffect, useState } from "react";
import StudyModeFlashcard from "../StudyModeFlashcard/StudyModeFlashcard";
import StudyModeProgressBar from "../StudyModeProgressBar/StudyModeProgressBar";

interface StudyModeMainFrameProps {
  flashcardIndex: number;
  flashcards: FlashcardInterface[] | null;
  maxLength: number;
  flippedState: boolean;
}

const StudyModeMainFrame: React.FC<StudyModeMainFrameProps> = ({
  flashcardIndex,
  flashcards,
  maxLength,
  flippedState,
}) => {
  const [currentFlashcard, setCurrentFlashcard] =
    useState<FlashcardInterface | null>();

  useLayoutEffect(() => {
    flashcards && setCurrentFlashcard(flashcards[flashcardIndex]);
  }, [flashcardIndex]);

  return (
    <>
      <StudyModeProgressBar
        flashcardIndex={flashcardIndex}
        flashcardTotal={maxLength}
      />
      <StudyModeFlashcard
        frontBlocks={currentFlashcard?.front_blocks}
        backBlocks={currentFlashcard?.back_blocks}
        flippedState={flippedState}
        linked={Boolean(currentFlashcard?.flashcard.block_link)}
      />
    </>
  );
};

export default StudyModeMainFrame;
