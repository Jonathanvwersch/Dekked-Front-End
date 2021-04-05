import React, { useContext } from "react";
import { PageHeader } from "../../shared";
import { HFlex, Spacer, VFlex } from "../../common";
import { StudySetToolbar, StudySetTabSwitcher } from "..";
import styled, { ThemeContext } from "styled-components/macro";
import { EditorContext } from "../../../contexts";
import { useIntl } from "react-intl";
import { getPluralOrSingular } from "../../../helpers";
import { Params, TAB_TYPE } from "../../../shared";
import { useParams } from "react-router-dom";

interface StudySetHeaderProps {
  headerRef?: React.RefObject<HTMLDivElement>;
}

const StudySetHeader: React.FC<StudySetHeaderProps> = ({ headerRef }) => {
  const intl = useIntl();
  const theme = useContext(ThemeContext);
  const { numOfBlocks } = useContext(EditorContext);
  const { tab } = useParams<Params>();

  const message = (tab: TAB_TYPE) => {
    console.log(tab);
    if (tab === TAB_TYPE.NOTES) {
      return getPluralOrSingular(
        numOfBlocks,
        "studySet.notetaking.numOfBlock",
        "studySet.notetaking.numOfBlocks",
        intl
      );
    }
  };

  return (
    <>
      <ToolbarAndTabs justifyContent="space-between">
        <StudySetToolbar />
        <StudySetTabSwitcher />
      </ToolbarAndTabs>
      <div ref={headerRef}>
        <VFlex>
          <Spacer height={theme.spacers.size16} />
          <PageHeader message={message(tab)} />
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
