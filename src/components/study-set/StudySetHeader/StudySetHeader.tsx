import React, { useContext, useEffect, useState } from "react";
import { FlashcardModal, PageHeader } from "../../shared";
import { Button, Flex, Spacer } from "../../common";
import { StudySetToolbar, StudySetTabSwitcher } from "..";
import styled, { ThemeContext } from "styled-components";
import { FormattedMessage, useIntl } from "react-intl";
import { getPluralOrSingular } from "../../../helpers";
import { BUTTON_THEME, Params, SIZES, TAB_TYPE } from "../../../shared";
import { useParams } from "react-router-dom";
import { getWordCount } from "../../notetaking/Editor/Editor.helpers";
import {
  flashcardsAtom,
  isAppLoadingAtom,
  pageEditorStateAtom,
} from "../../../store";
import { useAtom } from "jotai";
import Skeleton from "react-loading-skeleton";

interface StudySetHeaderProps {
  headerRef?: React.RefObject<HTMLDivElement>;
}

const StudySetHeader: React.FC<StudySetHeaderProps> = ({ headerRef }) => {
  const intl = useIntl();
  const [numOfWords, setNumOfWords] = useState<number>(0);
  const theme = useContext(ThemeContext);
  const { tab } = useParams<Params>();
  const [addFlashcard, setAddFlashcard] = useState<boolean>(false);
  const [isLoading] = useAtom(isAppLoadingAtom);
  const [editorState, setEditorState] = useAtom(pageEditorStateAtom);
  const [flashcards] = useAtom(flashcardsAtom);
  const flashcardsDoNotExist = flashcards?.length === 0 || !flashcards;

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
    } else {
      return getPluralOrSingular(
        flashcards?.length || 0,
        "studySet.flashcards.flashcard",
        "studySet.flashcards.flashcards",
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
        ) : !isLoading ? (
          <Button
            buttonStyle={BUTTON_THEME.SECONDARY}
            handleClick={() => setAddFlashcard(true)}
          >
            <FormattedMessage id="studySet.flashcards.addFlashcard" />
          </Button>
        ) : (
          <Skeleton width="136px" height="32px" />
        )}
        <StudySetTabSwitcher />
      </ToolbarAndTabs>
      <PageHeaderWrapper ref={headerRef}>
        <Flex flexDirection="column">
          <Spacer height={theme.spacers.size16} />
          <PageHeader
            message={message(tab)}
            disableStudyButton={flashcardsDoNotExist}
          />
        </Flex>
      </PageHeaderWrapper>

      <FlashcardModal isOpen={addFlashcard} setIsOpen={setAddFlashcard} />
    </>
  );
};

const PageHeaderWrapper = styled.div`
  padding-left: 100px;
  padding-right: 100px;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.wrappers[SIZES.SMALL]};
`;

const ToolbarAndTabs = styled(Flex)`
  position: sticky;
  margin-top: ${({ theme }) => theme.spacers.size32};
  width: 100%;
  top: 0;
  max-width: ${({ theme }) => theme.sizes.wrappers[SIZES.SMALL]};
  padding: ${({ theme }) => theme.spacers.size16} 0px;
  background: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  height: ${({ theme }) => theme.spacers.size64};
  z-index: 100;
  padding-left: 100px;
  padding-right: 100px;
`;

export default React.memo(StudySetHeader);
