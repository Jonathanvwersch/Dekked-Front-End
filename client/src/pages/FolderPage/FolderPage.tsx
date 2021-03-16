import React from "react";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/common/MainFrame/MainFrame";
import { SIZES } from "../../components/common/Pages/InsetPage";
import {
  FolderBinderCardContainer,
  FolderBinderHeader,
} from "../../components/folder-binder";

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
