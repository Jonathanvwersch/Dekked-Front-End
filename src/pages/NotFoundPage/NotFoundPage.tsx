import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Flex, Spacer, Text, Button } from "dekked-design-system";
import { usePageSetupHelpers } from "../../hooks";
import { BUTTON_THEME } from "../../shared";

const NotFoundPage: React.FC = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const history = useHistory();

  return (
    <Flex width="100%" height="100%" justifyContent="center">
      <Flex flexDirection="column">
        <Text fontSize={theme.typography.fontSizes.size16}>
          {formatMessage("notFoundPage.mainMessage")}
        </Text>
        <Spacer height={theme.spacers.size8} />
        <Button
          buttonStyle={BUTTON_THEME.PRIMARY}
          handleClick={() => {
            history.push("/");
          }}
        >
          {formatMessage("notFoundPage.goHome")}
        </Button>
      </Flex>
    </Flex>
  );
};

export default withRouter(NotFoundPage);
