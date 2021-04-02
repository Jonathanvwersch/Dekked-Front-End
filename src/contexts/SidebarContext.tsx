import { createContext, useState } from "react";

interface SidebarContextProps {
  sidebar: boolean;
  handleSidebar: () => void;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextProps>(
  {} as SidebarContextProps
);

export const SidebarContextProvider: React.FC = ({ children }) => {
  const [sidebar, setSidebar] = useState<boolean>(true);

  const handleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

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
