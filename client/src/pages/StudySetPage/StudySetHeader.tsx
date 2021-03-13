import React from "react";
import { PageHeader } from "../shared";
import { HFlex, Spacer, Toolbar, VFlex } from "../../common";
import StudySetTabs from "./StudySetTabs";

interface StudySetHeaderProps {}

const StudySetHeader: React.FC<StudySetHeaderProps> = () => {
  return (
    <VFlex>
      <HFlex justifyContent="space-between">
        <Toolbar />
        <StudySetTabs />
      </HFlex>
      <Spacer height="32px" />
      <PageHeader />
    </VFlex>
  );
};

export default StudySetHeader;
