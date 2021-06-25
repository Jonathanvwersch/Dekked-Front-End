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
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  isEditable: boolean;
}

const StudyModeMainFrame: React.FC<StudyModeMainFrameProps> = ({
  flashcardIndex,
  flashcards,
  maxLength,
  flippedState,
  studyMode,
  isEditable,
  setIsEditable,
}) => {
  const [currentFlashcard, setCurrentFlashcard] =
    useState<FlashcardInterface | undefined>();

  useLayoutEffect(() => {
    flashcards && setCurrentFlashcard(flashcards[flashcardIndex]);
  }, [flashcardIndex, flashcards]);

  return (
    <>
      <StudyModeProgressBar
        flashcardIndex={flashcardIndex}
        flashcardTotal={maxLength}
      />
      <StudyModeFlashcard
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        frontBlocks={currentFlashcard?.front_blocks}
        backBlocks={currentFlashcard?.back_blocks}
        flippedState={flippedState}
        blockLink={currentFlashcard?.flashcard.block_link}
        flashcardId={currentFlashcard?.flashcard.id}
        isFinishedStudying={maxLength === flashcardIndex}
        studyMode={studyMode}
        ownerId={currentFlashcard?.flashcard.owner_id}
      />
    </>
  );
};

export default StudyModeMainFrame;
