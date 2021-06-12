import { createContext, useCallback } from "react";
import { useStorageState } from "../hooks";

interface SidebarContextProps {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  handleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextProps>(
  {} as SidebarContextProps
);

export const SidebarContextProvider: React.FC = ({ children }) => {
  // handle opening and closing of sidebar
  const { value: sidebar, setValue: setSidebar } = useStorageState<boolean>(
    true,
    "sidebar-state"
  );
  const handleSidebar = useCallback(() => {
    setSidebar(!sidebar);
  }, [sidebar, setSidebar]);

  return (
    <SidebarContext.Provider
      value={{
        sidebar,
        handleSidebar,
        setSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
