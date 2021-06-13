import { TAB_TYPE } from "../shared";

export const StudySetTabKey = "study-set-tabs-state";

export const getStudySetTabLink = (id: string | undefined) => {
  const studySetTab = window.localStorage.getItem(StudySetTabKey);
  const returnValue = studySetTab !== null && JSON.parse(studySetTab);
  return (id && returnValue[id]) || TAB_TYPE.NOTES;
};
