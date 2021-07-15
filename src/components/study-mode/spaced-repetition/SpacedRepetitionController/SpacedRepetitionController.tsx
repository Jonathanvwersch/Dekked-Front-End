import React from "react";
import { FormattedMessage } from "react-intl";
import { useMutation } from "react-query";
import { saveFlashcard } from "../../../../api";
import { useKeyPress, usePageSetupHelpers } from "../../../../hooks";
import { BUTTON_THEME, FlashcardQuality, SIZES } from "../../../../shared";
import { Button, Flex, Spacer, Text } from "../../../common";

interface SpacedRepetitionControllerProps {
  maxLength: number;
  flashcardIndex: number;
  setFlashcardIndex: React.Dispatch<React.SetStateAction<number>>;
  setFlippedState: React.Dispatch<React.SetStateAction<boolean>>;
  flippedState: boolean | undefined;
  ownerId?: string;
  flashcardId?: string;
  deckId?: string;
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
}) => {
  const { theme } = usePageSetupHelpers();
  const messagePrefix = "studyMode.spacedRepetition";

  const { mutate: saveCard } = useMutation("save-flashcard", saveFlashcard);

  const spacedRepetitionButton = (
    buttonStyle: BUTTON_THEME,
    buttonText: string,
    reviewText: string,
    reviewTime?: string,
    flipCard?: boolean,
    quality?: FlashcardQuality
  ) => {
    return (
      <Flex flexDirection="column">
        <Button
          buttonStyle={buttonStyle}
          size={SIZES.MEDIUM}
          width="180px"
          handleClick={() => {
            flipCard ? setFlippedState(false) : setFlippedState(true);
            !flipCard && setFlashcardIndex((prevState) => prevState + 1);
            !flipCard &&
              saveCard({
                flashcard_id: flashcardId,
                owner_id: ownerId,
                deck_id: deckId,
                quality,
              });
          }}
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
                "<10 mins",
                undefined,
                FlashcardQuality.REPEAT
              )}
              {spacedRepetitionButton(
                BUTTON_THEME.SECONDARY,
                `${messagePrefix}.controller.remembered`,
                `${messagePrefix}.controller.nextReview`,
                "1 day",
                undefined,
                FlashcardQuality.REMEMBERED
              )}
              {spacedRepetitionButton(
                BUTTON_THEME.PRIMARY,
                `${messagePrefix}.controller.easilyRemembered`,
                `${messagePrefix}.controller.nextReview`,
                "6 days",
                undefined,
                FlashcardQuality.EASILY_REMEMBERED
              )}
            </Flex>
          )}
        </Flex>
      ) : null}
    </>
  );
};

export default SpacedRepetitionController;
