import { createContext, useState } from "react";

interface SelectedItem {
  folderData: FolderInterface | undefined;
  binderData?: BinderInterface | undefined;
  studySetData?: StudyPackInterface | undefined;
}

interface SidebarContextProps {
  sidebar: boolean;
  handleSidebar: () => void;
  selectedItem: SelectedItem | undefined;
  handleFolderData: (folderData: FolderInterface) => void;
  handleBinderData: (folder: FolderInterface, binder: BinderInterface) => void;
  handleStudySetData: (
    folder: FolderInterface,
    binder: BinderInterface,
    studySet: StudyPackInterface
  ) => void;
}

export const SidebarContext = createContext<SidebarContextProps>({
  sidebar: true,
  handleSidebar: () => {},
  selectedItem: {
    folderData: undefined,
    binderData: undefined,
    studySetData: undefined,
  },
  handleFolderData: () => {},
  handleBinderData: () => {},
  handleStudySetData: () => {},
});

export const SidebarContextProvider: React.FC = ({ children }) => {
  const [sidebar, setSidebar] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<{
    folderData: FolderInterface;
    binderData?: BinderInterface;
    studySetData?: StudyPackInterface;
  }>();

  const handleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  const handleFolderData = (folder: FolderInterface) => {
    setSelectedItem({ folderData: folder });
  };

  const handleBinderData = (
    folder: FolderInterface,
    binder: BinderInterface
  ) => {
    setSelectedItem({
      folderData: folder,
      binderData: binder,
    });
  };

  const handleStudySetData = (
    folder: FolderInterface,
    binder: BinderInterface,
    studySet: StudyPackInterface
  ) => {
    setSelectedItem({
      folderData: folder,
      binderData: binder,
      studySetData: studySet,
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebar,
        handleSidebar,
        selectedItem,
        handleFolderData,
        handleBinderData,
        handleStudySetData,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
