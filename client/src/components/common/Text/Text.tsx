import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";

interface TextProps {
  fontSize?: string;
  fontWeight?: string;
  fontColour?: string;
  fontFamily?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  fontFamily,
  fontSize,
  fontWeight,
  fontColour,
}) => {
  const useStyles = createUseStyles((theme: ThemeType) => ({
    Text: {
      fontFamily: fontFamily ? fontFamily : theme.typography.fontFamily,
      fontWeight: fontWeight ? fontWeight : theme.typography.fontWeight,
      color: fontColour ? fontColour : theme.colours.fontColour,
      fontSize: fontSize ? fontSize : theme.typography.fontSizes.size12,
      display: "flex",
    },
  }));
  const classes = useStyles();
  return <p className={classes.Text}>{children}</p>;
};

export default Text;
