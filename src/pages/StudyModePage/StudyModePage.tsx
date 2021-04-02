import React, { useContext, useLayoutEffect } from "react";
import { InsetPage, MainFrame } from "../../components/common";
import { SidebarContext } from "../../contexts";
import { SIZES } from "../../shared";
interface StudyModePageProps {}

const StudyModePage: React.FC<StudyModePageProps> = () => {
  const { setSidebar } = useContext(SidebarContext);

  useLayoutEffect(() => {
    setSidebar(false);
  }, [setSidebar]);

  return (
    <MainFrame>
      <InsetPage size={SIZES.LARGE}></InsetPage>
    </MainFrame>
  );
};

export default StudyModePage;
