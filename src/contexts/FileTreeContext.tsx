import React, { createContext, useContext, useEffect, useMemo } from "react";
import { ThemeType } from "../styles/theme";
import { ThemeContext } from "styled-components/macro";
import { FILETREE_TYPES } from "../shared";
import {
  useBinders,
  useFileTree,
  useFolders,
  useStudyPacks,
} from "../services/file-structure";

interface FileTreeContextTypes {
  addAsset: (type: string, parentId?: string | undefined) => void;
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
  isTreeEmpty: boolean;
  updateAsset: (
    type: string,
    asset_id: string,
    update_data: {
      color?: string;
      name?: string;
    }
  ) => void;
  deleteAsset: (type: string, assetId: string) => Promise<void> | undefined;
}

export const FileTreeContext = createContext<FileTreeContextTypes>(
  {} as FileTreeContextTypes
);

export const FileTreeContextProvider: React.FC = ({ children }) => {
  const { getFileTree, fileTree, isTreeEmpty } = useFileTree();
  const { getFolders, addFolder, folders, updateFolder, deleteFolder } =
    useFolders();
  const {
    getStudyPacks,
    addStudyPack,
    studyPacks,
    updateStudyPack,
    deleteStudyPack,
  } = useStudyPacks();
  const { getBinders, addBinder, binders, updateBinder, deleteBinder } =
    useBinders();
  const theme: ThemeType = useContext(ThemeContext);
  const folderLength = Object.keys(folders).length;
  const binderLength = Object.keys(binders).length;
  const studySetLength = Object.keys(studyPacks).length;

  const addAsset = (type: string, parentId?: string) => {
    const iconColor = theme.colors.iconColor;
    const itemName = "";

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
        return deleteFolder(assetId);
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
    getFolders();
    getBinders();
    getStudyPacks();
  };

  useEffect(() => {
    fullFileTreeUpdate();
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
        isTreeEmpty,
        binders,
        folders,
        studyPacks,
        deleteAsset,
      }}
    >
      {children}
    </FileTreeContext.Provider>
  );
};
