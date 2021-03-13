import React from "react";
import { InsetPage } from "../../common";
import MainFrame from "../../common/MainFrame/MainFrame";
import { SIZES } from "../../common/Pages/InsetPage";
import { FolderBinderCardContainer, FolderBinderHeader } from "../shared";

interface FolderPageProps {}

const FolderPage: React.FC<FolderPageProps> = () => {
  return (
    <MainFrame>
      <InsetPage size={SIZES.MEDIUM}>
        <FolderBinderHeader />
        <FolderBinderCardContainer />
      </InsetPage>
    </MainFrame>
  );
};

export default FolderPage;
