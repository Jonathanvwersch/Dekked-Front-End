import React, { createContext, useContext, useEffect } from "react";
import { ThemeType } from "../styles/theme";
import { useBinders } from "../services/file-structure/useBinders";
import { useFileTree } from "../services/file-structure/useFileTree";
import { useFolders } from "../services/file-structure/useFolders";
import { useStudyPacks } from "../services/file-structure/useStudyPacks";
import { ThemeContext } from "styled-components";

export enum FILETREE_TYPES {
  FOLDER = "folder",
  BINDER = "binder",
  STUDY_SET = "study_pack",
}

interface FileTreeContextTypes {
  // updateFileTree: () => Promise<void>;
  handleAddingAsset: (type: string, parent_id?: string) => void;
  getAsset: (
    type: string,
    asset_id: string
  ) => FolderInterface | BinderInterface | StudyPackInterface | undefined;
  fileTree: FileTreeInterface;
  updateAsset: (
    type: string,
    asset_id: string,
    update_data: {
      color?: string;
      name?: string;
    }
  ) => void;
}

export const FileTreeContext = createContext<FileTreeContextTypes>({
  handleAddingAsset: () => {},
  fileTree: {},
  getAsset: (type, asset_id) => undefined,
  updateAsset: (type, asset_id, update_data) => {},
});

export const FileTreeContextProvider: React.FC = ({ children }) => {
  const { getFileTree, fileTree } = useFileTree();
  const { getFolders, addFolder, folders, updateFolder } = useFolders();
  const {
    getStudyPacks,
    addStudyPack,
    studyPacks,
    updateStudyPack,
  } = useStudyPacks();
  const { getBinders, addBinder, binders, updateBinder } = useBinders();
  const theme: ThemeType = useContext(ThemeContext);

  const handleAddingAsset = (type: string, parent_id?: string) => {
    const iconColor = theme.colors.iconColor;
    const itemName = "";

    switch (type) {
      case FILETREE_TYPES.FOLDER:
        addFolder(itemName, iconColor);
        break;
      case FILETREE_TYPES.BINDER:
        parent_id && addBinder(itemName, iconColor, parent_id);
        break;
      case FILETREE_TYPES.STUDY_SET:
        parent_id && addStudyPack(itemName, iconColor, parent_id);
        break;
      default:
        break;
    }
  };

  const getAsset = (type: string, asset_id: string) => {
    switch (type) {
      case FILETREE_TYPES.FOLDER:
        return folders[asset_id];
      case FILETREE_TYPES.BINDER:
        return binders[asset_id];
      case FILETREE_TYPES.STUDY_SET:
        return studyPacks[asset_id];
      default:
        break;
    }
  };

  const updateAsset = (
    type: string,
    asset_id: string,
    update_data: {
      color?: string;
      name?: string;
    }
  ) => {
    switch (type) {
      case FILETREE_TYPES.FOLDER:
        return updateFolder(asset_id, update_data);
      case FILETREE_TYPES.BINDER:
        return updateBinder(asset_id, update_data);
      case FILETREE_TYPES.STUDY_SET:
        return updateStudyPack(asset_id, update_data);
      // case FILETREE_TYPES.BINDER:
      //   return binders[asset_id];
      // case FILETREE_TYPES.STUDY_SET:
      //   return studyPacks[asset_id];
      default:
        break;
    }
  };

  const fullFileTreeUpdate = () => {
    getFileTree();
    getFolders();
    getStudyPacks();
    getBinders();
  };

  useEffect(() => {
    fullFileTreeUpdate();
  }, []);

  useEffect(() => {
    getFileTree();
  }, [folders, studyPacks, binders]);

  return (
    <FileTreeContext.Provider
      value={{
        //   updateFileTree: async () => {},
        handleAddingAsset,
        fileTree,
        getAsset,
        updateAsset,
      }}
    >
      {children}
    </FileTreeContext.Provider>
  );
};
