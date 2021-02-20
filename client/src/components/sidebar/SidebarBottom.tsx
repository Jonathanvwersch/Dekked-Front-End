import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { PlusIcon } from "../../assets";
import { ThemeType } from "../../theme";
import HorizontalFlexContainer from "../common/HorizontalFlexContainer/HorizontalFlexContainer";
import HoverCard from "../common/HoverCard/HoverCard";
import IconWrapper from "../common/IconWrapper/IconWrapper";
import Spacer from "../common/Spacer/Spacer";
import Text from "../common/Text/Text";

interface SidebarBottomProps {}

const SidebarBottom: React.FC<SidebarBottomProps> = () => {
  const theme: ThemeType = useTheme();
  const classes = useStyles({ theme });
  return (
    <HoverCard className={classes.sidebarBottom}>
      <HorizontalFlexContainer height="100%">
        <IconWrapper>
          <PlusIcon />
        </IconWrapper>
        <Spacer width={theme.spacers.size8} />
        <Text fontSize={theme.typography.fontSizes.size16}>Add folder</Text>
      </HorizontalFlexContainer>
    </HoverCard>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  sidebarBottom: {
    borderTop: `1px solid ${theme.colours.grey3};`,
    height: "50px",
    zIndex: "10",
    position: "absolute",
    bottom: "0",
    backgroundColor: `${theme.colours.beige}`,
    "&:hover": {
      backgroundColor: `${theme.colours.hover.beigeHover}`,
    },
    "&:focus": {
      backgroundColor: `${theme.colours.hover.beigeHover}`,
    },
    "&:active": {
      backgroundColor: `${theme.colours.beige}`,
    },
  },
}));

export default SidebarBottom;
