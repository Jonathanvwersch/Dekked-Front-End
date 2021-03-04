import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "./theme";

import Routes from "./Routes";

export const App: React.FC = () => {
  useStyles(); // get global styles
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Routes />
    </div>
  );
};

export default App;

export const useStyles = createUseStyles((theme: ThemeType) => ({
  app: {
    height: "100vh",
    overflow: "hidden",
    display: "flex",
  },

  "@global": {
    a: {
      textDecoration: "none",
    },
    "*": {
      margin: "0",
      boxSizing: "border-box",
      fontFamily: `${theme.typography.fontFamily}`,
      "&:focus": {
        outline: "0",
      },
    },

    "*::-webkit-scrollbar": {
      width: "8px",
      cursor: "auto",
    },

    /* Track */
    "*::-webkit-scrollbar-track": {
      background: "#DEDEDE",
      cursor: "auto",
    },

    /* Handle */
    "*::-webkit-scrollbar-thumb": {
      background: "#C6C5C2",
      cursor: "auto",

      "&:hover": {
        background: "#B6B5B2",
        cursor: "pointer!important",
      },
    },
  },
}));
