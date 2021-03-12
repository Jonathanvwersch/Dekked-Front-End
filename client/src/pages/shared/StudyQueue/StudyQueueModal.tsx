import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Divider, HFlex, Scroller, ShadowCard, VFlex } from "../../../common";
import Button, { BUTTON_THEME } from "../../../common/Button/Button";
import { ThemeType } from "../../../styles/theme";

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
