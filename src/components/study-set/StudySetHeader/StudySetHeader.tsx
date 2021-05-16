import React, { useContext, useEffect, useState } from "react";
import { PageHeader } from "../../shared";
import { HFlex, Spacer, VFlex } from "../../common";
import { StudySetToolbar, StudySetTabSwitcher } from "..";
import styled, { ThemeContext } from "styled-components/macro";
import { useIntl } from "react-intl";
import { getPluralOrSingular } from "../../../helpers";
import { Params, TAB_TYPE } from "../../../shared";
import { useParams } from "react-router-dom";
import { getWordCount } from "../../notetaking/Editor/Editor.helpers";
import { EditorState } from "draft-js";

interface StudySetHeaderProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  headerRef?: React.RefObject<HTMLDivElement>;
}

const StudySetHeader: React.FC<StudySetHeaderProps> = ({
  headerRef,
  editorState,
  setEditorState,
}) => {
  const intl = useIntl();
  const [numOfWords, setNumOfWords] = useState<number>(0);
  const theme = useContext(ThemeContext);
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
        <StudySetToolbar
          editorState={editorState}
          setEditorState={setEditorState}
        />
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
