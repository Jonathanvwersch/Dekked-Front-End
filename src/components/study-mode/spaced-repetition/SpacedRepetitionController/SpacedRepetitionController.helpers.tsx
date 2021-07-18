import { orZero } from "../../../../helpers";
import { FlashcardQuality, FlashcardStatus } from "../../../../shared";

export const calculateNewInterval = (
  quality: FlashcardQuality,
  interval: number | undefined,
  easeFactor: number | undefined,
  easyBonus: number | undefined
) => {
  if (quality === FlashcardQuality.REPEAT) {
    return 0;
  } else if (quality === FlashcardQuality.REMEMBERED) {
    const newInterval = interval === 0 ? 1 : interval;
    return Math.round(orZero(newInterval) * (orZero(easeFactor) / 100));
  } else if (quality === FlashcardQuality.EASILY_REMEMBERED) {
    const newEaseFactor = orZero(easeFactor) + 15;
    return Math.round(
      ((orZero(interval) * newEaseFactor) / 100) * orZero(easyBonus) || 0
    );
  }
  return 0;
};

export const rememberedButtonTimings = (
  status: FlashcardStatus | undefined,
  interval: number | undefined,
  easeFactor: number | undefined,
  easyBonus: number | undefined
) => {
  if (status === FlashcardStatus.NEW) {
    return 1;
  } else if (status === FlashcardStatus.NEW_1) {
    return 6;
  } else if (status === FlashcardStatus.NEW_2) {
    return 14;
  }

  if (status === FlashcardStatus.GRADUATED) {
    return calculateNewInterval(
      FlashcardQuality.EASILY_REMEMBERED,
      interval,
      easeFactor,
      easyBonus
    );
  }

  return 0;
};

export const easilyRememberedButtonTimings = (
  status: FlashcardStatus | undefined,
  interval: number | undefined,
  easeFactor: number | undefined,
  easyBonus: number | undefined
) => {
  if (status === FlashcardStatus.NEW) {
    return 1;
  } else if (status === FlashcardStatus.NEW_1) {
    return 6;
  } else if (status === FlashcardStatus.NEW_2) {
    return 14;
  }
  if (status === FlashcardStatus.GRADUATED) {
    return calculateNewInterval(
      FlashcardQuality.EASILY_REMEMBERED,
      interval,
      easeFactor,
      easyBonus
    );
  }

  return 0;
};
