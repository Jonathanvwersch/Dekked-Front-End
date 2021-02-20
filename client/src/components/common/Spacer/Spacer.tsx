import React from "react";
import { createUseStyles } from "react-jss";

interface SpacerProps {
  width?: string;
  height?: string;
  grow?: string;
  shrink?: string;
}

const Spacer: React.FC<SpacerProps> = ({ ...props }) => {
  const classes = useStyles(props);
  return <div className={classes.spacer}></div>;
};

const useStyles = createUseStyles({
  spacer: (props) => ({
    minWidth: props.width,
    minHeight: props.height,
    grow: props.grow,
    shrink: props.shrink,
  }),
});

Spacer.defaultProps = {
  width: "1px",
  height: "1px",
  grow: "0",
  shrink: "1",
};

export default Spacer;
