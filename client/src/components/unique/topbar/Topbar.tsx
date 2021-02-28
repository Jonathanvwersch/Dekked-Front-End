import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import { HamburgerMenuIcon } from "../../../assets";
import { SidebarContext } from "../../../contexts";
import { ThemeType } from "../../../theme";
import { HFlex, IconActive } from "../../common";

const TopBar: React.FC = () => {
  const { sidebar, handleSidebar } = useContext(SidebarContext);
  const classes = useStyles();
  return (
    <HFlex className={classes.topbar}>
      {!sidebar ? (
        <IconActive handleClick={handleSidebar}>
          <HamburgerMenuIcon size="24px" />
        </IconActive>
      ) : null}
    </HFlex>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  topbar: {
    background: `${theme.colors.backgrounds.pageBackground}`,
    height: "65px",
    zIndex: "1000",
    position: "sticky",
    top: "0",
    userSelect: "none",
    justifyContent: "flex-start",
  },
}));

export default TopBar;
