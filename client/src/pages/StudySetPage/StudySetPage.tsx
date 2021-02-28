import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import MainFrame from "../../components/unique/main-frame/MainFrame";
import { ThemeType } from "../../theme";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  const classes = useStyles();
  const theme: ThemeType = useTheme();
  return (
    <MainFrame>
      <div>This is a StudySet</div>
    </MainFrame>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({}));

StudySetPage.defaultProps = {};

export default StudySetPage;
