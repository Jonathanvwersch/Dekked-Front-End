import React, { useContext } from "react";
import {
  Button,
  ErrorIcon,
  Flex,
  H1,
  H2,
  ShadowCard,
  SIZES,
  Spacer,
  Text,
} from "dekked-design-system";
import { ErrorBoundary } from "react-error-boundary";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { config } from "../../../config";
import { FormattedMessage } from "react-intl";

interface ErrorBoundaryFallbackProps {}

const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({
  children,
}) => {
  const history = useHistory();
  const theme = useContext(ThemeContext);

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <Flex
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          {console.log(error)}
          <ShadowCard
            maxWidth="600px"
            padding={theme.spacers.size32}
            maxHeight="700px"
            overflow="auto"
          >
            <Flex width="100%" alignItems="center" justifyContent="center">
              <ErrorIcon size="60px" color={theme.colors.danger} />
            </Flex>
            <Spacer height={theme.spacers.size32} />
            <H1 styledAs="h3">
              <FormattedMessage id="errorBoundary.heading" />
            </H1>
            <Spacer height={theme.spacers.size16} />
            <H2 styledAs="h5">
              <FormattedMessage id="errorBoundary.subHeading" />
            </H2>
            {config.APP_ENV !== "production" ? (
              <>
                <Spacer height={theme.spacers.size32} />
                <Text
                  as="p"
                  fontSize={theme.typography.fontSizes.size18}
                  textAlign="left"
                >
                  The following will not appear in production:
                </Text>
                <Spacer height={theme.spacers.size32} />
                <Text
                  as="p"
                  fontSize={theme.typography.fontSizes.size18}
                  textAlign="left"
                  fontColor={theme.colors.danger}
                >
                  Error: {error.message}
                </Text>
                <Spacer height={theme.spacers.size32} />
                <Text
                  as="p"
                  fontSize={theme.typography.fontSizes.size18}
                  textAlign="left"
                  fontColor={theme.colors.danger}
                >
                  Stack: {error.stack}
                </Text>
              </>
            ) : null}
            <Spacer height={theme.spacers.size32} />
            <Button
              size={SIZES.LARGE}
              handleClick={() => history.push("/")}
              fullWidth
            >
              <FormattedMessage id="notFoundPage.returnHome" />
            </Button>
          </ShadowCard>
        </Flex>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryFallback;
