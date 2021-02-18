import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeType } from "../../../theme";

interface TextProps {
  fontSize?: string;
  fontWeight?: string;
  fontColour?: string;
  fontFamily?: string;
  margin?: string;
}

const Text: React.FC<TextProps> = ({ children, ...props }) => {
  const theme = useTheme();
  const classes = useStyles({ theme, ...props });
  return <p className={classes.text}>{children}</p>;
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  text: (props) => ({
    fontSize: props.fontSize || `${theme.typography.fontSizes.size12}`,
    fontWeight: props.fontWeight || `${theme.typography.fontWeights.normal}`,
    color: props.fontColour || `${theme.colours.offBlack}`,
    fontFamily: `${theme.typography.fontFamily}`,
    margin: props.margin,
  }),
}));

Text.defaultProps = {
  margin: "0",
};

export default Text;
