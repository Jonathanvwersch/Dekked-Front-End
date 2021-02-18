import React from "react";
import { createUseStyles, useTheme } from "react-jss";

interface VerticalFlexContainerProps {
  padding?: string;
  backgroundColour?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  width?: string;
  cursor?: string;
  position?: string;
}

const VerticalFlexContainer: React.FC<VerticalFlexContainerProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme, ...props });
  return <div className={classes.VerticalFlexContainer}>{children}</div>;
};

const useStyles = createUseStyles((theme) => ({
  VerticalFlexContainer: (props) => ({
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    position: props.position,
    height: props.height,
    width: props.width,
    cursor: props.cursor,
    backgroundColor: props.backgroundColour,
  }),
}));

VerticalFlexContainer.defaultProps = {
  alignItems: "center",
};

export default VerticalFlexContainer;
