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
import { useHistory, withRouter } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { config } from "../../../config";
import { FormattedMessage } from "react-intl";
import { InternalLink } from "..";

interface ErrorBoundaryFallbackProps {}

const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({
  children,
}) => {
  const history = useHistory();
  const theme = useContext(ThemeContext);

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Flex
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          {console.error(error)}
          <ShadowCard
            maxWidth="600px"
            padding={theme.spacers.size32}
            maxHeight="700px"
            margin={theme.spacers.size32}
            overflow="hidden auto"
          >
            <Flex width="100%" alignItems="center" justifyContent="center">
              <ErrorIcon size="40px" color={theme.colors.danger} />
            </Flex>
            <Spacer height={theme.spacers.size32} />
            <H1 styledAs="h5" textAlign="center">
              <FormattedMessage id="errorPage.mainMessage" />
            </H1>
            <Spacer height={theme.spacers.size16} />
            <H2 styledAs="h6" textAlign="center">
              <FormattedMessage id="errorPage.subMessage" />
              <InternalLink
                to="mailto:team@dekked.com"
                type="email"
                fontSize="inherit"
                textDecoration="underline"
              >
                team@dekked.com
              </InternalLink>
              .
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
                  as="pre"
                  fontSize={theme.typography.fontSizes.size18}
                  textAlign="left"
                  fontColor={theme.colors.danger}
                  whiteSpace="break-spaces"
                >
                  {error.stack}
                </Text>
              </>
            ) : null}
            <Spacer height={theme.spacers.size32} />
            <Button
              size={SIZES.LARGE}
              handleClick={() => {
                resetErrorBoundary();
                history.push("/");
              }}
              fullWidth
            >
              <FormattedMessage id="errorBoundary.returnHome" />
            </Button>
          </ShadowCard>
        </Flex>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default withRouter(ErrorBoundaryFallback);
