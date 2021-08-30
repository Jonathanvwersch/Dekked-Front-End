import { round } from "lodash";
import { orZero } from "../../../../helpers";
import { FlashcardQuality, FlashcardStatus } from "../../../../shared";

export const messagePrefix = "studyMode.spacedRepetition";

const getTimingUnit = (timing: number, unit: string) => {
  if (unit === "dd") {
    if (timing === 1) return `${messagePrefix}.controller.day`;
    else return `${messagePrefix}.controller.days`;
  } else if (unit === "mm") {
    if (timing === 1) return `${messagePrefix}.controller.month`;
    else return `${messagePrefix}.controller.months`;
  } else if (unit === "yy") {
    if (timing === 1) return `${messagePrefix}.controller.year`;
    else return `${messagePrefix}.controller.years`;
  }

  return `${messagePrefix}.controller.days`;
};

export const formatTimings = (timing: number) => {
  let _formattedTiming = 0;
  let unit = getTimingUnit(_formattedTiming, "dd");

  if (timing <= 30) {
    _formattedTiming = round(timing, 1);
    unit = getTimingUnit(_formattedTiming, "dd");
  } else if (timing > 30 && timing < 365) {
    _formattedTiming = round(timing / 30, 1);
    unit = getTimingUnit(_formattedTiming, "mm");
  } else {
    _formattedTiming = round(timing / 365, 1);
    unit = getTimingUnit(_formattedTiming, "yy");
  }

  return { timing: _formattedTiming, unit };
};

const calculateGraduatedInterval = (
  quality: FlashcardQuality,
  interval: number | undefined,
  easeFactor: number | undefined,
  easyBonus: number | undefined
) => {
  const _easeFactor =
    orZero(easeFactor) > 100 ? orZero(easeFactor) / 100 : orZero(easeFactor);
  const _interval = interval === 0 ? 1 : orZero(interval);
  const _easyBonus =
    orZero(easyBonus) > 100 ? orZero(easyBonus) / 100 : orZero(easyBonus);

  if (quality === FlashcardQuality.REPEAT) {
    return 0;
  } else if (quality === FlashcardQuality.REMEMBERED) {
    return Math.round(_interval * _easeFactor);
  } else if (quality === FlashcardQuality.EASILY_REMEMBERED) {
    const newEaseFactor = (orZero(easeFactor) + 15) / 100;
    return Math.round(_interval * newEaseFactor * _easyBonus);
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
    return calculateGraduatedInterval(
      FlashcardQuality.REMEMBERED,
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
    return calculateGraduatedInterval(
      FlashcardQuality.EASILY_REMEMBERED,
      interval,
      easeFactor,
      easyBonus
    );
  }

  return 0;
};

export const calculateNewInterval = (
  quality: FlashcardQuality,
  status: FlashcardStatus | undefined,
  interval: number | undefined,
  easeFactor: number | undefined,
  easyBonus: number | undefined
) => {
  if (quality === FlashcardQuality.REPEAT) {
    return 0;
  } else if (quality === FlashcardQuality.REMEMBERED) {
    return rememberedButtonTimings(status, interval, easeFactor, easyBonus);
  } else {
    return easilyRememberedButtonTimings(
      status,
      interval,
      easeFactor,
      easyBonus
    );
  }
};
