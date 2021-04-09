import { createContext, useContext } from "react";
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
  handleAddBlock: (id: string, type: FILETREE_TYPES) => void;
  studySetTabLink: (id: string) => any;
}

export const SidebarContext = createContext<SidebarContextProps>(
  {} as SidebarContextProps
);

export const SidebarContextProvider: React.FC = ({ children }) => {
  const { handleAddingAsset } = useContext(FileTreeContext);

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

  // helper function to open blocks
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

  const handleAddBlock = (id: string, type: FILETREE_TYPES) => {
    handleOpenBlock(id, true);
    handleAddingAsset(type, id);
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
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
