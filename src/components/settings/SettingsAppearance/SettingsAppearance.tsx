import { useAtom } from "jotai";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { usePageSetupHelpers } from "../../../hooks";
import { translateOptions } from "../../../intl";
import { darkModeAtom } from "../../../store";
import { Box, Divider, H4, Text, Spacer } from "../../common";
import DropdownMenu from "../../common/DropdownMenu/DropdownMenu";
import { themeOptions, THEME_OPTIONS } from "./SettingsAppearance.data";

interface SettingsAppearanceProps {}

const SettingsAppearance: React.FC<SettingsAppearanceProps> = () => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers();
  const [isDarkTheme, setIsDarkTheme] = useAtom(darkModeAtom);

  const handleThemeChange = (e: any) => {
    setIsDarkTheme(e.value === THEME_OPTIONS.DARK ? true : false);
  };

  const defaultValue = () => {
    if (!isDarkTheme) {
      return {
        label: formatMessage(themeOptions[0].label),
        key: themeOptions[0].value,
      };
    } else {
      return {
        label: formatMessage(themeOptions[1].label),
        key: themeOptions[1].value,
      };
    }
  };

  return (
    <>
      <H4>
        <FormattedMessage id="settings.appearance.header" />
      </H4>
      <Divider />
      <Box my={theme.spacers.size32}>
        <Text fontSize={theme.typography.fontSizes.size16}>
          <FormattedMessage id="settings.appearance.theme" />
        </Text>
        <Spacer height={theme.spacers.size16} />
        <DropdownMenu
          onChange={handleThemeChange}
          options={translateOptions(intl, themeOptions)}
          defaultValue={defaultValue()}
        />
      </Box>
    </>
  );
};

export default SettingsAppearance;
