import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation } from "react-query";
import { saveFlashcard } from "../../../../api";
import { moveArrayItem } from "../../../../helpers";
import { useKeyPress, usePageSetupHelpers } from "../../../../hooks";
import { formatNumber } from "../../../../intl";
import {
  BUTTON_THEME,
  FlashcardLearningStatus,
  FlashcardQuality,
  FlashcardStatus,
  SIZES,
} from "../../../../shared";
import { Button, Flex, Spacer, Text } from "../../../common";
import {
  calculateNewInterval,
  easilyRememberedButtonTimings,
  rememberedButtonTimings,
} from "./SpacedRepetitionController.helpers";

interface SpacedRepetitionControllerProps {
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
  flashcards?: FlashcardInterface[];
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
  flashcards,
}) => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers();
  const messagePrefix = "studyMode.spacedRepetition";
  const { mutate: saveCard } = useMutation("save-flashcard", saveFlashcard);

  const handleSpacedRepetitionButton = (
    flipCard?: boolean,
    quality?: FlashcardQuality,
    newLearningStatus?: FlashcardLearningStatus
  ) => {
    flipCard && setFlippedState(false);
    if (quality === FlashcardQuality.REPEAT) {
      if (maxLength - 1 - flashcardIndex < 10) {
        flashcards?.push(flashcards?.[flashcardIndex]);
      } else {
        flashcards &&
          moveArrayItem(flashcards, flashcardIndex, flashcardIndex + 9);
      }
    }
    if (!flipCard) {
      setFlippedState(true);
      setFlashcardIndex((prevState) => prevState + 1);
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
    reviewText: string,
    reviewTime?: string,
    flipCard?: boolean,
    quality?: FlashcardQuality,
    newLearningStatus?: FlashcardLearningStatus
  ) => {
    return (
      <Flex flexDirection="column">
        <Button
          buttonStyle={buttonStyle}
          size={SIZES.MEDIUM}
          width="180px"
          handleClick={() =>
            handleSpacedRepetitionButton(flipCard, quality, newLearningStatus)
          }
        >
          <FormattedMessage id={buttonText} />
        </Button>
        <Spacer height={theme.spacers.size8} />
        <Text
          fontColor={theme.colors.grey1}
          fontSize={theme.typography.fontSizes.size14}
        >
          <FormattedMessage id={reviewText} values={{ time: reviewTime }} />
        </Text>
      </Flex>
    );
  };

  const flipCard = () => {
    if (flashcardIndex !== maxLength) {
      setFlippedState((prevState) => !prevState);
    }
  };

  useKeyPress([" ", "Spacebar"], flipCard);

  useKeyPress(["1"], () =>
    handleSpacedRepetitionButton(
      false,
      FlashcardQuality.REPEAT,
      FlashcardLearningStatus.LEARNING
    )
  );
  useKeyPress(["2"], () =>
    handleSpacedRepetitionButton(
      false,
      FlashcardQuality.REMEMBERED,
      FlashcardLearningStatus.LEARNED
    )
  );
  useKeyPress(
    ["3"],
    () =>
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

  return (
    <>
      {flashcardIndex !== maxLength ? (
        <Flex justifyContent="center" mt={theme.spacers.size48}>
          {flippedState ? (
            spacedRepetitionButton(
              BUTTON_THEME.PRIMARY,
              `${messagePrefix}.flipCard.flipCard`,
              `${messagePrefix}.flipCard.clickToShowAnswer`,
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
      ) : null}
    </>
  );
};

export default SpacedRepetitionController;
