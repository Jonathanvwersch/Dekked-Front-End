import { FILETREE_TYPES, STUDY_MODE_TYPES, TAB_TYPE } from ".";

export type ScrollerModalData = {
  label: any;
  icon: React.ReactNode;
  style?: string;
  divider?: boolean;
}[];

export type Params = {
  id: string;
  tab: TAB_TYPE;
  type: FILETREE_TYPES;
  studyModes: STUDY_MODE_TYPES;
};
