import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";

interface IconWrapperProps {}

const IconWrapper: React.FC<IconWrapperProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.IconWrapper}>{children}</div>;
};

export default IconWrapper;

export const useStyles = createUseStyles((theme: ThemeType) => ({
  IconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
