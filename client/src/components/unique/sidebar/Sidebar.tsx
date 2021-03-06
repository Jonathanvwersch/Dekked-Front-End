import React, { useContext, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { SidebarContext } from "../../../contexts";
import { ThemeType } from "../../../theme";
import { ComponentLoadingSpinner, VFlex } from "../../common";
import SidebarBottom from "./SidebarBottom";
import SidebarTop from "./SidebarTop";
import SidebarWorkspace from "./SidebarWorkspace";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const { sidebar } = useContext(SidebarContext);

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  return sidebar ? (
    <VFlex className={classes.sidebar}>
      {!loading ? (
        <>
          <SidebarTop />
          {/* <Divider /> */}
          <SidebarWorkspace />
          <SidebarBottom />
        </>
      ) : (
        <ComponentLoadingSpinner />
      )}
    </VFlex>
  ) : null;
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  sidebar: {
    width: "250px",
    userSelect: "none",
    zIndex: "10",
    position: "relative",
    top: "0px",
    left: "0px",
    bottom: "0px",
    height: "100%",
    maxHeight: "100%",
    borderRight: `1px solid ${theme.colors.grey3}`,
    backgroundColor: `${theme.colors.secondary}`,
  },
}));

export default Sidebar;
