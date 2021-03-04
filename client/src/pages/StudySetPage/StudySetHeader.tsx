import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Toolbar, VFlex } from "../../components/common";
import { ThemeType } from "../../theme";

interface StudySetHeaderProps {}

const StudySetHeader: React.FC<StudySetHeaderProps> = () => {
  const classes = useStyles();
  const theme: ThemeType = useTheme();
  return (
    <VFlex>
      <Toolbar />
    </VFlex>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({}));

StudySetHeader.defaultProps = {};

export default StudySetHeader;
