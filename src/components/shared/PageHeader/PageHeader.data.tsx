import { STUDY_MODE_TYPES } from "../../../shared";

export type ScrollerModalData = {
  label: any;
  value: any;
  icon?: React.ReactNode;
  style?: string;
  divider?: boolean;
  turnOffHover?: boolean;
  id?: string;
}[];

export const studyButtonData = [
  {
    label: "studyMode.types.freeStudy",
    value: STUDY_MODE_TYPES.FREE_STUDY,
  },
  {
    label: "studyMode.types.spacedRepetition",
    value: STUDY_MODE_TYPES.SPACED_REPETITION,
  },
];
