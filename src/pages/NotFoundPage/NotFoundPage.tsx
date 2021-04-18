import React, { useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { HFlex, Spacer, Text, VFlex, Button } from "../../components/common";
import { usePageSetupHelpers } from "../../hooks";
import { BUTTON_THEME } from "../../shared";

const NotFoundPage: React.FC = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const history = useHistory();

  useLayoutEffect(() => {
    history.push("/404");
  }, [history]);

  return (
    <HFlex width="100%" height="100%" justifyContent="center">
      <VFlex>
        <Text fontSize={theme.typography.fontSizes.size16}>
          {formatMessage("notFoundPage.mainMessage")}
        </Text>
        <Spacer height={theme.spacers.size8} />
        <Link to="/">
          <Button buttonStyle={BUTTON_THEME.PRIMARY}>
            {formatMessage("notFoundPage.goHome")}
          </Button>
        </Link>
      </VFlex>
    </HFlex>
  );
};

NotFoundPage.defaultProps = {};

export default NotFoundPage;
