import React, { useEffect, useState } from "react";
import { FlashcardModal, PageHeader } from "../../shared";
import { Button, Flex } from "dekked-design-system";
import { StudySetToolbar, StudySetTabSwitcher } from "..";
import styled from "styled-components";
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
import { queryClient } from "../../..";
import { useResponsiveLayout } from "../../../hooks";
import {
  BREAKPOINT_MOBILE,
  LAYOUT_VERTICAL,
} from "../../../hooks/useResponsiveLayout";

interface StudySetHeaderProps {
  headerRef?: React.RefObject<HTMLDivElement>;
}

const StudySetHeader: React.FC<StudySetHeaderProps> = ({ headerRef }) => {
  const intl = useIntl();
  const [numOfWords, setNumOfWords] = useState<number>(0);
  const { tab, id } = useParams<Params>();
  const [addFlashcard, setAddFlashcard] = useState<boolean>(false);
  const [isLoading] = useAtom(isAppLoadingAtom);
  const [editorState, setEditorState] = useAtom(pageEditorStateAtom);
  const [flashcards] = useAtom(flashcardsAtom);
  const flashcardsDoNotExist = flashcards?.length === 0 || !flashcards;
  const layout = useResponsiveLayout(BREAKPOINT_MOBILE);

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
      <ToolbarAndTabs
        justifyContent="space-between"
        isMobile={layout === LAYOUT_VERTICAL && tab === TAB_TYPE.NOTES}
      >
        {tab === TAB_TYPE.NOTES ? (
          <StudySetToolbar
            editorState={editorState}
            setEditorState={setEditorState}
            isNotesPage={true}
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
          <PageHeader
            message={message(tab)}
            disableStudyButton={flashcardsDoNotExist}
          />
        </Flex>
      </PageHeaderWrapper>

      <FlashcardModal
        isOpen={addFlashcard}
        setIsOpen={setAddFlashcard}
        deckId={
          // @ts-ignore
          queryClient.getQueryData(`${id}-get-deck`)?.id
        }
      />
    </>
  );
};

const PageHeaderWrapper = styled.div`
  padding-left: ${({ theme }) => theme.spacers.size32};
  padding-right: ${({ theme }) => theme.spacers.size32};
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.wrappers[SIZES.SMALL]};
`;

export const ToolbarAndTabs = styled(Flex)<{ isMobile?: boolean }>`
  position: sticky;
  margin-top: ${({ theme }) => theme.spacers.size32};
  width: 100%;
  top: 0;
  max-width: ${({ theme }) => theme.sizes.wrappers[SIZES.SMALL]};
  padding: ${({ theme }) => theme.spacers.size16} 0px;
  background: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  min-height: ${({ theme }) => theme.spacers.size64};
  height: ${({ theme }) => theme.spacers.size64};
  z-index: 100;
  padding-left: ${({ theme }) => theme.spacers.size32};
  padding-right: ${({ theme }) => theme.spacers.size32};
  flex-direction: ${({ isMobile }) =>
    isMobile ? "column-reverse" : undefined};
  gap: ${({ theme, isMobile }) =>
    isMobile ? theme.spacers.size16 : undefined};
`;

export default React.memo(StudySetHeader);
