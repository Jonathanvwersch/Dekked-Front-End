import React from "react";
import { VFlex } from "../../../common";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";
import SpacedRepetitionController from "../SpacedRepetitionController/SpacedRepetitionController";

interface StudyModeSpacedRepetitionProps {}

const StudyModeSpacedRepetition: React.FC<StudyModeSpacedRepetitionProps> = () => {
  return (
    <VFlex justifyContent="space-between" height="100%">
      <StudyModeMainFrame />
      <SpacedRepetitionController />
    </VFlex>
  );
};

export default StudyModeSpacedRepetition;
