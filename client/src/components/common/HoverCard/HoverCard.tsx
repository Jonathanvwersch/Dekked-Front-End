import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";

interface HoverCardProps {
  hover?: string;
  pressed?: string;
  width?: string;
  height?: string;
  className?: string;
  handleClick?: () => void;
}

const HoverCard: React.FC<HoverCardProps> = ({ children, ...props }) => {
  const classes = useStyles({ ...props });
  return (
    <div
      className={`${classes.hoverCard} ${props.className}`}
      role="button"
      aria-label="block"
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
    cursor: "pointer",
    "&:hover": {
      backgroundColor: `${
        props.hover ? props.hover : theme.colours.hover.beigeHover
      }`,
    },
    "&:focus": {
      backgroundColor: `${
        props.hover ? props.hover : theme.colours.hover.beigeHover
      }`,
    },
    "&:active": {
      backgroundColor: `${props.hover ? props.hover : theme.colours.beige}`,
    },
  }),
}));

HoverCard.defaultProps = {
  width: "100%",
};

export default HoverCard;
