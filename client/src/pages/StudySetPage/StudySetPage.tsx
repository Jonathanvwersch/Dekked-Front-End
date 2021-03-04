import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import MainFrame from "../../components/unique/main-frame/MainFrame";
import { ThemeType } from "../../theme";
import StudySetHeader from "./StudySetHeader";

interface StudySetPageProps {}

const StudySetPage: React.FC<StudySetPageProps> = () => {
  const classes = useStyles();
  const theme: ThemeType = useTheme();
  return (
    <MainFrame>
      <StudySetHeader />
    </MainFrame>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({}));

StudySetPage.defaultProps = {};

export default StudySetPage;
