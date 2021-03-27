import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { HFlex, Spacer, Text } from "../../common";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { ThemeType } from "../../../styles/theme";
import { TAB_TYPE } from "../../../shared";

const TabSwitcher: React.FC = () => {
  const theme: ThemeType = useContext(ThemeContext);
  const { type, id } = useContext(SelectedItemContext);

  const activeTabStyle = {
    fontWeight: theme.typography.fontWeights.bold as "bold",
    borderBottom: `2px solid ${theme.colors.primary}`,
  };

  const tabLink = (slug: TAB_TYPE, text: string) => {
    return (
      <NavLink to={`/${type}/${id}/${slug}`} activeStyle={activeTabStyle}>
        <Text
          hover={theme.colors.primary}
          filterActive
          fontSize={theme.typography.fontSizes.size16}
        >
          {text}
        </Text>
      </NavLink>
    );
  };

  return (
    <HFlex width="auto">
      {tabLink(TAB_TYPE.NOTES, "Notes")}
      <Spacer width={theme.spacers.size16} />
      {tabLink(TAB_TYPE.FLASHCARDS, "Flashcards")}
    </HFlex>
  );
};

export default TabSwitcher;
