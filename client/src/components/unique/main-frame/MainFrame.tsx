import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";
import { ComponentLoadingSpinner, Page, VFlex } from "../../common";
import TopBar from "../topbar/Topbar";

const MainFrame: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    setLoading(false);
  }, [loading]);
  return !loading ? (
    <VFlex className={classes.mainFrame}>
      <TopBar />
      <Page>{children}</Page>
    </VFlex>
  ) : (
    <ComponentLoadingSpinner />
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  mainFrame: {
    overflow: "auto",
    background: `${theme.colors.backgrounds.pageBackground}`,
    height: "100%",
    maxHeight: "100%",
    flexGrow: "1",
    flexShrink: "1",
    width: "auto",
  },
}));

export default MainFrame;
