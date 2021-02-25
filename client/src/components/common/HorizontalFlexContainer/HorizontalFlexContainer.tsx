import React from "react";
import { createUseStyles, useTheme } from "react-jss";

interface HorizontalFlexContainerProps {
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

const HorizontalFlexContainer: React.FC<HorizontalFlexContainerProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  const { hFlexContainer } = useStyles({ theme, ...props });
  return (
    <div className={`${hFlexContainer} ${props.className}`}>{children}</div>
  );
};

const useStyles = createUseStyles({
  hFlexContainer: (props) => ({
    display: "flex",
    boxSizing: "border-box",
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

HorizontalFlexContainer.defaultProps = {
  alignItems: "center",
  width: "100%",
  padding: "16px",
};

export default HorizontalFlexContainer;
