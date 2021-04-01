import React, { useContext } from "react";
import { PageHeader } from "../../shared";
import { HFlex, Spacer, VFlex } from "../../common";
import { StudySetToolbar, StudySetTabSwitcher } from "..";
import styled, { ThemeContext } from "styled-components";

interface StudySetHeaderProps {
  headerRef?: React.RefObject<HTMLDivElement>;
}

const StudySetHeader: React.FC<StudySetHeaderProps> = ({ headerRef }) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <ToolbarAndTabs justifyContent="space-between">
        <StudySetToolbar />
        <StudySetTabSwitcher />
      </ToolbarAndTabs>
      <div ref={headerRef}>
        <VFlex>
          <Spacer height={theme.spacers.size16} />
          <PageHeader />
        </VFlex>
      </div>
    </>
  );
};

const ToolbarAndTabs = styled(HFlex)`
  position: sticky;
  top: 0;
  padding: ${({ theme }) => theme.spacers.size16} 0px;
  background: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  z-index: 100;
`;

export default StudySetHeader;
