import { useAtom } from "jotai";
import React, { useContext, useLayoutEffect } from "react";
import styled, { ThemeContext } from "styled-components";
import { InsetPage, MainFrame } from "../../components/common";
import {
  StudyModeFreeStudy,
  StudyModeSpacedRepetition,
} from "../../components/study-mode";
import CustomSwitch from "../../Router/CustomSwitch";
import PrivateRoute from "../../Router/PrivateRoute";
import { SIZES, STUDY_MODE_TYPES } from "../../shared";
import { sidebarAtom } from "../../store";
interface StudyModePageProps {}

const StudyModePage: React.FC<StudyModePageProps> = () => {
  const [, setSidebar] = useAtom(sidebarAtom);
  const theme = useContext(ThemeContext);

  useLayoutEffect(() => {
    setSidebar(false);
  }, [setSidebar]);

  return (
    <MainFrame backgroundColor={theme.colors.backgrounds.studyModeBackground}>
      <StyledInsetPage size={SIZES.LARGE} overflow="hidden">
        <CustomSwitch>
          <PrivateRoute
            path={`/:type/:id/study/${STUDY_MODE_TYPES.SPACED_REPETITION}`}
            component={StudyModeSpacedRepetition}
          />
          <PrivateRoute
            exact
            path={`/:type/:id/study/${STUDY_MODE_TYPES.FREE_STUDY}`}
            component={StudyModeFreeStudy}
          />
        </CustomSwitch>
      </StyledInsetPage>
    </MainFrame>
  );
};

const StyledInsetPage = styled(InsetPage)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default StudyModePage;
