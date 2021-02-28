import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeType } from "../../../theme";

interface AvatarProps {
  diameter?: string;
  backgroundcolor?: string;
  fontcolor?: string;
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
    minHeight: props.diameter,
    minWidth: props.diameter,
    backgroundColor: props.backgroundcolor || `${theme.colors.primary}`,
    color: props.fontcolor,
  }),
}));

Avatar.defaultProps = {
  diameter: "32px",
  fontcolor: "white",
};

export default Avatar;
