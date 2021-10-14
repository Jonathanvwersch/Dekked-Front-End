import React from "react";
import { Sidebar } from "..";

interface FullPageProps {}

const FullPage: React.FC<FullPageProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default FullPage;
