import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { HFlex, Spacer, Text } from "../../common";
import { TAB_TYPE } from "../../contexts/FileTreeContext";
import { SelectedItemContext } from "../../contexts/SelectedItemContext";
import { ThemeType } from "../../styles/theme";

interface StudySetTabsProps {
  padding?: string;
  backgroundColor?: string;
  height?: string;
  width?: string;
  border?: string;
  borderRadius?: string;
}

const StudySetTabs: React.FC<StudySetTabsProps> = ({ children, ...props }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const { type, id } = useContext(SelectedItemContext);

  const activeTabStyle = {
    fontWeight: theme.typography.fontWeights.bold as "bold",

    borderBottom: `2px solid ${theme.colors.primary}`,
  };

  return (
    <HFlex width="auto">
      <NavLink
        to={`/${type}/${id}/${TAB_TYPE.NOTES}`}
        activeStyle={activeTabStyle}
      >
        <Text
          hover={theme.colors.primary}
          fontSize={theme.typography.fontSizes.size14}
        >
          Notes
        </Text>
      </NavLink>
      <Spacer width="16px" />
      <NavLink
        to={`/${type}/${id}/${TAB_TYPE.FLASHCARDS}`}
        activeStyle={activeTabStyle}
      >
        <Text
          hover={theme.colors.primary}
          fontSize={theme.typography.fontSizes.size14}
        >
          Flashcards
        </Text>
      </NavLink>
    </HFlex>
  );
};

export default StudySetTabs;
