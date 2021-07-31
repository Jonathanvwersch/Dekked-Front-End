import { useAtom } from "jotai";
import React, { useContext, useLayoutEffect } from "react";
import styled, { ThemeContext } from "styled-components";
import { MainFrame } from "../../components/common";
import {
  StudyModeFreeStudy,
  StudyModeSpacedRepetition,
} from "../../components/study-mode";
import { useResponsiveLayout } from "../../hooks";
import { LAYOUT_VERTICAL } from "../../hooks/useResponsiveLayout";
import CustomSwitch from "../../Router/CustomSwitch";
import PrivateRoute from "../../Router/PrivateRoute";
import { STUDY_MODE_TYPES } from "../../shared";
import { fullscreenStudyModeAtom, sidebarAtom } from "../../store";
interface StudyModePageProps {}

const StudyModePage: React.FC<StudyModePageProps> = () => {
  const [, setSidebar] = useAtom(sidebarAtom);
  const theme = useContext(ThemeContext);
  const [fullscreen] = useAtom(fullscreenStudyModeAtom);
  const layout = useResponsiveLayout();

  useLayoutEffect(() => {
    setSidebar(false);
  }, [setSidebar]);

  const maxWidth =
    layout === LAYOUT_VERTICAL ? "100%" : fullscreen ? "1400px" : "750px";

  return (
    <MainFrame
      backgroundColor={theme.colors.backgrounds.studyModeBackground}
      justifyContent="center"
    >
      <Wrapper maxWidth={maxWidth}>
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
      </Wrapper>
    </MainFrame>
  );
};

const Wrapper = styled.div<{ maxWidth: string }>`
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  max-width: ${({ maxWidth }) => maxWidth};
  justify-content: center;
  padding: ${({ theme }) => theme.spacers.size32};
`;

export default StudyModePage;
