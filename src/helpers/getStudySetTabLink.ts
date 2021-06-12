import { TAB_TYPE } from "../shared";

export const StudySetTabKey = "study-set-tabs-state";

export const getStudySetTabLink = (id: string | undefined) => {
  const studySetTab = localStorage.getItem("study-set-tabs-state");
  return studySetTab?.[id as any] || TAB_TYPE.NOTES;
};
