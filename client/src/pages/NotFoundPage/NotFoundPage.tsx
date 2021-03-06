import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeType } from "../../theme";

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = ({}) => {
  const classes = useStyles();
  const theme: ThemeType = useTheme();
  return <div>404</div>;
};

const useStyles = createUseStyles((theme: ThemeType) => ({}));

NotFoundPage.defaultProps = {};

export default NotFoundPage;
