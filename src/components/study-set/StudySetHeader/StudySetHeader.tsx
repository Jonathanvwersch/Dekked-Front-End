import React, { useContext, useEffect, useState } from "react";
import { FlashcardModal, PageHeader } from "../../shared";
import { Button, Flex, Spacer } from "../../common";
import { StudySetToolbar, StudySetTabSwitcher } from "..";
import styled, { ThemeContext } from "styled-components";
import { FormattedMessage, useIntl } from "react-intl";
import { getPluralOrSingular } from "../../../helpers";
import { BUTTON_THEME, Params, TAB_TYPE } from "../../../shared";
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
  const [addFlashcard, setAddFlashcard] = useState<boolean>(false);

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
        {tab === TAB_TYPE.NOTES ? (
          <StudySetToolbar
            editorState={editorState}
            setEditorState={setEditorState}
          />
        ) : (
          <Button
            buttonStyle={BUTTON_THEME.SECONDARY}
            handleClick={() => setAddFlashcard(true)}
          >
            <FormattedMessage id="studySet.flashcards.addFlashcard" />
          </Button>
        )}
        <StudySetTabSwitcher />
      </ToolbarAndTabs>
      <div ref={headerRef}>
        <Flex flexDirection="column">
          <Spacer height={theme.spacers.size16} />
          <PageHeader message={message(tab)} />
        </Flex>
      </div>
      <FlashcardModal isOpen={addFlashcard} setIsOpen={setAddFlashcard} />
    </>
  );
};

const ToolbarAndTabs = styled(Flex)`
  position: sticky;
  width: 100%;
  top: 0;
  padding: ${({ theme }) => theme.spacers.size16} 0px;
  background: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  height: ${({ theme }) => theme.spacers.size64};
  z-index: 100;
`;

export default StudySetHeader;
