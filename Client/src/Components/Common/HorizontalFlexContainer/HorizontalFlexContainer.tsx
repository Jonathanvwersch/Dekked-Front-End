import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";

interface HorizontalFlexContainerProps {
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

const HorizontalFlexContainer: React.FC<HorizontalFlexContainerProps> = ({
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
  const useStyles = createUseStyles((theme: ThemeType) => ({
    HorizontalFlexContainer: {
      display: "flex",
      flexDirection: "horizontal",
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
  }));
  const classes = useStyles();
  return <div className={classes.HorizontalFlexContainer}>{children}</div>;
};

export default HorizontalFlexContainer;
