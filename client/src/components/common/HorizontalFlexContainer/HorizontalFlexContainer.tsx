import React from "react";
import { createUseStyles, useTheme } from "react-jss";

interface HorizontalFlexContainerProps {
  padding?: string;
  backgroundColour?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  width?: string;
  cursor?: string;
  position?: string;
}

const HorizontalFlexContainer: React.FC<HorizontalFlexContainerProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme, ...props });
  return <div className={classes.HorizontalFlexContainer}>{children}</div>;
};

const useStyles = createUseStyles((theme) => ({
  HorizontalFlexContainer: (props) => ({
    display: "flex",
    boxSizing: "border-box",
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    position: props.position,
    height: props.height,
    width: props.width,
    cursor: props.cursor,
    backgroundColor: props.backgroundColour,
    padding: props.padding,
  }),
}));

HorizontalFlexContainer.defaultProps = {
  alignItems: "center",
  width: "100%",
};

export default HorizontalFlexContainer;
