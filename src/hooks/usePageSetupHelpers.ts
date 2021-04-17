import { useCallback, useContext } from "react";
import { useIntl } from "react-intl";
import { ThemeType } from "../styles/theme";

export interface UsePageSetupHelpersProps {
  theme: ThemeType;
  formatMessage: (id: string, values?: any) => string;
}

export const usePageSetupHelpers = (
  themeContext: React.Context<ThemeType>
): UsePageSetupHelpersProps => {
  const intl = useIntl();
  const theme = useContext<ThemeType>(themeContext);
  const formatMessage = useCallback(
    (id: string, values?: any) =>
      (intl && intl.formatMessage({ id }, values)) || id,
    [intl]
  );
  return {
    theme,
    formatMessage,
  };
};
