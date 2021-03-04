import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";
import { VFlex } from "../../common";

const Page: React.FC = ({ children }) => {
  const classes = useStyles();

  return <VFlex className={classes.page}>{children}</VFlex>;
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  page: {
    paddingLeft: "calc(75px + env(safe-area-inset-left))",
    paddingRight: "calc(75px + env(safe-area-inset-right))",
    background: `${theme.colors.backgrounds.pageBackground}`,
  },
}));

export default Page;
