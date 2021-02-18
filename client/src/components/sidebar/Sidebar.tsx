import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeType } from "../../theme";
import VerticalFlexContainer from "../common/VerticalFlexContainer/VerticalFlexContainer";
import SidebarTop from "./SidebarTop";
import SidebarBottom from "./SidebarBottom";
import SidebarWorkspace from "./SidebarWorkspace";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const classes = useStyles();
  const theme: ThemeType = useTheme();
  return (
    <div className={classes.Sidebar}>
      <VerticalFlexContainer backgroundColour={theme.colours.beige}>
        <SidebarTop />
        <SidebarWorkspace />
        <SidebarBottom />
      </VerticalFlexContainer>
    </div>
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
    borderRight: `1px solid ${theme.colours.grey3}`,
  },
}));
