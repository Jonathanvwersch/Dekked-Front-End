import { createContext, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useStorageState } from "../hooks";
import { FILETREE_TYPES, Params } from "../shared";
import { FileTreeContext } from "./FileTreeContext";

interface SidebarBlocksContextProps {
  isBlockOpen: { [id: string]: boolean };
  handleOpenBlock: (id: string, isOpen?: boolean) => void;
  handleAddBlock: (id: string, type: string) => void;
  handleDeleteBlock: (id: string, type: string) => void;
}

export const SidebarBlocksContext = createContext<SidebarBlocksContextProps>(
  {} as SidebarBlocksContextProps
);

export const SidebarBlocksContextProvider: React.FC = ({ children }) => {
  const {
    addAsset,
    deleteAsset,
    fileTree,
    binders,
    studyPacks,
    folders,
    setFolders,
  } = useContext(FileTreeContext);
  const history = useHistory();
  const { id: urlId } = useParams<Params>();

  // handle opening and closing of sidebar blocks
  const { value: isBlockOpen, setValue: setIsBlockOpen } = useStorageState<{
    [id: string]: boolean;
  }>({}, "blocks-state");

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
  const handleAddBlock = (id: string, type: string) => {
    addAsset(type, id);
    handleOpenBlock(id, true);
  };

  // handle deleting of blocks
  const handleDeleteBlock = (id: string, type: string) => {
    const shouldRedirect = urlId === id;

    if (type === FILETREE_TYPES.STUDY_SET) {
      // navigate to parent binder after deleting a study pack
      const parentBinder = binders[studyPacks?.[id]?.binder_id];
      const parentBinderId = parentBinder?.id;

      const parentBinderLink = `/${FILETREE_TYPES.BINDER}/${parentBinderId}`;
      shouldRedirect && history.push(parentBinderLink);

      // Close binder if you are deleting last study set
      // makes for cleaner UX
      const numberOfStudySets = Object.keys(
        fileTree?.[parentBinder?.folder_id]?.children?.[parentBinderId]
          ?.children
      )?.length;

      // delete study pack on client side
      // setStudyPacks((delete studyPacks[id], studyPacks));
      // setFileTree(
      //   (delete fileTree[parentBinder?.folder_id]?.children[parentBinderId]
      //     .children[id],
      //   fileTree)
      // );

      if (numberOfStudySets === 1) {
        handleOpenBlock(parentBinderId, false);
      }
    } else if (type === FILETREE_TYPES.BINDER) {
      // navigate to parent folder after deleting a binder
      const parentFolder = folders?.[binders?.[id]?.folder_id];
      const parentFolderId = parentFolder?.id;
      const parentFolderLink = `/${FILETREE_TYPES.FOLDER}/${parentFolderId}`;

      shouldRedirect && history.push(parentFolderLink);
      studyPacks?.[urlId]?.binder_id === id && history.push(parentFolderLink);

      // Close folder if you are deleting last binder
      // makes for cleaner UX
      const numberOfBinders = Object.keys(
        fileTree?.[parentFolder?.id]?.children
      )?.length;

      // delete binder on client side
      // setBinders((delete binders[id], binders));
      // setFileTree((delete fileTree[parentFolder?.id].children[id], fileTree));

      if (numberOfBinders === 1) {
        handleOpenBlock(parentFolderId, false);
      }
    } else {
      // delete folder on client side
      // not deleting if last folder item
      if (Object.keys(fileTree)?.length > 1) {
        setFolders((delete folders[id], folders));
      }

      // navigate to first folder after deleting a folder
      const firstFolderId = Object.keys(fileTree)[0];
      const firstFolderLink = `/${FILETREE_TYPES.FOLDER}/${firstFolderId}`;

      shouldRedirect ||
        ((binders?.[studyPacks?.[urlId]?.binder_id]?.folder_id === id ||
          binders?.[urlId]?.folder_id === id) &&
          history.push(firstFolderLink));
    }
    // delete study pack on back end
    deleteAsset(type, id);
  };

  return (
    <SidebarBlocksContext.Provider
      value={{
        isBlockOpen,
        handleOpenBlock,
        handleAddBlock,
        handleDeleteBlock,
      }}
    >
      {children}
    </SidebarBlocksContext.Provider>
  );
};
