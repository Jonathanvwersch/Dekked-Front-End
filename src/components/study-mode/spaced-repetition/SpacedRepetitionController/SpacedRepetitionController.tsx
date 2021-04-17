import React from "react";
import { FormattedMessage } from "react-intl";
import { ThemeContext } from "styled-components";
import FlipIcon from "../../../../assets/icons/FlipIcon";
import { usePageSetupHelpers } from "../../../../hooks";
import { BUTTON_THEME, SIZES } from "../../../../shared";
import {
  Button,
  HFlex,
  IconActive,
  Spacer,
  VFlex,
  Text,
  Tooltip,
} from "../../../common";

interface SpacedRepetitionControllerProps {}

const SpacedRepetitionController: React.FC<SpacedRepetitionControllerProps> = () => {
  const { theme } = usePageSetupHelpers(ThemeContext);
  const messagePrefix = "studyMode.spacedRepetition";

  const spacedRepetitionButton = (
    buttonStyle: BUTTON_THEME,
    buttonText: string,
    reviewText: string,
    reviewTime: string
  ) => {
    return (
      <VFlex>
        <Button buttonStyle={buttonStyle} size={SIZES.MEDIUM} width="180px">
          <FormattedMessage id={buttonText} />
        </Button>
        <Spacer height={theme.spacers.size8} />
        <Text
          fontColor={theme.colors.grey1}
          fontSize={theme.typography.fontSizes.size14}
        >
          <FormattedMessage id={reviewText} values={{ time: reviewTime }} />
        </Text>
      </VFlex>
    );
  };

  return (
    <VFlex>
      <Tooltip id="FlipFlashcard" text="tooltips.studyMode.flip" place="top">
        <IconActive>
          <FlipIcon size={SIZES.LARGE} />
        </IconActive>
      </Tooltip>
      <Spacer height={theme.spacers.size24} />
      <HFlex width="90%" justifyContent="space-evenly">
        {spacedRepetitionButton(
          BUTTON_THEME.DANGER,
          `${messagePrefix}.controller.repeat`,
          `${messagePrefix}.controller.nextReview`,
          "<10 mins"
        )}
        {spacedRepetitionButton(
          BUTTON_THEME.SECONDARY,
          `${messagePrefix}.controller.remembered`,
          `${messagePrefix}.controller.nextReview`,
          "1 day"
        )}
        {spacedRepetitionButton(
          BUTTON_THEME.PRIMARY,
          `${messagePrefix}.controller.easilyRemembered`,
          `${messagePrefix}.controller.nextReview`,
          "6 days"
        )}
      </HFlex>
    </VFlex>
  );
};

export default SpacedRepetitionController;
