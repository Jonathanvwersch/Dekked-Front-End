import React from "react";
import MainFrame from "../../components/unique/main-frame/MainFrame";
interface BinderPageProps {}

const BinderPage: React.FC<BinderPageProps> = () => {
  return (
    <MainFrame>
      <div>This is a binder</div>
    </MainFrame>
  );
};

export default BinderPage;
