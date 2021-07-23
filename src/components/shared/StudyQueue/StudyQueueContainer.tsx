import React, { useState } from "react";
import styled from "styled-components";
import { StudyQueueIcon } from "../../../assets";
import { Button, IconWrapper, Tooltip } from "../../common";
import StudyQueueModal from "./StudyQueueModal";
import { SIZES } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";

const StudyQueueContainer: React.FC = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const [studyQueueModal, setStudyQueueModal] = useState<boolean>(false);

  const tooltipOffset = { top: -22 };

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
        <Tooltip
          id="StudyQueue"
          text="tooltips.studyQueue.bubble"
          offset={tooltipOffset}
        >
          <StudyQueue
            handleClick={() => setStudyQueueModal(true)}
            ariaLabel={formatMessage("ariaLabels.studyQueue")}
          >
            <IconWrapper>
              <StudyQueueIcon
                size={SIZES.LARGE}
                color={theme.colors.backgrounds.pageBackground}
              />
            </IconWrapper>
          </StudyQueue>
        </Tooltip>
      </Container>
      <StudyQueueModal
        isOpen={studyQueueModal}
        handleClose={() => setStudyQueueModal(false)}
      />
    </>
  );
};

const Container = styled.div`
  height: ${({ theme }) => theme.spacers.size48};
  width: ${({ theme }) => theme.spacers.size48};
  position: fixed;
  bottom: 32px;
  right: 32px;
`;

const StudyQueue = styled((props) => <Button {...props} />)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50% !important;
  height: ${({ theme }) => theme.spacers.size48}!important;
  width: ${({ theme }) => theme.spacers.size48}!important;
  z-index: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

// const Notifications = styled(Flex)<StudyQueueProps>`
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
