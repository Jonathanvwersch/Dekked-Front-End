import { useAtom } from "jotai";
import React, { useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { saveFlashcard } from "../../../../api";
import { getSessionCookie, moveArrayItem } from "../../../../helpers";
import {
  useKeyPress,
  usePageSetupHelpers,
  useResponsiveLayout,
} from "../../../../hooks";
import { LAYOUT_HORIZONTAL } from "../../../../hooks/useResponsiveLayout";
import { formatNumber } from "../../../../intl";
import {
  BUTTON_THEME,
  FlashcardLearningStatus,
  FlashcardQuality,
  FlashcardStatus,
  SIZES,
} from "../../../../shared";
import { srFlashcardsAtom } from "../../../../store";
import { Button, Flex, Spacer, Text } from "../../../common";
import {
  calculateNewInterval,
  easilyRememberedButtonTimings,
  rememberedButtonTimings,
} from "./SpacedRepetitionController.helpers";

interface SpacedRepetitionControllerProps {
  numberOfNewCards: number;
  numberOfLearningCards: number;
  numberOfLearnedCards: number;
  maxLength: number;
  flashcardIndex: number;
  setFlashcardIndex: React.Dispatch<React.SetStateAction<number>>;
  setFlippedState: React.Dispatch<React.SetStateAction<boolean>>;
  flippedState: boolean | undefined;
  ownerId?: string;
  flashcardId?: string;
  deckId?: string;
  status?: FlashcardStatus;
  interval?: number;
  easeFactor?: number;
  easyBonus?: number;
  currentLearningStatus?: FlashcardLearningStatus;
}

const SpacedRepetitionController: React.FC<SpacedRepetitionControllerProps> = ({
  maxLength,
  flashcardIndex,
  setFlashcardIndex,
  flippedState,
  setFlippedState,
  ownerId,
  flashcardId,
  deckId,
  status,
  interval,
  easeFactor,
  easyBonus,
  numberOfLearnedCards,
  numberOfLearningCards,
  numberOfNewCards,
  currentLearningStatus,
}) => {
  const [srFlashcards, setSrFlashcards] = useAtom(srFlashcardsAtom);
  console.log(srFlashcards);
  const intl = useIntl();
  const [_numberOfNewCards, setNumberOfNewCards] =
    useState<number>(numberOfNewCards);
  const [_numberOfLearnedCards, setNumberOfLearnedCards] =
    useState<number>(numberOfLearnedCards);
  const [_numberOfLearningCards, setNumberOfLearningCards] = useState<number>(
    numberOfLearningCards
  );
  const queryClient = useQueryClient();

  const { theme, formatMessage } = usePageSetupHelpers();
  const messagePrefix = "studyMode.spacedRepetition";
  const { mutate: saveCard } = useMutation("save-flashcard", saveFlashcard, {
    onSuccess: () => {
      flashcardIndex + 1 === maxLength &&
        queryClient.refetchQueries(
          `${getSessionCookie()}-get-all-due-sr-decks`
        );
      return undefined;
    },
  });
  const layout = useResponsiveLayout(1200);

  const handleSpacedRepetitionButton = (
    flipCard?: boolean,
    quality?: FlashcardQuality,
    newLearningStatus?: FlashcardLearningStatus
  ) => {
    flipCard && setFlippedState(false);
    if (quality === FlashcardQuality.REPEAT) {
      if (maxLength - 1 - flashcardIndex < 10) {
        srFlashcards?.push(srFlashcards?.[flashcardIndex]);
      } else {
        srFlashcards &&
          moveArrayItem(srFlashcards, flashcardIndex, flashcardIndex + 9);
      }
    }

    if (!flipCard) {
      if (srFlashcards?.[flashcardIndex] && newLearningStatus) {
        srFlashcards[flashcardIndex].learning_status = newLearningStatus;
      }

      currentLearningStatus === FlashcardLearningStatus.NEW &&
        setNumberOfNewCards((prevState) => prevState - 1);
      if (
        currentLearningStatus === FlashcardLearningStatus.NEW &&
        newLearningStatus === FlashcardLearningStatus.LEARNING
      ) {
        setNumberOfLearningCards((prevState) => prevState + 1);
      } else if (
        currentLearningStatus === FlashcardLearningStatus.LEARNING &&
        newLearningStatus === FlashcardLearningStatus.LEARNED
      ) {
        setNumberOfLearningCards((prevState) => prevState - 1);
      } else if (
        currentLearningStatus === FlashcardLearningStatus.LEARNED &&
        newLearningStatus === FlashcardLearningStatus.LEARNED
      ) {
        setNumberOfLearnedCards((prevState) => prevState - 1);
      } else if (
        currentLearningStatus === FlashcardLearningStatus.LEARNED &&
        newLearningStatus === FlashcardLearningStatus.LEARNING
      ) {
        setNumberOfLearnedCards((prevState) => prevState - 1);
        setNumberOfLearningCards((prevState) => prevState + 1);
      }

      setFlippedState(true);
      setFlashcardIndex((prevState) => prevState + 1);
      // if (quality !== FlashcardQuality.REPEAT) {
      //   // console.log(flashcardIndex);
      //   // console.log(
      //   //   srFlashcards?.filter((flashcard, index) => index !== flashcardIndex)
      //   // );
      //   // setSrFlashcards(
      //   //   srFlashcards?.filter((flashcard, index) => index !== flashcardIndex)
      //   // );
      // }
      quality &&
        saveCard({
          flashcard_id: flashcardId,
          owner_id: ownerId,
          deck_id: deckId,
          quality,
          interval: calculateNewInterval(
            quality,
            status,
            interval,
            easeFactor,
            easyBonus
          ),
          learningStatus: newLearningStatus,
        });
    }
  };

  const spacedRepetitionButton = (
    buttonStyle: BUTTON_THEME,
    buttonText: string,
    reviewText?: string,
    reviewTime?: string,
    flipCard?: boolean,
    quality?: FlashcardQuality,
    newLearningStatus?: FlashcardLearningStatus
  ) => {
    return (
      <Flex flexDirection="column" height="75px">
        <Button
          buttonStyle={buttonStyle}
          size={SIZES.LARGE}
          width={layout === LAYOUT_HORIZONTAL ? "250px" : "200px"}
          handleClick={() =>
            handleSpacedRepetitionButton(flipCard, quality, newLearningStatus)
          }
        >
          <FormattedMessage id={buttonText} />
        </Button>
        <Spacer height={theme.spacers.size8} />
        {reviewText && (
          <Text
            fontColor={theme.colors.grey1}
            fontSize={theme.typography.fontSizes.size14}
          >
            <FormattedMessage id={reviewText} values={{ time: reviewTime }} />
          </Text>
        )}
      </Flex>
    );
  };

  const flipCard = () => {
    if (flashcardIndex !== maxLength) {
      setFlippedState((prevState) => !prevState);
    }
  };

  useKeyPress([" ", "Spacebar"], flipCard);

  useKeyPress(
    ["1"],
    () =>
      !flippedState &&
      handleSpacedRepetitionButton(
        false,
        FlashcardQuality.REPEAT,
        FlashcardLearningStatus.LEARNING
      )
  );

  useKeyPress(
    ["2"],
    () =>
      !flippedState &&
      handleSpacedRepetitionButton(
        false,
        FlashcardQuality.REMEMBERED,
        FlashcardLearningStatus.LEARNED
      )
  );

  useKeyPress(
    ["3"],
    () =>
      !flippedState &&
      status === FlashcardStatus.GRADUATED &&
      handleSpacedRepetitionButton(
        false,
        FlashcardQuality.EASILY_REMEMBERED,
        FlashcardLearningStatus.LEARNED
      )
  );

  const rememberedInterval = rememberedButtonTimings(
    status,
    interval,
    easeFactor,
    easyBonus
  );

  const numberOfCards = (backgroundColor: string, numberOfCards: number) => (
    <CardNumber backgroundColor={backgroundColor}>{numberOfCards}</CardNumber>
  );

  useMemo(() => {
    setNumberOfNewCards(numberOfNewCards);
    setNumberOfLearnedCards(numberOfLearnedCards);
    setNumberOfLearningCards(numberOfLearningCards);
  }, [numberOfNewCards, numberOfLearnedCards, numberOfLearningCards]);

  return (
    <>
      {flashcardIndex !== maxLength ? (
        <Flex flexDirection="column" mt={theme.spacers.size32}>
          <Flex justifyContent="center">
            {numberOfCards(theme.colors.success, _numberOfNewCards)}
            <Spacer width={theme.spacers.size64} />
            {numberOfCards(theme.colors.primary, _numberOfLearningCards)}
            <Spacer width={theme.spacers.size64} />
            {numberOfCards(theme.colors.danger, _numberOfLearnedCards)}
          </Flex>
          <Spacer height={theme.spacers.size24} />
          <Flex justifyContent="center">
            {flippedState ? (
              spacedRepetitionButton(
                BUTTON_THEME.PRIMARY,
                `${messagePrefix}.flipCard.showAnswer`,
                undefined,
                undefined,
                true
              )
            ) : (
              <Flex width="90%" justifyContent="space-evenly">
                {spacedRepetitionButton(
                  BUTTON_THEME.DANGER,
                  `${messagePrefix}.controller.repeat`,
                  `${messagePrefix}.controller.nextReview`,
                  `<${formatNumber(10, intl)} ${formatMessage(
                    `${messagePrefix}.controller.mins`
                  )}`,
                  undefined,
                  FlashcardQuality.REPEAT,
                  FlashcardLearningStatus.LEARNING
                )}
                {spacedRepetitionButton(
                  BUTTON_THEME.SECONDARY,
                  `${messagePrefix}.controller.remembered`,
                  `${messagePrefix}.controller.nextReview`,
                  `${formatNumber(rememberedInterval, intl)} ${formatMessage(
                    `${messagePrefix}.controller.${
                      rememberedInterval === 1 ? "day" : "days"
                    }`
                  )}`,
                  undefined,
                  FlashcardQuality.REMEMBERED,
                  FlashcardLearningStatus.LEARNED
                )}
                {status === FlashcardStatus.GRADUATED
                  ? spacedRepetitionButton(
                      BUTTON_THEME.PRIMARY,
                      `${messagePrefix}.controller.easilyRemembered`,
                      `${messagePrefix}.controller.nextReview`,
                      `${formatNumber(
                        easilyRememberedButtonTimings(
                          status,
                          interval,
                          easeFactor,
                          easyBonus
                        ),
                        intl
                      )} ${formatMessage(`${messagePrefix}.controller.days`)}`,
                      undefined,
                      FlashcardQuality.EASILY_REMEMBERED,
                      FlashcardLearningStatus.LEARNED
                    )
                  : null}
              </Flex>
            )}
          </Flex>
        </Flex>
      ) : null}
    </>
  );
};

const CardNumber = styled.div<{ backgroundColor: string }>`
  border-radius: 50%;
  font-size: ${({ theme }) => theme.typography.fontSizes.size16};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: white;
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => theme.spacers.size32};
  width: ${({ theme }) => theme.spacers.size32};
`;

export default SpacedRepetitionController;
