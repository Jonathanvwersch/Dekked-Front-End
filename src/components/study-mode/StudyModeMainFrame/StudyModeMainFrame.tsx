import { isEmpty } from "lodash";
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
  setFlashcardIndex?: React.Dispatch<React.SetStateAction<number>>;
}

const StudyModeMainFrame: React.FC<StudyModeMainFrameProps> = ({
  flashcardIndex,
  flashcards,
  maxLength,
  flippedState,
  studyMode,
  setFlashcardIndex,
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
      {studyMode === STUDY_MODE_TYPES.FREE_STUDY && (
        <StudyModeProgressBar
          flashcardIndex={flashcardIndex}
          flashcardTotal={maxLength}
        />
      )}
      <StudyModeFlashcard
        frontBlocks={currentFlashcard?.front_blocks}
        backBlocks={currentFlashcard?.back_blocks}
        learningStatus={currentFlashcard?.learning_status}
        flippedState={flippedState}
        flashcardIndex={flashcardIndex}
        setFlashcardIndex={setFlashcardIndex}
        blockLink={currentFlashcard?.block_link}
        flashcardId={currentFlashcard?.id}
        isFinishedStudying={maxLength === flashcardIndex}
        studyMode={studyMode}
        ownerId={currentFlashcard?.owner_id}
        isFlashcardsEmpty={isEmpty(flashcards) || !flashcards}
      />
    </>
  );
};

export default StudyModeMainFrame;
