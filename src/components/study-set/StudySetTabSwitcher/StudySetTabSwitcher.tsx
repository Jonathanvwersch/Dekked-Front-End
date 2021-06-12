import React from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { Flex, Spacer } from "../../common";
import { FILETREE_TYPES, Params, TAB_TYPE } from "../../../shared";
import {
  useMultiKeyPress,
  usePageSetupHelpers,
  useStorageState,
} from "../../../hooks";
import styled from "styled-components";
import { StudySetTabKey } from "../../../helpers/getStudySetTabLink";

const StudySetTabSwitcher: React.FC = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const { id, tab } = useParams<Params>();
  // store state of study set tabs (either flashcard or notes)
  const { value: studySetTab, setValue: setStudySetTab } = useStorageState<{
    [id: string]: TAB_TYPE;
  }>({}, StudySetTabKey);
  const history = useHistory();
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
      </StyledNavLink>
    );
  };

  return (
    <Flex width="auto">
      {tabLink(TAB_TYPE.NOTES, formatMessage("studySet.tabs.notes"))}
      <Spacer width={theme.spacers.size16} />
      {tabLink(TAB_TYPE.FLASHCARDS, formatMessage("studySet.tabs.flashcards"))}
    </Flex>
  );
};

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.fontColor};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default StudySetTabSwitcher;
