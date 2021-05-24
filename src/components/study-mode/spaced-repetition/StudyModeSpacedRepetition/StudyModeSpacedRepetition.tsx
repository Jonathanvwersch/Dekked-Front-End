import React from "react";
import { Flex } from "../../../common";
// import StudyModeMainFrame from "../../StudyModeMainFrame/StudyModeMainFrame";
// import SpacedRepetitionController from "../SpacedRepetitionController/SpacedRepetitionController";

interface StudyModeSpacedRepetitionProps {}

const StudyModeSpacedRepetition: React.FC<StudyModeSpacedRepetitionProps> =
  () => {
    return (
      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        {/* <StudyModeMainFrame />
      <SpacedRepetitionController /> */}
      </Flex>
    );
  };

export default StudyModeSpacedRepetition;
