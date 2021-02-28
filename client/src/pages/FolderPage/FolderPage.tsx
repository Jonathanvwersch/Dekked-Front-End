import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import MainFrame from "../../components/unique/main-frame/MainFrame";
import { ThemeType } from "../../theme";

interface FolderPageProps {}

const FolderPage: React.FC<FolderPageProps> = () => {
  const classes = useStyles();
  const theme: ThemeType = useTheme();
  return (
    <MainFrame>
      <div>This is a Folder</div>
    </MainFrame>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({}));

FolderPage.defaultProps = {};

export default FolderPage;
