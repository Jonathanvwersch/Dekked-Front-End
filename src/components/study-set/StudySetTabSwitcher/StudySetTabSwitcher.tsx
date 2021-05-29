import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Flex, Spacer } from "../../common";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { TAB_TYPE } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";
import { SidebarContext } from "../../../contexts";
import styled from "styled-components";

const StudySetTabSwitcher: React.FC = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const { type, id } = useContext(SelectedItemContext);
  const { handleStudySetTab } = useContext(SidebarContext);

  const activeTabStyle = {
    fontWeight: theme.typography.fontWeights.bold as "bold",
    borderBottom: `2px solid ${theme.colors.primary}`,
  };

  const tabLink = (slug: TAB_TYPE, text: string) => {
    return (
      <StyledNavLink
        to={`/${type}/${id}/${slug}`}
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
