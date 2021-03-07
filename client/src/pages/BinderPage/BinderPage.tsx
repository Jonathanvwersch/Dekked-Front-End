import React from "react";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/unique/main-frame/MainFrame";
import { FolderBinderCardContainer } from "../common";
interface BinderPageProps {}

const BinderPage: React.FC<BinderPageProps> = () => {
  return (
    <MainFrame>
      <InsetPage>
        <FolderBinderCardContainer />
      </InsetPage>
    </MainFrame>
  );
};

export default BinderPage;
