import React, { useContext, useLayoutEffect } from "react";
import { Route } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
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
      <StyledInsetPage size={SIZES.LARGE} overflow="hidden">
        <CustomSwitch>
          <Route
            path={`/:type/:id/study/${STUDY_MODE_TYPES.SPACED_REPETITION}/:flashcardIndex`}
            component={StudyModeSpacedRepetition}
          />
          <Route
            exact
            path={`/:type/:id/study/${STUDY_MODE_TYPES.FREE_STUDY}/:flashcardIndex`}
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
