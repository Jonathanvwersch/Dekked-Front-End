import { createContext, useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FileTreeContext } from ".";
import { FILETREE_TYPES, Params, TAB_TYPE } from "../shared";

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
  numOfFolders: number;
  numOfBinders: number;
  numOfStudySets: number;
  selectedBlockName: string;
  handleSelectedBlockName: (name: string) => void;
  loading: boolean;
  tab: TAB_TYPE;
}

export const SelectedItemContext = createContext<SelectedItemContextProps>(
  {} as SelectedItemContextProps
);

export const SelectedItemContextProvider: React.FC = ({ children }) => {
  const { type, id, tab } = useParams<Params>();
  const { getAsset, fileTree } = useContext(FileTreeContext);
  const [numOfFolders, setNumOfFolders] = useState<number>(0);
  const [numOfBinders, setNumOfBinders] = useState<number>(0);
  const [numOfStudySets, setNumOfStudySets] = useState<number>(0);
  const [folderData, setFolderData] = useState<FolderInterface>();
  const [binderData, setBinderData] = useState<BinderInterface>();
  const [studySetData, setStudySetData] = useState<StudyPackInterface>();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItemData, setSelectedItemData] = useState<
    FolderInterface | BinderInterface | StudyPackInterface
  >();
  const [selectedBlockName, setSelectedBlockName] = useState<string>("");

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
      setNumOfFolders(Object.keys(fileTree).length);
      folderData &&
        fileTree[folderData?.id]?.children &&
        setNumOfBinders(Object.keys(fileTree[folderData?.id]?.children).length);
      setNumOfStudySets(0);
      if (folderData) setLoading(false);
    } else if (type === FILETREE_TYPES.BINDER) {
      setBinderData(getAsset(type, id) as BinderInterface);
      setSelectedItemData(getAsset(type, id) as BinderInterface);
      setNumOfFolders(Object.keys(fileTree).length);
      binderData &&
        setFolderData(
          getAsset(
            FILETREE_TYPES.FOLDER,
            binderData?.folder_id
          ) as FolderInterface
        );

      folderData &&
        fileTree[folderData?.id]?.children[id]?.children &&
        setNumOfStudySets(
          Object.keys(fileTree[folderData?.id]?.children[id]?.children).length
        );
      setNumOfBinders(0);
      if (binderData) setLoading(false);
    } else if (type === FILETREE_TYPES.STUDY_SET) {
      setSelectedItemData(getAsset(type, id) as StudyPackInterface);
      setStudySetData(getAsset(type, id) as StudyPackInterface);
      setNumOfFolders(Object.keys(fileTree).length);
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
  }, [id, binderData, studySetData, folderData, getAsset, type, fileTree]);

  return (
    <SelectedItemContext.Provider
      value={{
        selectedItemData,
        folderData,
        binderData,
        studySetData,
        type,
        id,
        numOfFolders,
        numOfBinders,
        numOfStudySets,
        selectedBlockName,
        handleSelectedBlockName,
        loading,
        tab,
      }}
    >
      {children}
    </SelectedItemContext.Provider>
  );
};
