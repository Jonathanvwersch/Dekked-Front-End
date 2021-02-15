import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeType } from "../../../theme";
import { theme } from "../../../theme";

interface AvatarProps {
  diameter?: string;
  backgroundColour?: string;
  fontColour?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  children,
  backgroundColour = theme.colours.primary,
  diameter = "28px",
  fontColour = "white",
}) => {
  const useStyles = createUseStyles({
    Avatar: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      width: `${diameter}`,
      backgroundColor: `${backgroundColour}`,
      height: `${diameter}`,
      color: `${fontColour}`,
    },
  });
  const classes = useStyles();
  return <div className={classes.Avatar}>{children}</div>;
};

export default Avatar;
