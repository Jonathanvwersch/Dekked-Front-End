import React from "react";
import { InsetPage, MainFrame } from "../../components/common";
import { SIZES } from "../../components/common/Pages/InsetPage";
import {
  FolderBinderCardContainer,
  FolderBinderHeader,
} from "../../components/folder-binder";
interface BinderPageProps {}

const BinderPage: React.FC<BinderPageProps> = () => {
  return (
    <MainFrame>
      <InsetPage size={SIZES.MEDIUM}>
        <FolderBinderHeader />
        <FolderBinderCardContainer />
      </InsetPage>
    </MainFrame>
  );
};

export default BinderPage;
