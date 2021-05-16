import React, { useContext, useEffect, useState } from "react";
import { PageHeader } from "../../shared";
import { HFlex, Spacer, VFlex } from "../../common";
import { StudySetToolbar, StudySetTabSwitcher } from "..";
import styled, { ThemeContext } from "styled-components/macro";
import { EditorContext } from "../../../contexts";
import { useIntl } from "react-intl";
import { getPluralOrSingular } from "../../../helpers";
import { Params, TAB_TYPE } from "../../../shared";
import { useParams } from "react-router-dom";
import { getWordCount } from "../../notetaking/Editor/Editor.helpers";

interface StudySetHeaderProps {
  headerRef?: React.RefObject<HTMLDivElement>;
}

const StudySetHeader: React.FC<StudySetHeaderProps> = ({ headerRef }) => {
  const intl = useIntl();
  const [numOfWords, setNumOfWords] = useState<number>(0);
  const theme = useContext(ThemeContext);
  const { editorState } = useContext(EditorContext);
  const { tab } = useParams<Params>();

  // Calculate the number of words in text
  useEffect(() => {
    setNumOfWords(getWordCount(editorState));
  }, [numOfWords, editorState, setNumOfWords]);

  const message = (tab: TAB_TYPE) => {
    if (tab === TAB_TYPE.NOTES) {
      return getPluralOrSingular(
        numOfWords,
        "studySet.notetaking.numOfWord",
        "studySet.notetaking.numOfWords",
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
