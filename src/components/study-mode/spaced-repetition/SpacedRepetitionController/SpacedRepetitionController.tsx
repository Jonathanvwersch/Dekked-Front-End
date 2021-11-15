import { isEmpty } from "lodash";
import React, { SetStateAction, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation } from "react-query";
import styled from "styled-components";
import { saveFlashcard } from "../../../../api";
import { moveArrayItem, titleCase } from "../../../../helpers";
import { useKeyPress, usePageSetupHelpers } from "../../../../hooks";
import { formatNumber } from "../../../../intl";
import {
  BUTTON_THEME,
  FlashcardLearningStatus,
  FlashcardQuality,
  FlashcardStatus,
  Params,
  SIZES,
} from "../../../../shared";
import { Button, Flex, Spacer, Text } from "dekked-design-system";
import {
  calculateNewInterval,
  easilyRememberedButtonTimings,
  formatTimings,
  messagePrefix,
  rememberedButtonTimings,
} from "./SpacedRepetitionController.helpers";
import { Tooltip } from "../../../common";
import { queryClient } from "../../../..";
import { useParams } from "react-router-dom";

interface SpacedRepetitionControllerProps {
  numberOfNewCards: number;
  numberOfLearningCards: number;
  numberOfLearnedCards: number;
  maxLength: number;
  flashcardIndex: number;
  setFlippedState: React.Dispatch<React.SetStateAction<boolean>>;
  flippedState: boolean | undefined;
  flashcardId?: string;
  deckId?: string;
  status?: FlashcardStatus;
  interval?: number;
  easeFactor?: number;
  easyBonus?: number;
  currentLearningStatus?: FlashcardLearningStatus;
  srFlashcards?: FlashcardInterface[];
  setSrFlashcards: (
    update?: SetStateAction<FlashcardInterface[] | undefined>
  ) => void;
}

