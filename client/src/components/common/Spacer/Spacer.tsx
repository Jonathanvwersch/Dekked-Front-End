import React from "react";
import { createUseStyles } from "react-jss";

interface SpacerProps {
  width?: string;
  height?: string;
  grow?: string;
  shrink?: string;
}

const Spacer: React.FC<SpacerProps> = ({
  width = "1px",
  height = "1px",
  grow = "0",
  shrink = "1",
}) => {
  const useStyles = createUseStyles({
    Spacer: {
      width: width ? `${width}` : null,
      height: height ? `${height}` : null,
      flexGrow: grow ? `${grow}` : null,
      flexShrink: shrink ? `${shrink}` : null,
    },
  });

  const classes = useStyles();
  return <div className={classes.Spacer}></div>;
};

export default Spacer;
