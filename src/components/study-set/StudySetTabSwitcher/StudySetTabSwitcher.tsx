import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "styled-components/macro";
import { HFlex, Spacer, Text } from "../../common";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { TAB_TYPE } from "../../../shared";
import { useIntl } from "react-intl";
import { usePageSetupHelpers } from "../../../hooks";

const StudySetTabSwitcher: React.FC = () => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers(ThemeContext, intl);
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
      {tabLink(TAB_TYPE.NOTES, formatMessage("studySet.tabs.notes", intl))}
      <Spacer width={theme.spacers.size16} />
      {tabLink(
        TAB_TYPE.FLASHCARDS,
        formatMessage("studySet.tabs.flashcards", intl)
      )}
    </HFlex>
  );
};

export default StudySetTabSwitcher;
