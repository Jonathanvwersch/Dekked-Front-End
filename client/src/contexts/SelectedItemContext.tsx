import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileTreeContext, FILETREE_TYPES } from "./FileTreeContext";

interface SelectedItemContextProps {
  folderData: FolderInterface | undefined;
  binderData: BinderInterface | undefined;
  studySetData: StudyPackInterface | undefined;

  type: FILETREE_TYPES;
  id: string;
  numOfBinders: number | undefined;
  numOfStudySets: number | undefined;
  selectedBlockName: string | undefined;
  handleSelectedBlockName: (name: string) => void;
}

export const SelectedItemContext = createContext<SelectedItemContextProps>({
  folderData: undefined,
  binderData: undefined,
  studySetData: undefined,
  type: FILETREE_TYPES.FOLDER,
  id: "",
  numOfBinders: 0,
  numOfStudySets: 0,
  selectedBlockName: "",
  handleSelectedBlockName: (name: string) => {},
});

export const SelectedItemContextProvider: React.FC = ({ children }) => {
  const { type, id } = useParams<{ type: FILETREE_TYPES; id: string }>();
  const { getAsset, fileTree } = useContext(FileTreeContext);
  const [numOfBinders, setNumOfBinders] = useState<number>(0);
  const [numOfStudySets, setNumOfStudySets] = useState<number>(0);
  const [folderData, setFolderData] = useState<FolderInterface>();
  const [binderData, setBinderData] = useState<BinderInterface>();
  const [studySetData, setStudySetData] = useState<StudyPackInterface>();

  const [selectedBlockName, setSelectedBlockName] = useState<
    string | undefined
  >();

  const handleSelectedBlockName = (name: string) => {
    setSelectedBlockName(name);
  };

  useEffect(() => {
    if (type === FILETREE_TYPES.FOLDER) {
      setFolderData(getAsset(type, id) as FolderInterface);
      setSelectedBlockName(folderData?.name);
      folderData &&
        fileTree[folderData?.id!]?.children &&
        setNumOfBinders(
          Object.keys(fileTree[folderData?.id!]?.children).length
        );
      setNumOfStudySets(0);
    } else if (type === FILETREE_TYPES.BINDER) {
      setBinderData(getAsset(type, id) as BinderInterface);
      setSelectedBlockName(binderData?.name);
      binderData &&
        setFolderData(
          getAsset(
            FILETREE_TYPES.FOLDER,
            binderData?.folder_id!
          ) as FolderInterface
        );

      folderData &&
        fileTree[folderData?.id!]?.children[id]?.children &&
        setNumOfStudySets(
          Object.keys(fileTree[folderData?.id!]?.children[id]?.children).length
        );
      setNumOfBinders(0);
    } else if (type === FILETREE_TYPES.STUDY_SET) {
      setStudySetData(getAsset(type, id) as StudyPackInterface);
      setSelectedBlockName(studySetData?.name);
      studySetData &&
        setBinderData(
          getAsset(
            FILETREE_TYPES.BINDER,
            studySetData?.binder_id!
          ) as BinderInterface
        );
      binderData &&
        setFolderData(
          getAsset(
            FILETREE_TYPES.FOLDER,
            binderData?.folder_id!
          ) as FolderInterface
        );
    }
  }, [id, binderData, studySetData, folderData, getAsset, type, fileTree]);

  return (
    <SelectedItemContext.Provider
      value={{
        folderData,
        binderData,
        studySetData,
        type,
        id,
        numOfBinders,
        numOfStudySets,
        selectedBlockName,
        handleSelectedBlockName,
      }}
    >
      {children}
    </SelectedItemContext.Provider>
  );
};
