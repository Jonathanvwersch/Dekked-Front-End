import React, { useContext } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { DoubleChevronIcon, DropDownArrowIcon } from "../../assets";
import { ROTATE } from "../../assets/types";
import { SidebarContext } from "../../contexts";
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
  const { handleSidebar } = useContext(SidebarContext);

  return (
    <HorizontalFlexContainer
      className={classes.sidebarTop}
      justifyContent="space-between"
    >
      <HorizontalFlexContainer padding="0px">
        <Avatar>J</Avatar>
        <Spacer width={theme.spacers.size8} />
        <Text>Jane Doe</Text>
        <Spacer width={theme.spacers.size12} />
        <IconActive>
          <DropDownArrowIcon rotate={ROTATE.NINETY} />
        </IconActive>
      </HorizontalFlexContainer>
      <IconActive handleClick={handleSidebar}>
        <DoubleChevronIcon />
      </IconActive>
    </HorizontalFlexContainer>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  sidebarTop: {
    borderBottom: `1px solid ${theme.colors.grey3};`,
  },
}));

export default SidebarTop;
