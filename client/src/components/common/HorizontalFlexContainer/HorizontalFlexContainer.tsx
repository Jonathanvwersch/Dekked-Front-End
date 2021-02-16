import React from "react";
import { createUseStyles } from "react-jss";

interface HorizontalFlexContainerProps {
  border?: string;
  padding?: string;
  backgroundColour?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  width?: string;
}

const HorizontalFlexContainer: React.FC<HorizontalFlexContainerProps> = ({
  children,
  border = "none",
  padding = "0px",
  backgroundColour = "transparent",
  alignItems,
  justifyContent,
  height,
  width,
}) => {
  const useStyles = createUseStyles({
    HorizontalFlexContainer: {
      display: "flex",
      flexDirection: "horizontal",
      border: border ? `${border}` : null,
      padding: padding ? `${padding}` : null,
      backgroundColor: backgroundColour ? `${backgroundColour}` : null,
      alignItems: alignItems ? `${alignItems}` : null,
      justifyContent: justifyContent ? `${justifyContent}` : null,
      height: height ? `${height}` : null,
      width: width ? `${width}` : null,
    },
  });
  const classes = useStyles();
  return <div className={classes.HorizontalFlexContainer}>{children}</div>;
};

export default HorizontalFlexContainer;
