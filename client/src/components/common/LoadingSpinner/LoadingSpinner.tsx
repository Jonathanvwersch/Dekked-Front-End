import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { LogoIcon } from "../../../assets";
import { ThemeType } from "../../../theme";
import IconWrapper from "../IconWrapper/IconWrapper";

export const ComponentLoadingSpinner: React.FC = () => {
  const classes = useStyles();
  const theme: ThemeType = useTheme();

  return (
    <div className={classes.component}>
      <IconWrapper>
        <LogoIcon
          className={classes.animate}
          colour={theme.colours.primary}
          size="24px"
        />
      </IconWrapper>
    </div>
  );
};

export const FullPageLoadingSpinner: React.FC = () => {
  const classes = useStyles();
  const theme: ThemeType = useTheme();

  return (
    <div className={classes.fullPage}>
      <IconWrapper>
        <LogoIcon
          className={classes.animate}
          colour={theme.colours.primary}
          size="24px"
        />
      </IconWrapper>
    </div>
  );
};

export const useStyles = createUseStyles(
  {
    fullPage: {
      inset: "0",
      position: "fixed",
      zIndex: "10",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    component: {
      height: "100%",
      width: "100%",
      zIndex: "10",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "@keyframes spin": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },

    animate: {
      animationName: "$spin",
      animationDuration: "500ms",
      animationIterationCount: "infinite",
      animationTimingFunction: "linear",
    },
  },
  { name: "LoadingSpinner" }
);