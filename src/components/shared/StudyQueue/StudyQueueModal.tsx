import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import {
  Divider,
  HFlex,
  Scroller,
  ShadowCard,
  VFlex,
  Button,
} from "../../common";
import { ThemeType } from "../../../styles/theme";
import { BUTTON_THEME } from "../../../shared";

interface StudyQueueProps {}

const StudyQueueModal: React.FC<StudyQueueProps> = () => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <ShadowCard width={theme.sizes.sidebar} height="300px" position="relative">
      <VFlex height="100%" width="100%">
        <HFlex width="100%" height="100%">
          <Scroller></Scroller>
        </HFlex>
        <Divider />
        <Base>
          <Button buttonStyle={BUTTON_THEME.PRIMARY} disabled={true}>
            Study
          </Button>
        </Base>
      </VFlex>
    </ShadowCard>
  );
};

const Base = styled(HFlex)`
  padding: 8px;
  justify-content: flex-end;
`;

export default StudyQueueModal;
