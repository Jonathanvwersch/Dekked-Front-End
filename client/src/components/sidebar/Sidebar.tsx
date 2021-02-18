import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { DoubleChevronIcon, DropDownArrowIcon, PlusIcon } from "../../assets";
import { ThemeType } from "../../theme";
import Avatar from "../common/Avatar/Avatar";
import HorizontalFlexContainer from "../common/HorizontalFlexContainer/HorizontalFlexContainer";
import Spacer from "../common/Spacer/Spacer";
import VerticalFlexContainer from "../common/VerticalFlexContainer/VerticalFlexContainer";
import Text from "../common/Text/Text";
import IconWrapper from "../common/IconWrapper/IconWrapper";
import { ROTATE } from "../../assets/types";

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
            <IconWrapper>
              <Avatar>J</Avatar>
            </IconWrapper>
            <Spacer width={theme.spacers.size8} />
            <Text>Jane Doe</Text>
            <Spacer width={theme.spacers.size12} />
            <IconWrapper>
              <DropDownArrowIcon />
            </IconWrapper>
          </HorizontalFlexContainer>
          <DoubleChevronIcon />
        </HorizontalFlexContainer>
        <HorizontalFlexContainer padding="8px 16px">
          <Text fontColour={theme.colours.grey1}>Workspace</Text>
        </HorizontalFlexContainer>
        <HorizontalFlexContainer></HorizontalFlexContainer>
        <HorizontalFlexContainer
          cursor="pointer"
          alignItems="center"
          height="40px"
          padding="16px"
        >
          <IconWrapper>
            <PlusIcon active={false} />
          </IconWrapper>
          <Spacer width={theme.spacers.size8} />
          <Text fontSize={theme.typography.fontSizes.size14}>Add folder</Text>
        </HorizontalFlexContainer>
        <VerticalFlexContainer></VerticalFlexContainer>
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
    position: "fixed",
    top: "0px",
    left: "0px",
    bottom: "0px",
    height: "100%",
    maxHeight: "100%",
    borderRight: `0.5px solid ${theme.colours.grey3}`,
  },
}));
