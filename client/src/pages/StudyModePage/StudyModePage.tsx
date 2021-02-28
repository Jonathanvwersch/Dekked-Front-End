import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeType } from "../../theme";

interface StudyModePageProps {}

const StudyModePage: React.FC<StudyModePageProps> = ({}) => {
  const classes = useStyles();
  const theme: ThemeType = useTheme();
  return <div></div>;
};

const useStyles = createUseStyles((theme: ThemeType) => ({}));

StudyModePage.defaultProps = {};

export default StudyModePage;
