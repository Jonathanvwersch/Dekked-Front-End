import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { StudyQueueIcon } from "../../../assets";
import { HFlex, HoverCard, IconWrapper, Overlay, Text } from "../../common";
import { ThemeType } from "../../../styles/theme";
import StudyQueueModal from "./StudyQueueModal";
import { SIZES } from "../../common/Pages/InsetPage";

interface StudyQueueProps {}

const StudyQueueContainer: React.FC<StudyQueueProps> = ({ children }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const [studyQueueModal, setStudyQueueModal] = useState<boolean>(false);

  return (
    <>
      <Container>
        <Notifications>
          <Text
            fontColor={theme.colors.backgrounds.pageBackground}
            fontWeight={theme.typography.fontWeights.bold}
          >
            1
          </Text>
        </Notifications>
        <StudyQueue handleClick={() => setStudyQueueModal(true)}>
          <IconWrapper>
            <StudyQueueIcon
              size={SIZES.MEDIUM}
              color={theme.colors.backgrounds.pageBackground}
            />
          </IconWrapper>
        </StudyQueue>
      </Container>
      <Overlay
        state={studyQueueModal}
        handleState={() => setStudyQueueModal(false)}
        coords={{ bottom: 78, right: 78 }}
      >
        <StudyQueueModal />
      </Overlay>
    </>
  );
};

const Container = styled(HFlex)<StudyQueueProps>`
  height: 46px;
  width: 46px;
  position: fixed;
  bottom: 32px;
  right: 32px;
`;

const StudyQueue = styled(HoverCard)<StudyQueueProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  z-index: 0;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Notifications = styled(HFlex)<StudyQueueProps>`
  justify-content: center;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.fontColor};
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
`;

export default StudyQueueContainer;
