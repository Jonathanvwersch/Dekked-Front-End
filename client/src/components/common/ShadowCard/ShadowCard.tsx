import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";

interface ShadowCardProps {
  borderRadius?: string;
  boxShadow?: string;
  height?: string;
  width?: string;
}

const ShadowCard: React.FC<ShadowCardProps> = ({ children, ...props }) => {
  const { shadowCard } = useStyles({ ...props });
  return <div className={shadowCard}>{children}</div>;
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  shadowCard: (props) => ({
    boxShadow: props.boxShadow ? props.boxShadow : `${theme.boxShadow}`,
    borderRadius: props.borderRadius
      ? props.borderRadius
      : `${theme.display.borderRadiusTwo}`,
    height: props.height,
    width: props.width,
  }),
}));

ShadowCard.defaultProps = {};

export default ShadowCard;
