import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";
import { VFlex } from "..";

const Page: React.FC = ({ children }) => {
  const classes = useStyles();

  return <VFlex className={classes.page}>{children}</VFlex>;
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  page: {
    paddingLeft: "calc(100px + env(safe-area-inset-left))",
    paddingRight: "calc(100px + env(safe-area-inset-right))",
    background: `${theme.colors.backgrounds.pageBackground}`,
    maxWidth: "100%",
    width: "1100px",
  },
}));

export default Page;
