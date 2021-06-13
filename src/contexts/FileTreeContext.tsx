import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeType } from "../styles/theme";
import { ThemeContext } from "styled-components";
import { FILETREE_TYPES } from "../shared";
import {
  useBinders,
  useFileTree,
  useFolders,
  useStudyPacks,
} from "../services/file-structure";
interface FileTreeContextTypes {
  addAsset: (type: string, parentId?: string | undefined) => boolean;
  getAsset: (
    type: string,
    asset_id: string
  ) => FolderInterface | BinderInterface | StudyPackInterface | undefined;
  fileTree: FileTreeInterface;
  folders: {
    [key: string]: FolderInterface;
  };
  binders: {
    [key: string]: BinderInterface;
  };
  studyPacks: {
    [key: string]: StudyPackInterface;
  };
  updateAsset: (
    type: string,
    asset_id: string,
    update_data: {
      color?: string;
      name?: string;
    }
  ) => void;
  deleteAsset: (type: string, assetId: string) => Promise<void> | undefined;
  setFolders: React.Dispatch<
    React.SetStateAction<{
      [key: string]: FolderInterface;
    }>
  >;
  setStudyPacks: React.Dispatch<
    React.SetStateAction<{
      [key: string]: StudyPackInterface;
    }>
  >;
  setBinders: React.Dispatch<
    React.SetStateAction<{
      [key: string]: BinderInterface;
    }>
  >;
  setFileTree: React.Dispatch<React.SetStateAction<FileTreeInterface>>;
  isLoading: boolean;
}

export const FileTreeContext = createContext<FileTreeContextTypes>(
  {} as FileTreeContextTypes
);

export const FileTreeContextProvider: React.FC = ({ children }) => {
  const { getFileTree, fileTree, setFileTree } = useFileTree();
  const {
    getFolders,
    addFolder,
    folders,
    updateFolder,
    deleteFolder,
    setFolders,
  } = useFolders();
  const {
    setStudyPacks,
    getStudyPacks,
    addStudyPack,
    studyPacks,
    updateStudyPack,
    deleteStudyPack,
  } = useStudyPacks();
  const {
    getBinders,
    addBinder,
    binders,
    updateBinder,
    deleteBinder,
    setBinders,
  } = useBinders();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme: ThemeType = useContext(ThemeContext);
  const folderLength = Object.keys(folders).length;
  const binderLength = Object.keys(binders).length;
  const studySetLength = Object.keys(studyPacks).length;
  console.log(binders);
  const iconColor = theme.colors.primary;
  const itemName = "";

  const addAsset = (type: string, parentId?: string) => {
    switch (type) {
      case FILETREE_TYPES.FOLDER:
        addFolder(itemName, iconColor);
        break;
      case FILETREE_TYPES.BINDER:
        parentId && addBinder(itemName, iconColor, parentId);
        break;
      case FILETREE_TYPES.STUDY_SET:
        parentId && addStudyPack(itemName, iconColor, parentId);
        break;
      default:
        break;
    }
    return true;
  };

  const getAsset = (type: string, assetId: string) => {
    switch (type) {
      case FILETREE_TYPES.FOLDER:
        return folders[assetId];
      case FILETREE_TYPES.BINDER:
        return binders[assetId];
      case FILETREE_TYPES.STUDY_SET:
        return studyPacks[assetId];
      default:
        break;
    }
  };

  const updateAsset = (
    type: string,
    assetId: string,
    updateData: {
      color?: string;
      name?: string;
    }
  ) => {
    switch (type) {
      case FILETREE_TYPES.FOLDER:
        return updateFolder(assetId, updateData);
      case FILETREE_TYPES.BINDER:
        return updateBinder(assetId, updateData);
      case FILETREE_TYPES.STUDY_SET:
        return updateStudyPack(assetId, updateData);
      default:
        break;
    }
  };

  const deleteAsset = (type: string, assetId: string) => {
    switch (type) {
      case FILETREE_TYPES.FOLDER:
        return deleteFolder(assetId, itemName, iconColor);
      case FILETREE_TYPES.BINDER:
        return deleteBinder(assetId);
      case FILETREE_TYPES.STUDY_SET:
        return deleteStudyPack(assetId);
      default:
        break;
    }
  };

  const fullFileTreeUpdate = () => {
    getFileTree();
    getFolders(itemName, iconColor);
    getBinders();
    getStudyPacks();
  };

  useEffect(() => {
    setIsLoading(true);
    fullFileTreeUpdate();
    setIsLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useMemo(() => {
    getFileTree();
  }, [folderLength, binderLength, studySetLength]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FileTreeContext.Provider
      value={{
        addAsset,
        fileTree,
        getAsset,
        updateAsset,
        binders,
        folders,
        studyPacks,
        deleteAsset,
        setBinders,
        setStudyPacks,
        setFolders,
        setFileTree,
        isLoading,
      }}
    >
      {children}
    </FileTreeContext.Provider>
  );
};
