// Wrapper component for whenever you want to add a hover and active state to another component
import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";

interface HoverCardProps {
  hover?: string;
  pressed?: string;
  width?: string;
  height?: string;
  className?: string;
  backgroundColor?: string;
  handleClick?: () => void;
}

const HoverCard: React.FC<HoverCardProps> = ({ children, ...props }) => {
  const classes = useStyles({ ...props });
  return (
    <div
      className={`${classes.hoverCard} ${props.className}`}
      role="button"
      tab-index="0"
      onClick={props.handleClick}
    >
      {children}
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  hoverCard: (props) => ({
    width: props.width,
    backgroundColor: props.backgroundColor
      ? props.backgroundColor
      : `${theme.colors.secondary}`,
    cursor: "pointer",
    userSelect: "none",
    "&:hover": {
      filter: `${theme.colors.hover.filter}`,
    },
    "&:focus": {
      filter: `${theme.colors.hover.filter}`,
    },
    "&:active": {
      filter: `${theme.colors.active.filter}`,
    },
  }),
}));

HoverCard.defaultProps = {
  width: "100%",
};

export default HoverCard;
