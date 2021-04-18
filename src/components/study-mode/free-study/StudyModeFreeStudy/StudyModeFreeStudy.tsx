import React from "react";
import { VFlex } from "../../../common";
import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";
import FreeStudyController from "../FreeStudyController/FreeStudyController";

interface StudyModeFreeStudyProps {}

const StudyModeFreeStudy: React.FC<StudyModeFreeStudyProps> = () => {
  return (
    <VFlex height="100%" justifyContent="space-between">
      <StudyModeMainFrame />
      <FreeStudyController />
    </VFlex>
  );
};

export default StudyModeFreeStudy;
