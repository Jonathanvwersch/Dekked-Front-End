import React, { useRef, useState } from "react";
import styled from "styled-components";
import { StudyQueueIcon } from "../../../assets";
import { Button, IconWrapper, Text } from "../../common";
import StudyQueueModal from "./StudyQueueModal";
import { CoordsType, SIZES } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";
import { useQuery } from "react-query";
import { getAllDueSrDecks } from "../../../api";
import { formatNumber } from "../../../intl";
import { useIntl } from "react-intl";
import { positionModals } from "../../../helpers";

const StudyQueueContainer: React.FC = () => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers();
  const [studyQueueModal, setStudyQueueModal] = useState<boolean>(false);
  const [coords, setCoords] = useState<CoordsType>();
  const modalRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useQuery<DueSpacedRepetitionDecks>(
    "get-all-due-sr-decks",
    getAllDueSrDecks,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const isDataGreaterThanNine = Boolean(data && Object.keys(data).length > 9);
  const isDataGreaterThanZero = Boolean(data && Object.keys(data).length > 0);

  return (
    <>
      <Container ref={modalRef}>
        {isDataGreaterThanZero && data && (
          <Notifications increaseSize={isDataGreaterThanNine}>
            <Text
              fontColor={theme.colors.backgrounds.pageBackground}
              fontWeight={theme.typography.fontWeights.bold}
            >
              {isDataGreaterThanNine
                ? `${formatNumber(9, intl)}+`
                : formatNumber(Object.keys(data).length, intl)}
            </Text>
          </Notifications>
        )}
        <StudyQueue
          handleClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setStudyQueueModal(true);
            setCoords(positionModals(e, 350, modalRef));
          }}
          ariaLabel={formatMessage("ariaLabels.studyQueue")}
        >
          <IconWrapper>
            <StudyQueueIcon
              size={SIZES.LARGE}
              color={theme.colors.backgrounds.pageBackground}
            />
          </IconWrapper>
        </StudyQueue>
      </Container>
      <StudyQueueModal
        data={data}
        isLoading={isLoading}
        isOpen={studyQueueModal}
        handleClose={() => setStudyQueueModal(false)}
        coords={{ ...coords, left: 735 }}
      />
    </>
  );
};

const Container = styled.div`
  height: ${({ theme }) => theme.spacers.size56};
  width: ${({ theme }) => theme.spacers.size56};
  position: fixed;
  bottom: ${({ theme }) => theme.spacers.size32};
  right: ${({ theme }) => theme.spacers.size16};
`;

const StudyQueue = styled((props) => <Button {...props} />)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50% !important;
  height: ${({ theme }) => theme.spacers.size48}!important;
  width: ${({ theme }) => theme.spacers.size48}!important;
  z-index: 0;
  position: absolute !important;
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
