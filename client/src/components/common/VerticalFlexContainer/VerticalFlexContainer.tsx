import React from "react";
import { createUseStyles, useTheme } from "react-jss";

interface VerticalFlexContainerProps {
  padding?: string;
  backgroundcolor?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  width?: string;
  cursor?: string;
  position?: string;
  overflow?: string;
  className?: string;
  flexGrow?: string;
}

const VerticalFlexContainer: React.FC<VerticalFlexContainerProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme, ...props });
  return (
    <div
      className={`${classes.vFlexContainer} ${
        props.className && props.className
      }`}
    >
      {children}
    </div>
  );
};

const useStyles = createUseStyles((theme) => ({
  vFlexContainer: (props) => ({
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    flexGrow: props.flexGrow,
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    position: props.position,
    height: props.height,
    width: props.width,
    cursor: props.cursor,
    backgroundColor: props.backgroundcolor,
    overflow: props.overflow,
    padding: props.padding,
  }),
}));

VerticalFlexContainer.defaultProps = {
  alignItems: "center",
  width: "100%",
};

export default VerticalFlexContainer;
