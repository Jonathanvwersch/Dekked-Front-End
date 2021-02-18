import React from "react";
import { createUseStyles } from "react-jss";

interface IconWrapperProps {}

const IconWrapper: React.FC<IconWrapperProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.iconWrapper}>{children}</div>;
};

export const useStyles = createUseStyles({
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconWrapper;
