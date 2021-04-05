import React, { useContext, useLayoutEffect } from "react";
import { Route } from "react-router-dom";
import { ThemeContext } from "styled-components/macro";
import { InsetPage, MainFrame } from "../../components/common";
import {
  StudyModeFreeStudy,
  StudyModeSpacedRepetition,
} from "../../components/study-mode";
import { SidebarContext } from "../../contexts";
import CustomSwitch from "../../Router/CustomSwitch";
import { SIZES, STUDY_MODE_TYPES } from "../../shared";
interface StudyModePageProps {}

const StudyModePage: React.FC<StudyModePageProps> = () => {
  const { setSidebar } = useContext(SidebarContext);
  const theme = useContext(ThemeContext);

  useLayoutEffect(() => {
    setSidebar(false);
  }, [setSidebar]);

  return (
    <MainFrame backgroundColor={theme.colors.backgrounds.studyModeBackground}>
      <InsetPage size={SIZES.LARGE}>
        <CustomSwitch>
          <Route
            path={`/:type/:id/study/${STUDY_MODE_TYPES.SPACED_REPETITION}`}
            component={StudyModeSpacedRepetition}
          />
          <Route
            path={`/:type/:id/study/${STUDY_MODE_TYPES.FREE_STUDY}`}
            component={StudyModeFreeStudy}
          />
        </CustomSwitch>
      </InsetPage>
    </MainFrame>
  );
};

export default StudyModePage;
