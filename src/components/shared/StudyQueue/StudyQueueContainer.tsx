import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import { StudyQueueIcon } from "../../../assets";
import { HoverCard, IconWrapper, Overlay } from "../../common";
import { ThemeType } from "../../../styles/theme";
import StudyQueueModal from "./StudyQueueModal";
import { SIZES } from "../../../shared";

interface StudyQueueProps {}

const StudyQueueContainer: React.FC<StudyQueueProps> = () => {
  const theme: ThemeType = useContext(ThemeContext);
  const [studyQueueModal, setStudyQueueModal] = useState<boolean>(false);

  return (
    <>
      <Container>
        {/* <Notifications>
          <Text
            fontColor={theme.colors.backgrounds.pageBackground}
            fontWeight={theme.typography.fontWeights.bold}
          >
            1
          </Text>
        </Notifications> */}
        <StudyQueue
          handleClick={() => setStudyQueueModal(true)}
          backgroundColor={theme.colors.primary}
          ariaLabel="study queue"
        >
          <IconWrapper>
            <StudyQueueIcon
              size={SIZES.LARGE}
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

const Container = styled.div<StudyQueueProps>`
  height: ${({ theme }) => theme.spacers.size48};
  width: ${({ theme }) => theme.spacers.size48};
  position: fixed;
  bottom: 32px;
  right: 32px;
`;

const StudyQueue = styled(HoverCard)<StudyQueueProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: ${({ theme }) => theme.spacers.size48}!important;
  width: ${({ theme }) => theme.spacers.size48}!important;
  z-index: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

// const Notifications = styled(HFlex)<StudyQueueProps>`
//   justify-content: center;
//   height: ${({ theme }) => theme.spacers.size16};
//   width: ${({ theme }) => theme.spacers.size16};
//   border-radius: 50%;
//   background-color: ${({ theme }) => theme.colors.fontColor};
//   z-index: 1;
//   position: absolute;
//   top: 0;
//   right: 0;
// `;

export default React.memo(StudyQueueContainer);
