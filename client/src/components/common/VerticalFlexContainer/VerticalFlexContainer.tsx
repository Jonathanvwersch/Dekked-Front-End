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
  overflow?: string;
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
    overflow: props.overflow,
  }),
}));

VerticalFlexContainer.defaultProps = {
  alignItems: "center",
  height: "100%",
  width: "100%",
};

export default VerticalFlexContainer;
