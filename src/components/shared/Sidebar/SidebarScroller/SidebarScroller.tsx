import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { usePageSetupHelpers } from "../../../../hooks";
import { useIntl } from "react-intl";
import { VFlex, Text, Card, Scroller } from "../../../common";

interface SidebarScrollerProps {
  heading: string;
}

const SidebarScroller: React.FC<SidebarScrollerProps> = ({
  heading,
  children,
}) => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers(ThemeContext, intl);

  return (
    <>
      <Card padding={`${theme.spacers.size8} ${theme.spacers.size16}`}>
        <Text
          fontSize={theme.typography.fontSizes.size14}
          fontColor={theme.colors.grey1}
        >
          {formatMessage(heading)}
        </Text>
      </Card>
      <Scroller>
        <VFlex>{children}</VFlex>
      </Scroller>
    </>
  );
};

export default SidebarScroller;
