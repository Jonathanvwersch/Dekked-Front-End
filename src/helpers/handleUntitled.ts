import { formatMessage } from "../intl";
import { IntlShape } from "react-intl";

export const handleUntitled = (name: string, intl: IntlShape) => {
  if (name === "") return formatMessage("generics.untitled", intl);
  else return name;
};
