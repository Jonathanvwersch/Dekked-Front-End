import React, { useContext, useLayoutEffect } from "react";
import { ThemeContext } from "styled-components";
import { InsetPage, MainFrame } from "../../components/common";
import { SidebarContext } from "../../contexts";
import { SIZES } from "../../shared";
interface StudyModePageProps {}

const StudyModePage: React.FC<StudyModePageProps> = () => {
  const { setSidebar } = useContext(SidebarContext);
  const theme = useContext(ThemeContext);

  useLayoutEffect(() => {
    setSidebar(false);
  }, [setSidebar]);

  return (
    <MainFrame backgroundColor={theme.colors.backgrounds.studyModeBackground}>
      <InsetPage size={SIZES.LARGE}></InsetPage>
    </MainFrame>
  );
};

export default StudyModePage;
