import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";

interface IconActiveProps {}

const IconActive: React.FC<IconActiveProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <button aria-label="icon" className={classes.iconActive}>
      {children}
    </button>
  );
};

export const useStyles = createUseStyles((theme: ThemeType) => ({
  iconActive: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
    padding: "0",
    border: "none",
    background: "none",
    cursor: "pointer",
    outline: "none",

    "& svg": {
      "&:hover": {
        "& path": {
          fill: `${theme.colours.hover.primaryHover}`,
        },
      },

      "&:active": {
        "& path": {
          fill: `${theme.colours.offBlack}!important`,
        },
      },
    },
  },
}));

export default IconActive;
