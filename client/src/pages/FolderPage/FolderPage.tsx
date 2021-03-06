import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import MainFrame from "../../components/unique/main-frame/MainFrame";
import { ThemeType } from "../../theme";
import { VFlex } from "../../components/common";
import Sidebar from "../../components/unique/sidebar/Sidebar";

interface FolderPageProps {}

const FolderPage: React.FC<FolderPageProps> = () => {
  return (
    <MainFrame>
      <VFlex></VFlex>
    </MainFrame>
  );
};

export default FolderPage;
