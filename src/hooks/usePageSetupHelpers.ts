import { ThemeType } from "dekked-design-system";
import { useCallback, useContext } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "styled-components";

export const usePageSetupHelpers = () => {
  const intl = useIntl();
  const theme = useContext<ThemeType>(ThemeContext);
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
