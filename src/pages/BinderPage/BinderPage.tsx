import React from "react";
import { InsetPage, MainFrame } from "../../components/common";
import {
  FolderBinderCardContainer,
  FolderBinderHeader,
} from "../../components/folder-binder";
import { SIZES } from "../../shared";

const BinderPage: React.FC = () => {
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
