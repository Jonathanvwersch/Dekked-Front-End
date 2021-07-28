import React, { useState } from "react";
import styled from "styled-components";
import { StudyQueueIcon } from "../../../assets";
import { Button, IconWrapper, Tooltip, Text } from "../../common";
import StudyQueueModal from "./StudyQueueModal";
import { Params, SIZES } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllDueSrDecks } from "../../../api";
import { formatNumber } from "../../../intl";
import { useIntl } from "react-intl";

const StudyQueueContainer: React.FC = () => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers();
  const [studyQueueModal, setStudyQueueModal] = useState<boolean>(false);
  const { id: studySetId } = useParams<Params>();
  const { data, isLoading } = useQuery<DueSpacedRepetitionDecks>(
    `${studySetId}-get-all-due-sr-decks`,
    getAllDueSrDecks
  );

  const tooltipOffset = { top: -26 };
  const isDataGreaterThanNine = Boolean(data && Object.keys(data).length > 9);

  return (
    <>
      <Container>
        <Tooltip
          id="StudyQueue"
          text="tooltips.studyQueue.bubble"
          offset={tooltipOffset}
          place="left"
        >
          <>
            {data && !isLoading && (
              <Notifications increaseSize={isDataGreaterThanNine}>
                <Text
                  fontColor={theme.colors.backgrounds.pageBackground}
                  fontWeight={theme.typography.fontWeights.bold}
                >
                  {isDataGreaterThanNine
                    ? `+${formatNumber(9, intl)}`
                    : formatNumber(Object.keys(data).length, intl)}
                </Text>
              </Notifications>
            )}

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
          </>
        </Tooltip>
      </Container>
      <StudyQueueModal
        data={data}
        isLoading={isLoading}
        isOpen={studyQueueModal}
        handleClose={() => setStudyQueueModal(false)}
      />
    </>
  );
};

const Container = styled.div`
  height: ${({ theme }) => theme.spacers.size56};
  width: ${({ theme }) => theme.spacers.size56};
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

const Notifications = styled.div<{ increaseSize: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme, increaseSize }) =>
    increaseSize ? theme.spacers.size24 : theme.spacers.size20};
  width: ${({ theme, increaseSize }) =>
    increaseSize ? theme.spacers.size24 : theme.spacers.size20};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.fontColor};
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
`;

export default React.memo(StudyQueueContainer);
