import React from "react";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/common/MainFrame/MainFrame";
import {
  FolderBinderCardContainer,
  FolderBinderHeader,
} from "../../components/folder-binder";
import { SIZES } from "../../shared";

const FolderPage: React.FC = () => {
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
