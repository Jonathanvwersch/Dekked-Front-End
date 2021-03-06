import React, { useContext } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { DoubleChevronIcon, DropDownArrowIcon } from "../../../assets";
import { ROTATE } from "../../../assets/types";
import { SidebarContext } from "../../../contexts";
import { ThemeType } from "../../../theme";
import { Avatar, HFlex, IconActive, Spacer, Text } from "../../common";

interface SidebarTopProps {}

const SidebarTop: React.FC<SidebarTopProps> = () => {
  const theme: ThemeType = useTheme();
  const classes = useStyles();
  const { handleSidebar } = useContext(SidebarContext);

  return (
    <HFlex className={classes.sidebarTop}>
      <HFlex padding="0px">
        <Avatar>T</Avatar>
        <Spacer width={theme.spacers.size8} />
        <Text overflowText={true}>This is a really long name</Text>
        <IconActive>
          <DropDownArrowIcon rotate={ROTATE.NINETY} />
        </IconActive>
        <Spacer width={theme.spacers.size32} />
      </HFlex>
      <IconActive className={classes.minimiseIcon} handleClick={handleSidebar}>
        <DoubleChevronIcon />
      </IconActive>
    </HFlex>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  sidebarTop: {
    position: "relative",
  },
  minimiseIcon: {
    position: "absolute",
    right: "16px",
  },
}));

export default SidebarTop;
