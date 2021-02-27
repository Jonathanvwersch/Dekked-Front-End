import React, { createContext, useEffect } from "react";
import { useTheme } from "react-jss";
import { ThemeType } from "../theme";
import { useBinders } from "../services/file-structure/useBinders";
import { useFileTree } from "../services/file-structure/useFileTree";
import { useFolders } from "../services/file-structure/useFolders";
import { useStudyPacks } from "../services/file-structure/useStudyPacks";

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
}

export const FileTreeContext = createContext<FileTreeContextTypes>({
  // updateFileTree: async () => {},
  handleAddingAsset: () => {},
  fileTree: {},
  getAsset: (type, asset_id) => undefined,
});

export const FileTreeContextProvider: React.FC = ({ children }) => {
  const { getFileTree, fileTree } = useFileTree();
  const { getFolders, addFolder, folders } = useFolders();
  const { getStudyPacks, addStudyPack, studyPacks } = useStudyPacks();
  const { getBinders, addBinder, binders } = useBinders();
  const theme: ThemeType = useTheme();

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
    console.log(fileTree);
    console.log(folders);
    console.log(binders);
    console.log(studyPacks);
  }, [fileTree, folders, studyPacks, binders]);

  return (
    <FileTreeContext.Provider
      value={{
        //   updateFileTree: async () => {},
        handleAddingAsset,
        fileTree,
        getAsset,
      }}
    >
      {children}
    </FileTreeContext.Provider>
  );
};
