import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../theme";
import VerticalFlexContainer from "../common/VerticalFlexContainer/VerticalFlexContainer";
import SidebarTop from "./SidebarTop";
import SidebarBottom from "./SidebarBottom";
import SidebarWorkspace from "./SidebarWorkspace";
import { ComponentLoadingSpinner } from "../common/LoadingSpinner/LoadingSpinner";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  return (
    <div className={classes.Sidebar}>
      {!loading ? (
        <VerticalFlexContainer>
          <SidebarTop />
          <SidebarWorkspace />
          <SidebarBottom />
        </VerticalFlexContainer>
      ) : (
        <ComponentLoadingSpinner />
      )}
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
    backgroundColor: `${theme.colours.beige}`,
    borderRight: `1px solid ${theme.colours.grey3}`,
  },
}));
