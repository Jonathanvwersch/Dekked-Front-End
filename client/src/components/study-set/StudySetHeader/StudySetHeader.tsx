import React, { useRef } from "react";
import { PageHeader } from "../../shared";
import { HFlex, Spacer, VFlex } from "../../common";
import { Toolbar } from "..";
import TabSwitcher from "../TabSwitcher/TabSwitcher";
import styled from "styled-components";

interface StudySetHeaderProps {
  headerRef?: React.RefObject<HTMLDivElement>;
}

const StudySetHeader: React.FC<StudySetHeaderProps> = ({ headerRef }) => {
  return (
    <div ref={headerRef}>
      <VFlex>
        <HFlex justifyContent="space-between">
          <Toolbar />
          <TabSwitcher />
        </HFlex>
        <Spacer height="32px" />
        <PageHeader />
      </VFlex>
    </div>
  );
};

export default StudySetHeader;
