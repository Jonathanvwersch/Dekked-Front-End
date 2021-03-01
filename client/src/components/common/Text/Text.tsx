import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeType } from "../../../theme";

interface TextProps {
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  fontFamily?: string;
  margin?: string;
  overflowText?: boolean;
  className?: string;
  editableText?: boolean;
  textRef?: React.RefObject<HTMLDivElement>;
}

const Text: React.FC<TextProps> = ({ children, ...props }) => {
  const theme = useTheme();
  const classes = useStyles({ theme, ...props });
  const className = props.overflowText
    ? `${classes.text} ${classes.overflow} ${props.className}`
    : `${classes.text} ${props.className}`;
  return (
    <div
      contentEditable={props.editableText}
      spellCheck={false}
      className={className}
      ref={props.textRef}
    >
      {children}
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  text: (props) => ({
    fontSize: props.fontSize || `${theme.typography.fontSizes.size12}`,
    fontWeight: props.fontWeight,
    color: props.fontColor || `${theme.colors.fontColor}`,
    fontFamily: props.fontFamily,
    margin: props.margin,
  }),
  overflow: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

Text.defaultProps = {
  margin: "0",
};

export default Text;
