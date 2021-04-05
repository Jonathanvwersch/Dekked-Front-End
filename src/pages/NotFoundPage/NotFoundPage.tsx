import React, { useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ThemeContext } from "styled-components/macro";
import { HFlex, Spacer, Text, VFlex, Button } from "../../components/common";
import { usePageSetupHelpers } from "../../hooks";
import { BUTTON_THEME } from "../../shared";
import { useIntl } from "react-intl";

const NotFoundPage: React.FC = () => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers(ThemeContext, intl);
  const history = useHistory();

  useLayoutEffect(() => {
    history.push("/404");
  }, [history]);

  return (
    <HFlex width="100%" height="100%" justifyContent="center">
      <VFlex>
        <Text fontSize={theme.typography.fontSizes.size16}>
          {formatMessage("notFoundPage.lost", intl)}
        </Text>
        <Spacer height={theme.spacers.size8} />
        <Link to="/">
          <Button buttonStyle={BUTTON_THEME.PRIMARY}>
            {formatMessage("notFoundPage.goHome", intl)}
          </Button>
        </Link>
      </VFlex>
    </HFlex>
  );
};

NotFoundPage.defaultProps = {};

export default NotFoundPage;
