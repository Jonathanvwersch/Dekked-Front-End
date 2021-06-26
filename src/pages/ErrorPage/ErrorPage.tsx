import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Flex, Spacer, Text, Button } from "../../components/common";
import { usePageSetupHelpers } from "../../hooks";
import { BUTTON_THEME } from "../../shared";
import { loadingErrorAtom } from "../../store";

const ErrorPage: React.FC = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const history = useHistory();
  const [, setLoadingError] = useAtom(loadingErrorAtom);

  useEffect(() => {
    setLoadingError(false);
  }, [setLoadingError]);

  return (
    <Flex width="100%" height="100%" justifyContent="center">
      <Flex flexDirection="column">
        <Text fontSize={theme.typography.fontSizes.size16}>
          {formatMessage("errorPage.mainMessage")}
        </Text>
        <Text fontSize={theme.typography.fontSizes.size16}>
          {formatMessage("errorPage.subMessage")}{" "}
          <StyledA href="mailto:team@dekked.app" type="email">
            team@dekked.app
          </StyledA>
          .
        </Text>
        <Spacer height={theme.spacers.size8} />
        <Button
          buttonStyle={BUTTON_THEME.PRIMARY}
          handleClick={() => history.push("/")}
        >
          {formatMessage("errorPage.reload")}
        </Button>
      </Flex>
    </Flex>
  );
};

const StyledA = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  &:hover {
    filter: ${({ theme }) => theme.colors.hover.filter};
    text-decoration: underline;
  }
  &:active {
    color: ${({ theme }) => theme.colors.active.filter};
  }
`;

export default ErrorPage;
