import React from "react";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/unique/main-frame/MainFrame";
import { FolderBinderCardContainer } from "../common";

interface FolderPageProps {}

const FolderPage: React.FC<FolderPageProps> = () => {
  return (
    <MainFrame>
      <InsetPage>
        <FolderBinderCardContainer />
      </InsetPage>
    </MainFrame>
  );
};

export default FolderPage;
