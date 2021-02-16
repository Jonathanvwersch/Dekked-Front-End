import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { DoubleChevronIcon, DropDownArrowIcon } from "../../assets";
import { ThemeType } from "../../theme";
import Avatar from "../common/Avatar/Avatar";
import HorizontalFlexContainer from "../common/HorizontalFlexContainer/HorizontalFlexContainer";
import Spacer from "../common/Spacer/Spacer";
import VerticalFlexContainer from "../common/VerticalFlexContainer/VerticalFlexContainer";
import Text from "../common/Text/Text";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const classes = useStyles();
  const theme: ThemeType = useTheme();
  return (
    <nav className={classes.Sidebar}>
      <VerticalFlexContainer
        height="100%"
        width="100%"
        backgroundColour={theme.colours.beige}
      >
        <HorizontalFlexContainer
          alignItems="center"
          padding="16px"
          justifyContent="space-between"
        >
          <HorizontalFlexContainer alignItems="center">
            <Avatar>J</Avatar>
            <Spacer width="8px" />
            <Text>Jane Doe</Text>
            <Spacer width="12px" />
            <DropDownArrowIcon />
          </HorizontalFlexContainer>
          <DoubleChevronIcon />
        </HorizontalFlexContainer>
        <VerticalFlexContainer>
          <HorizontalFlexContainer></HorizontalFlexContainer>
        </VerticalFlexContainer>
        <HorizontalFlexContainer></HorizontalFlexContainer>
      </VerticalFlexContainer>
    </nav>
  );
};

export default Sidebar;

export const useStyles = createUseStyles((theme: ThemeType) => ({
  Sidebar: {
    width: "250px",
    userSelect: "none",
    zIndex: "10",
    position: "absolute",
    top: "0px",
    left: "0px",
    bottom: "0px",
    height: "100%",
    maxHeight: "100%",
    borderRight: `0.5px solid ${theme.colours.grey3}`,
  },
}));
