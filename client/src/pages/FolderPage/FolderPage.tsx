import React from "react";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/unique/main-frame/MainFrame";
import { FolderBinderCardContainer, FolderBinderHeader } from "../common";

interface FolderPageProps {}

const FolderPage: React.FC<FolderPageProps> = () => {
  return (
    <MainFrame>
      <InsetPage>
        <FolderBinderHeader />
        <FolderBinderCardContainer />
      </InsetPage>
    </MainFrame>
  );
};

export default FolderPage;
