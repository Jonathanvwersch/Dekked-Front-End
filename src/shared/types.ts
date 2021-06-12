import { FILETREE_TYPES, STUDY_MODE_TYPES, TAB_TYPE } from ".";

export type ScrollerModalData = {
  label: any;
  value: any;
  icon?: React.ReactNode;
  style?: string;
  divider?: boolean;
  turnOffHover?: boolean;
  id?: string;
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

export type UserType = {
  id: string;
  email_address: string;
  first_name: string;
  last_name: string;
};

export type DropDownType = {
  label: string;
  value: string;
};
