import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeType } from "../../../theme";

interface AvatarProps {
  diameter?: string;
  backgroundColour?: string;
  fontColour?: string;
}

const Avatar: React.FC<AvatarProps> = ({ children, ...props }) => {
  const theme = useTheme();
  const classes = useStyles({ theme, ...props });
  return <div className={classes.avatar}>{children}</div>;
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  avatar: (props) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    fontFamily: `${theme.typography.fontFamily}`,
    fontWeight: `${theme.typography.fontWeights.bold}`,
    height: props.diameter,
    width: props.diameter,
    backgroundColor: props.backgroundColour || `${theme.colours.primary}`,
    color: props.fontColour,
  }),
}));

Avatar.defaultProps = {
  diameter: "32px",
  fontColour: "white",
};

export default Avatar;