const SpacedRepetitionController: React.FC<SpacedRepetitionControllerProps> = ({
  maxLength,
  flashcardIndex,
  flippedState,
  setFlippedState,
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
  srFlashcards,
  setSrFlashcards,
}) => {
  const intl = useIntl();
  const [_numberOfNewCards, setNumberOfNewCards] =
    useState<number>(numberOfNewCards);
  const [_numberOfLearnedCards, setNumberOfLearnedCards] =
    useState<number>(numberOfLearnedCards);
  const [_numberOfLearningCards, setNumberOfLearningCards] = useState<number>(
    numberOfLearningCards
  );
  const { id: studySetId } = useParams<Params>();

  const { theme, formatMessage } = usePageSetupHelpers();
  const { mutate: saveCard } = useMutation("save-flashcard", saveFlashcard, {
    onSuccess: () => {
      isEmpty(srFlashcards) &&
        queryClient.refetchQueries("get-all-due-sr-decks");
      return undefined;
    },
  });

  const handleSpacedRepetitionButton = (
    quality?: FlashcardQuality,
    newLearningStatus?: FlashcardLearningStatus
  ) => {
    // Flip card back to front
    setFlippedState(true);

    // Update learning status
    if (srFlashcards?.[flashcardIndex] && newLearningStatus) {
      srFlashcards[flashcardIndex].learning_status = newLearningStatus;
    }

    // If user wishes to repeat flashcard, we must move its position in array
    if (quality === FlashcardQuality.REPEAT) {
      // if there are less than 10 flashcards ahead of the current flashcard,
      // simply push the flashcard to the end of the array
      if (maxLength - 1 - flashcardIndex < 10) {
        srFlashcards?.push(srFlashcards?.[flashcardIndex]);
      } else {
        // otherwise move it forward by 9 flashcards
        srFlashcards &&
          moveArrayItem(srFlashcards, flashcardIndex, flashcardIndex + 9);
      }
    }

    // Update number of cards if current status is new
    if (currentLearningStatus === FlashcardLearningStatus.NEW) {
      setNumberOfNewCards((prevState) => prevState - 1);

      if (newLearningStatus === FlashcardLearningStatus.LEARNING) {
        setNumberOfLearningCards((prevState) => prevState + 1);
      }
    }

    // Update number of cards if current status is learning
    // number of cards remains the same if new learning status is Learning
    else if (
      currentLearningStatus === FlashcardLearningStatus.LEARNING &&
      newLearningStatus === FlashcardLearningStatus.LEARNED
    ) {
      setNumberOfLearningCards((prevState) => prevState - 1);
    }

    // Update number of cards if current status is learned
    else if (currentLearningStatus === FlashcardLearningStatus.LEARNED) {
      if (newLearningStatus === FlashcardLearningStatus.LEARNED) {
        setNumberOfLearnedCards((prevState) => prevState - 1);
      } else if (newLearningStatus === FlashcardLearningStatus.LEARNING) {
        setNumberOfLearnedCards((prevState) => prevState - 1);
        setNumberOfLearningCards((prevState) => prevState + 1);
      }
    }

    // Remove studied flashcard
    setSrFlashcards(srFlashcards?.filter((_, idx) => idx !== flashcardIndex));

    quality &&
      saveCard({
        flashcard_id: flashcardId,
        deck_id: deckId,
        quality,
        study_set_id: studySetId,
        interval: calculateNewInterval(
          quality,
          status,
          interval,
          easeFactor,
          easyBonus
        ),
        learningStatus: newLearningStatus,
      });
  };

  const flipCard = () => {
    if (!isEmpty(srFlashcards)) {
      setFlippedState((prevState) => !prevState);
    }
  };

  const spacedRepetitionButton = (
    flipOverCard: boolean,
    buttonStyle: BUTTON_THEME,
    buttonText: string,
    reviewText?: string,
    reviewTime?: string,
    quality?: FlashcardQuality,
    newLearningStatus?: FlashcardLearningStatus,
    marginRight?: string
  ) => {
    return (
      <Flex flexDirection="column" height="75px" mr={marginRight}>
        <Button
          buttonStyle={buttonStyle}
          size={SIZES.LARGE}
          width="175px"
          handleClick={() =>
            flipOverCard
              ? flipCard()
              : handleSpacedRepetitionButton(quality, newLearningStatus)
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

  useKeyPress([" ", "Spacebar"], flipCard);

  useKeyPress(["1"], () =>
    handleSpacedRepetitionButton(
      FlashcardQuality.REPEAT,
      FlashcardLearningStatus.LEARNING
    )
  );

  useKeyPress(["2"], () =>
    handleSpacedRepetitionButton(
      FlashcardQuality.REMEMBERED,
      FlashcardLearningStatus.LEARNED
    )
  );

  useKeyPress(
    ["3"],
    () =>
      status === FlashcardStatus.GRADUATED &&
      handleSpacedRepetitionButton(
        FlashcardQuality.EASILY_REMEMBERED,
        FlashcardLearningStatus.LEARNED
      )
  );

  const remembered = rememberedButtonTimings(
    status,
    interval,
    easeFactor,
    easyBonus
  );

  const easilyRemembered = easilyRememberedButtonTimings(
    status,
    interval,
    easeFactor,
    easyBonus
  );

  const numberOfCards = (
    backgroundColor: string,
    numberOfCards: number,
    tooltip: string
  ) => (
    <Tooltip text={tooltip} id={titleCase(formatMessage(tooltip))}>
      <CardNumber backgroundColor={backgroundColor}>{numberOfCards}</CardNumber>
    </Tooltip>
  );

  useMemo(() => {
    setNumberOfNewCards(numberOfNewCards);
    setNumberOfLearnedCards(numberOfLearnedCards);
    setNumberOfLearningCards(numberOfLearningCards);
  }, [numberOfNewCards, numberOfLearnedCards, numberOfLearningCards]);

  return (
    <>
      {!isEmpty(srFlashcards) ? (
        <Flex flexDirection="column" mt={theme.spacers.size32}>
          <Flex justifyContent="center">
            {numberOfCards(
              theme.colors.success,
              _numberOfNewCards,
              "tooltips.studyMode.newCards"
            )}
            <Spacer width={theme.spacers.size64} />
            {numberOfCards(
              theme.colors.primary,
              _numberOfLearningCards,
              "tooltips.studyMode.repeatedCards"
            )}
            <Spacer width={theme.spacers.size64} />
            {numberOfCards(
              theme.colors.danger,
              _numberOfLearnedCards,
              "tooltips.studyMode.dueCards"
            )}
          </Flex>
          <Spacer height={theme.spacers.size24} />
          <Flex justifyContent="center" overflow="auto">
            {flippedState ? (
              spacedRepetitionButton(
                true,
                BUTTON_THEME.PRIMARY,
                `${messagePrefix}.flipCard.showAnswer`
              )
            ) : (
              <Flex width="90%" mb={theme.spacers.size8}>
                {spacedRepetitionButton(
                  false,
                  BUTTON_THEME.DANGER,
                  `${messagePrefix}.controller.repeat`,
                  `${messagePrefix}.controller.nextReview`,
                  `<${formatNumber(10, intl)} ${formatMessage(
                    `${messagePrefix}.controller.mins`
                  )}`,
                  FlashcardQuality.REPEAT,
                  FlashcardLearningStatus.LEARNING,
                  theme.spacers.size16
                )}
                {spacedRepetitionButton(
                  false,
                  BUTTON_THEME.SECONDARY,
                  `${messagePrefix}.controller.remembered`,
                  `${messagePrefix}.controller.nextReview`,
                  `${formatNumber(formatTimings(remembered).timing, intl)}
                  ${formatMessage(formatTimings(remembered).unit)}`,
                  FlashcardQuality.REMEMBERED,
                  FlashcardLearningStatus.LEARNED,
                  status !== FlashcardStatus.GRADUATED
                    ? theme.spacers.size16
                    : undefined
                )}
                {status === FlashcardStatus.GRADUATED
                  ? spacedRepetitionButton(
                      false,
                      BUTTON_THEME.PRIMARY,
                      `${messagePrefix}.controller.easilyRemembered`,
                      `${messagePrefix}.controller.nextReview`,
                      `${formatNumber(
                        formatTimings(easilyRemembered).timing,
                        intl
                      )} ${formatMessage(
                        formatTimings(easilyRemembered).unit
                      )}`,
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
  user-select: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => theme.spacers.size32};
  width: ${({ theme }) => theme.spacers.size32};
`;

export default SpacedRepetitionController;
