import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../theme";
import { ComponentLoadingSpinner, VerticalFlexContainer } from "../common";
import SidebarBottom from "./SidebarBottom";
import SidebarTop from "./SidebarTop";
import SidebarWorkspace from "./SidebarWorkspace";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    setLoading(false);
  }, [loading]);
  return (
    <VerticalFlexContainer className={classes.sidebar}>
      {!loading ? (
        <>
          <SidebarTop />
          <SidebarWorkspace />
          <SidebarBottom />
        </>
      ) : (
        <ComponentLoadingSpinner />
      )}
    </VerticalFlexContainer>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  sidebar: {
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
    backgroundColor: `${theme.colours.beige}`,
  },
}));

export default Sidebar;
