import classes from "*.module.css";
import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { PlusIcon } from "../../assets";
import { ThemeType } from "../../theme";
import HorizontalFlexContainer from "../common/HorizontalFlexContainer/HorizontalFlexContainer";
import IconWrapper from "../common/IconWrapper/IconWrapper";
import Spacer from "../common/Spacer/Spacer";
import Text from "../common/Text/Text";

interface SidebarBottomProps {}

const SidebarBottom: React.FC<SidebarBottomProps> = ({}) => {
  const theme: ThemeType = useTheme();
  const classes = useStyles({ theme });
  return (
    <div
      role="button"
      aria-label="sidebar bottom"
      className={classes.sidebarBottom}
    >
      <HorizontalFlexContainer height="100%">
        <IconWrapper>
          <PlusIcon />
        </IconWrapper>
        <Spacer width={theme.spacers.size8} />
        <Text fontSize={theme.typography.fontSizes.size16}>Add folder</Text>
      </HorizontalFlexContainer>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  sidebarBottom: {
    borderTop: `2px solid ${theme.colours.grey3};`,
    width: "100%",
    height: "50px",
    cursor: "pointer",
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
