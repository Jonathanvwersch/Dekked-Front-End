import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { DoubleChevronIcon, DropDownArrowIcon } from "../../assets";
import { ROTATE } from "../../assets/types";
import { ThemeType } from "../../theme";
import {
  Avatar,
  HorizontalFlexContainer,
  IconActive,
  Spacer,
  Text,
} from "../common";

interface SidebarTopProps {}

const SidebarTop: React.FC<SidebarTopProps> = () => {
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
            <DropDownArrowIcon rotate={ROTATE.NINETY} />
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
    borderBottom: `1px solid ${theme.colours.grey3};`,
    width: "100%",
  },
}));

export default SidebarTop;
