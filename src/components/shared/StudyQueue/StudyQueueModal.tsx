import React, { useContext } from "react";
import { ThemeContext } from "styled-components/macro";
import {
  Divider,
  Flex,
  Scroller,
  ShadowCard,
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

  const coords = { bottom: 78, right: 78 };

  return (
    <Overlay isOpen={isOpen} handleClose={handleClose} coords={coords}>
      <ShadowCard
        width={theme.sizes.sidebar}
        height="300px"
        position="relative"
      >
        <Flex flexDirection="column" height="100%" width="100%">
          <Flex width="100%" height="100%">
            <Scroller></Scroller>
          </Flex>
          <Divider />
          <Flex justifyContent="flex-end" p={theme.spacers.size8}>
            <Button buttonStyle={BUTTON_THEME.PRIMARY} disabled={true}>
              Study
            </Button>
          </Flex>
        </Flex>
      </ShadowCard>
    </Overlay>
  );
};

export default StudyQueueModal;
