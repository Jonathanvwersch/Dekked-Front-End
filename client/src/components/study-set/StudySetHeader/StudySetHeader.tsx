import React from "react";
import { PageHeader } from "../../shared";
import { HFlex, Spacer, VFlex } from "../../common";
import { Toolbar } from "..";
import TabSwitcher from "../TabSwitcher/TabSwitcher";

interface StudySetHeaderProps {}

const StudySetHeader: React.FC<StudySetHeaderProps> = () => {
  return (
    <VFlex>
      <HFlex justifyContent="space-between">
        <Toolbar />
        <TabSwitcher />
      </HFlex>
      <Spacer height="32px" />
      <PageHeader />
    </VFlex>
  );
};

export default StudySetHeader;
