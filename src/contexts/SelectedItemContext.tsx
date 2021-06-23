import { createContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAsset } from "../helpers";
import { FILETREE_TYPES, Params } from "../shared";

interface SelectedItemContextProps {
  folderData: FolderInterface | undefined;
  binderData: BinderInterface | undefined;
  studySetData: StudyPackInterface | undefined;
  selectedItemData:
    | FolderInterface
    | BinderInterface
    | StudyPackInterface
    | undefined;
}

export const SelectedItemContext = createContext<SelectedItemContextProps>(
  {} as SelectedItemContextProps
);

export const SelectedItemContextProvider: React.FC = ({ children }) => {
  const { type, id } = useParams<Params>();
  const [folderData, setFolderData] = useState<FolderInterface>();
  const [binderData, setBinderData] = useState<BinderInterface>();
  const [studySetData, setStudySetData] = useState<StudyPackInterface>();
  const [selectedItemData, setSelectedItemData] =
    useState<FolderInterface | BinderInterface | StudyPackInterface>();
  const { getAsset } = useGetAsset("slecteditemcontext");

  useMemo(() => {
    if (type === FILETREE_TYPES.FOLDER) {
      setFolderData(getAsset(type, id) as FolderInterface);
      setSelectedItemData(getAsset(type, id) as FolderInterface);
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
    }
  }, [id, binderData, studySetData, type, getAsset]);

  return (
    <SelectedItemContext.Provider
      value={{
        selectedItemData,
        folderData,
        binderData,
        studySetData,
      }}
    >
      {children}
    </SelectedItemContext.Provider>
  );
};
