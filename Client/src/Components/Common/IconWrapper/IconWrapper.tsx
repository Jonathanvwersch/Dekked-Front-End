import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";

interface IconWrapperProps {}

const IconWrapper: React.FC<IconWrapperProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.IconWrapper}>{children}</div>;
};

export const useStyles = createUseStyles({
  IconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconWrapper;
