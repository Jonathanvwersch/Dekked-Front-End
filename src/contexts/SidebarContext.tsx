import { createContext, useContext, useState } from "react";
import { FileTreeContext } from "./FileTreeContext";

interface SidebarContextProps {
  sidebar: boolean;
  handleSidebar: () => void;
  handleUpdateName: (
    type: string,
    id: string,
    name: string | undefined
  ) => void;
}

export const SidebarContext = createContext<SidebarContextProps>({
  sidebar: true,
  handleSidebar: () => {},
  handleUpdateName: () => {},
});

export const SidebarContextProvider: React.FC = ({ children }) => {
  const { updateAsset } = useContext(FileTreeContext);
  const [sidebar, setSidebar] = useState<boolean>(true);

  const handleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  const handleUpdateName = (
    type: string,
    id: string,
    name: string | undefined
  ) => {
    updateAsset(type, id, {
      name: name,
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebar,
        handleSidebar,
        handleUpdateName,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
