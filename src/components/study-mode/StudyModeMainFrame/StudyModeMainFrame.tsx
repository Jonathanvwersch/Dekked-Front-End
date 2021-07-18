import React, { useLayoutEffect, useState } from "react";
import { STUDY_MODE_TYPES } from "../../../shared";
import StudyModeFlashcard from "../StudyModeFlashcard/StudyModeFlashcard";
import StudyModeProgressBar from "../StudyModeProgressBar/StudyModeProgressBar";

interface StudyModeMainFrameProps {
  flashcardIndex: number;
  flashcards: FlashcardInterface[] | undefined;
  maxLength: number;
  flippedState: boolean;
  studyMode?: STUDY_MODE_TYPES;
}

const StudyModeMainFrame: React.FC<StudyModeMainFrameProps> = ({
  flashcardIndex,
  flashcards,
  maxLength,
  flippedState,
  studyMode,
}) => {
  const [currentFlashcard, setCurrentFlashcard] =
    useState<FlashcardInterface | undefined>();
  const frontBlocks = flashcards?.[flashcardIndex]?.front_blocks;
  const backBlocks = flashcards?.[flashcardIndex]?.back_blocks;

  useLayoutEffect(() => {
    setCurrentFlashcard(flashcards?.[flashcardIndex]);
  }, [flashcardIndex, flashcards, frontBlocks, backBlocks]);

  return (
    <>
      <StudyModeProgressBar
        flashcardIndex={flashcardIndex}
        flashcardTotal={maxLength}
      />
      <StudyModeFlashcard
        frontBlocks={currentFlashcard?.front_blocks}
        backBlocks={currentFlashcard?.back_blocks}
        learningStatus={currentFlashcard?.learning_status}
        flippedState={flippedState}
        blockLink={currentFlashcard?.block_link}
        flashcardId={currentFlashcard?.id}
        isFinishedStudying={maxLength === flashcardIndex}
        studyMode={studyMode}
        ownerId={currentFlashcard?.owner_id}
      />
    </>
  );
};

export default StudyModeMainFrame;
