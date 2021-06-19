import { useAtom } from "jotai";
import { createContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsset } from "../helpers";
import { FILETREE_TYPES, Params, TAB_TYPE } from "../shared";
import { fileTreeAtom, isAppLoadingAtom } from "../store";

interface SelectedItemContextProps {
  folderData: FolderInterface | undefined;
  binderData: BinderInterface | undefined;
  studySetData: StudyPackInterface | undefined;
  selectedItemData:
    | FolderInterface
    | BinderInterface
    | StudyPackInterface
    | undefined;
  type: FILETREE_TYPES;
  id: string;
  selectedBlockName: string;
  handleSelectedBlockName: (name: string) => void;
  tab: TAB_TYPE;
}

export const SelectedItemContext = createContext<SelectedItemContextProps>(
  {} as SelectedItemContextProps
);

export const SelectedItemContextProvider: React.FC = ({ children }) => {
  const { type, id, tab } = useParams<Params>();
  const [fileTree] = useAtom(fileTreeAtom);
  const [folderData, setFolderData] = useState<FolderInterface>();
  const [binderData, setBinderData] = useState<BinderInterface>();
  const [studySetData, setStudySetData] = useState<StudyPackInterface>();
  const [, setLoading] = useAtom(isAppLoadingAtom);
  const [selectedItemData, setSelectedItemData] =
    useState<FolderInterface | BinderInterface | StudyPackInterface>();
  const [selectedBlockName, setSelectedBlockName] = useState<string>("");
  const { getAsset } = useAsset();

  const handleSelectedBlockName = (name: string) => {
    setSelectedBlockName(name);
  };

  useMemo(() => {
    selectedItemData && handleSelectedBlockName(selectedItemData.name);
  }, [selectedItemData]);

  useMemo(() => {
    if (type === FILETREE_TYPES.FOLDER) {
      setFolderData(getAsset(type, id) as FolderInterface);
      setSelectedItemData(getAsset(type, id) as FolderInterface);
      if (folderData) setLoading(false);
    } else if (type === FILETREE_TYPES.BINDER) {
      setBinderData(getAsset(type, id) as BinderInterface);
      setSelectedItemData(getAsset(type, id) as BinderInterface);
      binderData &&
        setFolderData(
          getAsset(
            FILETREE_TYPES.FOLDER,
            binderData?.folder_id
          ) as FolderInterface
        );

      if (binderData) setLoading(false);
    } else if (type === FILETREE_TYPES.STUDY_SET) {
      setSelectedItemData(getAsset(type, id) as StudyPackInterface);
      setStudySetData(getAsset(type, id) as StudyPackInterface);
      studySetData &&
        setBinderData(
          getAsset(
            FILETREE_TYPES.BINDER,
            studySetData?.binder_id
          ) as BinderInterface
        );
      binderData &&
        setFolderData(
          getAsset(
            FILETREE_TYPES.FOLDER,
            binderData?.folder_id
          ) as FolderInterface
        );
      if (studySetData && binderData) setLoading(false);
    }
  }, [id, binderData, studySetData, folderData, type, getAsset, setLoading]);

  return (
    <SelectedItemContext.Provider
      value={{
        selectedItemData,
        folderData,
        binderData,
        studySetData,
        type,
        id,
        selectedBlockName,
        handleSelectedBlockName,
        tab,
      }}
    >
      {children}
    </SelectedItemContext.Provider>
  );
};
