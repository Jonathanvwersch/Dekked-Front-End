import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import MainFrame from "../../components/unique/main-frame/MainFrame";
import { ThemeType } from "../../theme";

interface BinderPageProps {}

const BinderPage: React.FC<BinderPageProps> = () => {
  const classes = useStyles();
  const theme: ThemeType = useTheme();
  return (
    <MainFrame>
      <div>This is a binder</div>
    </MainFrame>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({}));

BinderPage.defaultProps = {};

export default BinderPage;
