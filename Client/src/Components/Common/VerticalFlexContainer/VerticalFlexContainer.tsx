import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";

interface VerticalFlexContainerProps {
  border?: string;
  padding?: string;
  backgroundColour?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  width?: string;
  hover?: string;
  pressed?: string;
}

const VerticalFlexContainer: React.FC<VerticalFlexContainerProps> = ({
  children,
  border = "none",
  padding = "0px",
  backgroundColour = "fff",
  alignItems,
  justifyContent,
  height,
  width,
  hover,
  pressed,
}) => {
  const useStyles = createUseStyles({
    VerticalFlexContainer: {
      display: "flex",
      flexDirection: "column",
      border: `${border}`,
      padding: `${padding}`,
      backgroundColour: `${backgroundColour}`,
      alignItems: `${alignItems}`,
      justifyContent: `${justifyContent}`,
      height: `${height}`,
      width: `${width}`,
      hover: `${hover}`,
      pressed: `${pressed}`,
    },
  });
  const classes = useStyles();
  return <div className={classes.VerticalFlexContainer}>{children}</div>;
};

export default VerticalFlexContainer;
