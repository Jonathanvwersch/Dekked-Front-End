import { IntlShape } from "react-intl";

const formatMessage = (id: string, intl: IntlShape, values?: any): string =>
  intl.formatMessage({ id }, values);

export default formatMessage;
