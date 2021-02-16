import React from "react";
import { createUseStyles } from "react-jss";
import { theme } from "../../../theme";
import { ThemeType } from "../../../theme";

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
  const useStyles = createUseStyles((theme: ThemeType) => ({
    Avatar: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      fontFamily: theme.typography.fontFamily,
      width: `${diameter}`,
      backgroundColor: `${backgroundColour}`,
      height: `${diameter}`,
      color: `${fontColour}`,
    },
  }));
  const classes = useStyles();
  return <div className={classes.Avatar}>{children}</div>;
};

export default Avatar;
