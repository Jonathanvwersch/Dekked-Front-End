import { FILETREE_TYPES, STUDY_MODE_TYPES, TAB_TYPE } from ".";

export type ScrollerModalData = {
  label: any;
  icon?: React.ReactNode;
  style?: string;
  divider?: boolean;
  hoverCard?: boolean;
}[];

export type Params = {
  id: string;
  tab: TAB_TYPE;
  type: FILETREE_TYPES;
  flashcardIndex: string;
  studyModes: STUDY_MODE_TYPES;
};

export type CoordsType = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};
