import React from "react";
import { InsetPage, MainFrame } from "../../common";
import { SIZES } from "../../common/Pages/InsetPage";
import { FolderBinderCardContainer, FolderBinderHeader } from "../shared";
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
