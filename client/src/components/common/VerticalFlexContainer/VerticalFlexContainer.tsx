import React from "react";
import { createUseStyles } from "react-jss";

interface VerticalFlexContainerProps {
  border?: string;
  padding?: string;
  backgroundColour?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  width?: string;
}

const VerticalFlexContainer: React.FC<VerticalFlexContainerProps> = ({
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
    VerticalFlexContainer: {
      display: "flex",
      flexDirection: "column",
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
  return <div className={classes.VerticalFlexContainer}>{children}</div>;
};

export default VerticalFlexContainer;
