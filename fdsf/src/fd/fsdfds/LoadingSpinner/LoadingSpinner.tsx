import React from "react";
import { LogoIcon } from "../../../Icons";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeType } from "../../../theme";
import IconWrapper from "../IconWrapper/IconWrapper";

export const ComponentLoadingSpinner: React.FC = () => {
  const classes = useStyles();
  const theme: ThemeType = useTheme();

  return (
    <div className={classes.ComponentSpinner}>
      <IconWrapper>
        <LogoIcon
          className={classes.LogoAnimations}
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
    <div className={classes.ComponentSpinner}>
      <IconWrapper>
        <LogoIcon
          className={classes.LogoAnimations}
          colour={theme.colours.primary}
          size="24px"
        />
      </IconWrapper>
    </div>
  );
};

export const useStyles = createUseStyles({
  FullPageSpinner: {
    inset: "0",
    position: "fixed",
    zIndex: "10",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
  },
  ComponentSpinner: {
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

  LogoAnimations: {
    animationName: "$spin",
    animationDuration: "500ms",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
  },
});
