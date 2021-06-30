import React, { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { Flex, Spacer, Text, Button } from "../../components/common";
import { usePageSetupHelpers } from "../../hooks";
import { BUTTON_THEME } from "../../shared";

const NotFoundPage: React.FC = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const history = useHistory();

  useLayoutEffect(() => {
    history.push("/404");
  }, [history]);

  return (
    <Flex width="100%" height="100%" justifyContent="center">
      <Flex flexDirection="column">
        <Text fontSize={theme.typography.fontSizes.size16}>
          {formatMessage("notFoundPage.mainMessage")}
        </Text>
        <Spacer height={theme.spacers.size8} />
        <Button
          buttonStyle={BUTTON_THEME.PRIMARY}
          handleClick={() => history.push("/")}
        >
          {formatMessage("notFoundPage.goHome")}
        </Button>
      </Flex>
    </Flex>
  );
};

export default NotFoundPage;
