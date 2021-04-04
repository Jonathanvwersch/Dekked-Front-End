import { IntlShape } from "react-intl";

const formatNumber = (value: number, intl: IntlShape): string =>
  intl.formatNumber(value);

export default formatNumber;
