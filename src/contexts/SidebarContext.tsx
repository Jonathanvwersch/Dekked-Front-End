import { createContext, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useStorageState } from "../hooks";
import { FILETREE_TYPES, TAB_TYPE } from "../shared";
import { FileTreeContext } from "./FileTreeContext";

interface SidebarContextProps {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  handleSidebar: () => void;
  isBlockOpen: { [id: string]: boolean };
  handleOpenBlock: (id: string, isOpen?: boolean) => void;
  studySetTab: { [id: string]: TAB_TYPE };
  handleStudySetTab: (id: string, tab: TAB_TYPE) => void;
  handleAddBlock: (id: string, type: string) => void;
  studySetTabLink: (id: string) => any;
  handleDeleteBlock: (id: string, type: string) => void;
}

export const SidebarContext = createContext<SidebarContextProps>(
  {} as SidebarContextProps
);

export const SidebarContextProvider: React.FC = ({ children }) => {
  const { addAsset, deleteAsset, fileTree, binders, studyPacks, folders } =
    useContext(FileTreeContext);
  const history = useHistory();

  // handle opening and closing of sidebar
  const [sidebar, setSidebar] = useStorageState(true, "sidebar-state");
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  // store state of study set tabs (either flashcard or notes)
  const [studySetTab, setStudySetTab] = useStorageState(
    {} as { [id: string]: TAB_TYPE },
    "study-set-tabs-state"
  );

  const studySetTabLink = (id: string) => {
    return studySetTab[id] || TAB_TYPE.NOTES;
  };

  // helper function to set state of study set tabs per block
  const handleStudySetTab = (id: string, tab: TAB_TYPE) => {
    if (tab === studySetTab[id]) return;
    let studySetTabsCopy = { ...studySetTab };
    studySetTabsCopy[id] = tab;
    setStudySetTab(studySetTabsCopy);
  };

  // handle opening and closing of sidebar blocks
  const [isBlockOpen, setIsBlockOpen] = useStorageState(
    {} as { [id: string]: boolean },
    "blocks-state"
  );

  // helper function to open blocks (i.e. click drop down arrow)
  // if you just want to switch the open state of a block just pass the id
  // if you want to set the block open state to something specific, pass isOpen
  const handleOpenBlock = (id: string, isOpen?: boolean) => {
    if (isOpen && isOpen === isBlockOpen[id]) return;

    let fileCopy = { ...isBlockOpen };
    if (isOpen === true || isOpen === false) {
      fileCopy[id] = isOpen;
    } else {
      fileCopy[id] = !fileCopy[id];
    }
    setIsBlockOpen(fileCopy);
  };

  // handle adding of blocks
  const handleAddBlock = async (id: string, type: string) => {
    await addAsset(type, id);
    handleOpenBlock(id, true);
  };

  // handle deleting of blocks
  const handleDeleteBlock = (id: string, type: string) => {
    deleteAsset(type, id);

    // navigate to parent binder if deleting study pack
    if (type === FILETREE_TYPES.STUDY_SET) {
      const parentBinder = binders[studyPacks[id].binder_id];
      const parentBinderId = parentBinder.id;
      const parentBinderLink = `/${FILETREE_TYPES.BINDER}/${parentBinderId}`;
      history.push(parentBinderLink);

      // Close binder if you are deleting last study set
      // makes for cleaner UX
      const numberOfStudySets = Object.keys(
        fileTree[parentBinder.folder_id].children[parentBinderId].children
      ).length;

      if (numberOfStudySets === 1) {
        handleOpenBlock(parentBinderId, false);
      }
    }
    // navigate to parent folder if deleting binder
    else if (type === FILETREE_TYPES.BINDER) {
      const parentFolder = folders[binders[id].folder_id];
      const parentFolderId = parentFolder.id;
      const parentFolderLink = `/${FILETREE_TYPES.FOLDER}/${parentFolderId}`;
      history.push(parentFolderLink);

      // Close folder if you are deleting last binder
      // makes for cleaner UX
      const numberOfBinders = Object.keys(
        fileTree[parentFolder.id].children
      ).length;

      if (numberOfBinders === 1) {
        handleOpenBlock(parentFolderId, false);
      }
    }
    // navigate to first folder if deleting folder
    else {
      const firstFolderId = Object.keys(fileTree)[0];
      const firstFolderLink = `/${FILETREE_TYPES.FOLDER}/${firstFolderId}`;
      history.push(firstFolderLink);
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebar,
        handleSidebar,
        setSidebar,
        isBlockOpen,
        handleOpenBlock,
        studySetTab,
        handleStudySetTab,
        handleAddBlock,
        studySetTabLink,
        handleDeleteBlock,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
