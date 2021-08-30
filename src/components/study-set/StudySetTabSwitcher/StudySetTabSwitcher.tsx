import React from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { Flex, Spacer } from "dekked-design-system";
import { FILETREE_TYPES, Params, TAB_TYPE } from "../../../shared";
import { useMultiKeyPress, usePageSetupHelpers } from "../../../hooks";
import styled from "styled-components";
import {
  addedLinkedFlashcardAtom,
  isAppLoadingAtom,
  studySetTabAtom,
} from "../../../store";
import { useAtom } from "jotai";
import Skeleton from "react-loading-skeleton";

const StudySetTabSwitcher: React.FC = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const { id, tab } = useParams<Params>();
  // store state of study set tabs (either flashcard or notes)
  const [studySetTab, setStudySetTab] = useAtom(studySetTabAtom);
  const [isLoading] = useAtom(isAppLoadingAtom);
  const history = useHistory();
  const [addedLinkedFlashcard] = useAtom(addedLinkedFlashcardAtom);
  const activeTabStyle = {
    fontWeight: theme.typography.fontWeights.bold as "bold",
    borderBottom: `2px solid ${theme.colors.primary}`,
  };

  // helper function to set state of study set tabs per block
  const handleStudySetTab = (id: string, tab: TAB_TYPE) => {
    if (tab === studySetTab[id]) return;
    let studySetTabsCopy = { ...studySetTab };
    studySetTabsCopy[id] = tab;
    setStudySetTab(studySetTabsCopy);
  };

  // switch tabs on multi key press
  useMultiKeyPress(["Control", "3"], () =>
    history.push(
      `/${FILETREE_TYPES.STUDY_SET}/${id}/${
        tab === TAB_TYPE.NOTES ? TAB_TYPE.FLASHCARDS : TAB_TYPE.NOTES
      }`
    )
  );

  const tabLink = (slug: TAB_TYPE, text: string) => {
    return (
      <StyledNavLink
        to={`/${FILETREE_TYPES.STUDY_SET}/${id}/${slug}`}
        activeStyle={activeTabStyle}
        onClick={() => handleStudySetTab(id, slug)}
      >
        {text}
        {slug === TAB_TYPE.FLASHCARDS && addedLinkedFlashcard !== 0 ? (
          <Superscript>{addedLinkedFlashcard}</Superscript>
        ) : null}
      </StyledNavLink>
    );
  };

  return (
    <Flex width="auto" ml={theme.spacers.size16}>
      {!isLoading ? (
        <>
          {tabLink(TAB_TYPE.NOTES, formatMessage("studySet.tabs.notes"))}
          <Spacer width={theme.spacers.size16} />
          {tabLink(
            TAB_TYPE.FLASHCARDS,
            formatMessage("studySet.tabs.flashcards")
          )}
        </>
      ) : (
        <Skeleton width="140px" height="24px" />
      )}
    </Flex>
  );
};

const StyledNavLink = styled(NavLink)`
  user-select: none;
  color: ${({ theme }) => theme.colors.fontColor};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Superscript = styled.sup`
  font-size: ${({ theme }) => theme.typography.fontSizes.size12};
`;

export default React.memo(StudySetTabSwitcher);
