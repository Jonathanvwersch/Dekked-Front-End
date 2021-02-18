import classes from "*.module.css";
import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { DoubleChevronIcon, DropDownArrowIcon } from "../../assets";
import { ThemeType } from "../../theme";
import Avatar from "../common/Avatar/Avatar";
import HorizontalFlexContainer from "../common/HorizontalFlexContainer/HorizontalFlexContainer";
import IconActive from "../common/IconActive/IconActive";
import Spacer from "../common/Spacer/Spacer";
import Text from "../common/Text/Text";

interface SidebarTopProps {}

const SidebarTop: React.FC<SidebarTopProps> = ({}) => {
  const theme: ThemeType = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.sidebarTop}>
      <HorizontalFlexContainer justifyContent="space-between">
        <HorizontalFlexContainer padding="0px">
          <Avatar>J</Avatar>
          <Spacer width={theme.spacers.size8} />
          <Text>Jane Doe</Text>
          <Spacer width={theme.spacers.size12} />
          <IconActive>
            <DropDownArrowIcon />
          </IconActive>
        </HorizontalFlexContainer>
        <IconActive>
          <DoubleChevronIcon />
        </IconActive>
      </HorizontalFlexContainer>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  sidebarTop: {
    borderBottom: `2px solid ${theme.colours.grey3};`,
    width: "100%",
  },
}));

export default SidebarTop;
