import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileTreeContext, FILETREE_TYPES } from "./FileTreeContext";

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
}

export const SelectedItemContext = createContext<SelectedItemContextProps>({
  folderData: undefined,
  binderData: undefined,
  studySetData: undefined,
  selectedItemData: undefined,
  type: FILETREE_TYPES.FOLDER,
  id: "",
});

export const SelectedItemContextProvider: React.FC = ({ children }) => {
  const [folderData, setFolderData] = useState<FolderInterface>();
  const [binderData, setBinderData] = useState<BinderInterface>();
  const [studySetData, setStudySetData] = useState<StudyPackInterface>();
  const [selectedItemData, setSelectedItemData] = useState<
    FolderInterface | BinderInterface | StudyPackInterface
  >();
  const { type, id } = useParams<{ type: FILETREE_TYPES; id: string }>();
  const { getAsset } = useContext(FileTreeContext);

  useEffect(() => {
    if (type === FILETREE_TYPES.FOLDER) {
      setFolderData(getAsset(type, id) as FolderInterface);
      setSelectedItemData(getAsset(type, id) as FolderInterface);
    } else if (type === FILETREE_TYPES.BINDER) {
      setBinderData(getAsset(type, id) as BinderInterface);
      setSelectedItemData(getAsset(type, id) as BinderInterface);
      setFolderData(
        getAsset(
          FILETREE_TYPES.FOLDER,
          binderData?.folder_id!
        ) as FolderInterface
      );
    } else {
      setSelectedItemData(getAsset(type, id) as StudyPackInterface);
      setStudySetData(getAsset(type, id) as StudyPackInterface);
      setBinderData(
        getAsset(
          FILETREE_TYPES.BINDER,
          studySetData?.binder_id!
        ) as BinderInterface
      );
      setFolderData(
        getAsset(
          FILETREE_TYPES.FOLDER,
          binderData?.folder_id!
        ) as FolderInterface
      );
    }
  }, [id, binderData, studySetData, folderData, getAsset, type]);

  return (
    <SelectedItemContext.Provider
      value={{
        selectedItemData,
        folderData,
        binderData,
        studySetData,
        type,
        id,
      }}
    >
      {children}
    </SelectedItemContext.Provider>
  );
};
