import { createContext } from "react";
import { useStorageState } from "../hooks";
import { TAB_TYPE } from "../shared";

interface StudySetTabContextProps {
  studySetTab: { [id: string]: TAB_TYPE };
  setStudySetTab: React.Dispatch<
    React.SetStateAction<{
      [id: string]: TAB_TYPE;
    }>
  >;
  studySetTabLink: (id: string) => any;
}

export const StudySetTabContext = createContext<StudySetTabContextProps>(
  {} as StudySetTabContextProps
);

export const StudySetTabProvider: React.FC = ({ children }) => {
  // store state of study set tabs (either flashcard or notes)
  const { value: studySetTab, setValue: setStudySetTab } = useStorageState<{
    [id: string]: TAB_TYPE;
  }>({}, "study-set-tabs-state");

  const studySetTabLink = (id: string) => {
    return studySetTab[id] || TAB_TYPE.NOTES;
  };

  return (
    <StudySetTabContext.Provider
      value={{
        studySetTab,
        setStudySetTab,
        studySetTabLink,
      }}
    >
      {children}
    </StudySetTabContext.Provider>
  );
};
