import React, { useContext } from "react";
import { PageHeader } from "../../shared";
import { HFlex, Spacer, VFlex } from "../../common";
import { Toolbar } from "..";
import TabSwitcher from "../TabSwitcher/TabSwitcher";
import { ThemeContext } from "styled-components";

interface StudySetHeaderProps {
  headerRef?: React.RefObject<HTMLDivElement>;
}

const StudySetHeader: React.FC<StudySetHeaderProps> = ({ headerRef }) => {
  const theme = useContext(ThemeContext);

  return (
    <div ref={headerRef}>
      <VFlex>
        <HFlex justifyContent="space-between">
          <Toolbar />
          <TabSwitcher />
        </HFlex>
        <Spacer height={theme.spacers.size32} />
        <PageHeader />
      </VFlex>
    </div>
  );
};

export default StudySetHeader;
