import React from "react";
import { createUseStyles, useTheme } from "react-jss";

interface HFlexProps {
  padding?: string;
  backgroundcolor?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  width?: string;
  cursor?: string;
  position?: string;
  className?: string;
}

const HFlex: React.FC<HFlexProps> = ({ children, ...props }) => {
  const theme = useTheme();
  const { hFlex } = useStyles({ theme, ...props });
  return <div className={`${hFlex} ${props.className}`}>{children}</div>;
};

const useStyles = createUseStyles({
  hFlex: (props) => ({
    display: "flex",
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    position: props.position,
    height: props.height,
    width: props.width,
    cursor: props.cursor,
    backgroundColor: props.backgroundcolor,
    padding: props.padding,
  }),
});

HFlex.defaultProps = {
  alignItems: "center",
  width: "100%",
  padding: "16px",
};

export default HFlex;
