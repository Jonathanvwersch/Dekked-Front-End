import React from "react";
import StudyModeFlashcard from "../StudyModeFlashcard/StudyModeFlashcard";
import StudyModeProgressBar from "../StudyModeProgressBar/StudyModeProgressBar";

interface StudyModeMainFrameProps {}

const StudyModeMainFrame: React.FC<StudyModeMainFrameProps> = () => {
  return (
    <>
      <StudyModeProgressBar />
      <StudyModeFlashcard />
    </>
  );
};

export default StudyModeMainFrame;
