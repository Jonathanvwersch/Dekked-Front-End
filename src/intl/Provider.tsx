import React, { Fragment } from "react";
import { IntlProvider } from "react-intl";
import flattenMessages from "./flattenMessages";
import { LOCALES } from "./locales";
import messages from "./messages";

interface ProviderProps {
  locale?: LOCALES;
}

export const Provider: React.FC<ProviderProps> = ({
  children,
  locale = LOCALES.ENGLISH_GB,
}) => {
  return (
    <IntlProvider
      locale={locale}
      textComponent={Fragment}
      messages={flattenMessages(messages[locale])}
    >
      {children}
    </IntlProvider>
  );
};
