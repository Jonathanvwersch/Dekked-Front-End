import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { ThemeType } from "../../../../styles/theme";
import { VFlex, Text, Card, Scroller } from "../../../common";

interface SidebarScrollerProps {
  heading: string;
}

const SidebarScroller: React.FC<SidebarScrollerProps> = ({
  heading,
  children,
}) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <>
      <Card padding={`${theme.spacers.size8} ${theme.spacers.size16}`}>
        <Text
          fontSize={theme.typography.fontSizes.size14}
          fontColor={theme.colors.grey1}
        >
          {heading}
        </Text>
      </Card>
      <Scroller>
        <VFlex>{children}</VFlex>
      </Scroller>
    </>
  );
};

export default SidebarScroller;
