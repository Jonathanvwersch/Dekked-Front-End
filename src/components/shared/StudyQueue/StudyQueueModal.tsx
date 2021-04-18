import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import {
  Divider,
  HFlex,
  Scroller,
  ShadowCard,
  VFlex,
  Button,
  Overlay,
} from "../../common";
import { ThemeType } from "../../../styles/theme";
import { BUTTON_THEME } from "../../../shared";

interface StudyQueueProps {
  isOpen: boolean;
  handleClose: () => void;
}

const StudyQueueModal: React.FC<StudyQueueProps> = ({
  isOpen,
  handleClose,
}) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <Overlay
      isOpen={isOpen}
      handleClose={handleClose}
      coords={{ bottom: 78, right: 78 }}
    >
      <ShadowCard
        width={theme.sizes.sidebar}
        height="300px"
        position="relative"
      >
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
    </Overlay>
  );
};

const Base = styled(HFlex)`
  padding: 8px;
  justify-content: flex-end;
`;

export default StudyQueueModal;
