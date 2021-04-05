import { IntlShape } from "react-intl";
import { formatMessage } from "../intl";

// Return plural or singular form of a string based on the number of items passed in
// i.e. 1 binder vs 2 binders
export const getPluralOrSingular = (
  numOfItems: number,
  singular: string,
  plural: string,
  intl: IntlShape
) => {
  if (numOfItems === 1) {
    return formatMessage(singular, intl, {
      num: numOfItems,
    });
  }

  return formatMessage(plural, intl, {
    num: numOfItems,
  });
};
