import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import MainFrame from "../../components/unique/main-frame/MainFrame";
import { ThemeType } from "../../theme";
import { VFlex } from "../../components/common";

interface FolderPageProps {}

const FolderPage: React.FC<FolderPageProps> = () => {
  const classes = useStyles();
  const theme: ThemeType = useTheme();
  return (
    <MainFrame>
      <VFlex></VFlex>
    </MainFrame>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({}));

FolderPage.defaultProps = {};

export default FolderPage;
