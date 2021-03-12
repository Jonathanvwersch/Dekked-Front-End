import React from "react";
import { InsetPage, MainFrame } from "../../common";
import { FolderBinderCardContainer, FolderBinderHeader } from "../shared";
interface BinderPageProps {}

const BinderPage: React.FC<BinderPageProps> = () => {
  return (
    <MainFrame>
      <InsetPage>
        <FolderBinderHeader />
        <FolderBinderCardContainer />
      </InsetPage>
    </MainFrame>
  );
};

export default BinderPage;
