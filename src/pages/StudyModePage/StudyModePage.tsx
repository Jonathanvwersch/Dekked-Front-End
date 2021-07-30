import { useAtom } from "jotai";
import React, { useContext, useLayoutEffect } from "react";
import styled, { ThemeContext } from "styled-components";
import { InsetPage, MainFrame } from "../../components/common";
import {
  StudyModeFreeStudy,
  StudyModeSpacedRepetition,
} from "../../components/study-mode";
import { useResponsiveLayout } from "../../hooks";
import CustomSwitch from "../../Router/CustomSwitch";
import PrivateRoute from "../../Router/PrivateRoute";
import { SIZES, STUDY_MODE_TYPES } from "../../shared";
import { sidebarAtom } from "../../store";
interface StudyModePageProps {}

const StudyModePage: React.FC<StudyModePageProps> = () => {
  const [, setSidebar] = useAtom(sidebarAtom);
  const theme = useContext(ThemeContext);
  const layout = useResponsiveLayout();

  useLayoutEffect(() => {
    setSidebar(false);
  }, [setSidebar]);

  return (
    <MainFrame backgroundColor={theme.colors.backgrounds.studyModeBackground}>
      <Wrapper>
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

const Wrapper = styled.div`
  padding-left: 100px;
  padding-right: 100px;
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
  max-width: ${({ theme }) => theme.sizes.wrappers[SIZES.SMALL]};
  padding-top: ${({ theme }) => theme.spacers.size64};
  padding-bottom: ${({ theme }) => theme.spacers.size64};
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export default StudyModePage;
