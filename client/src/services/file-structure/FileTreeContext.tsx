import React from "react";
import { useBinders } from "./useBinders";
import { useFileTree } from "./useFileTree";
import { useFolders } from "./useFolders";
import { useStudyPacks } from "./useStudyPacks";

export const FileTreeContext = React.createContext<{
  // updateFileTree: () => Promise<void>;
  handleAddingAsset: (
    type: string,
    name: string,
    parent_id: string,
    color: string
  ) => void;
  getAsset: (
    type: string,
    asset_id: string
  ) => FolderInterface | BinderInterface | StudyPackInterface | undefined;
  fileTree: FileTreeInterface;
}>({
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

  const handleAddingAsset = (
    type: string,
    name: string,
    parent_id: string,
    color: string
  ) => {
    switch (type) {
      case "folder":
        addFolder(name, color);
        break;
      case "binder":
        addBinder(name, color, parent_id);
        break;
      case "study_pack":
        addStudyPack(name, color, parent_id);
        break;
      default:
        break;
    }
  };

  const getAsset = (type: string, asset_id: string) => {
    switch (type) {
      case "folder":
        return folders[asset_id];
      case "binder":
        return binders[asset_id];
      case "study_pack":
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

  React.useEffect(() => {
    fullFileTreeUpdate();
  }, []);

  React.useEffect(() => {
    console.log(fileTree);
    console.log(folders);
    console.log(studyPacks);
    console.log(binders);
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
