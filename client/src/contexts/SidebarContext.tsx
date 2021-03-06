import { createContext, useState } from "react";

interface SidebarContextProps {
  sidebar: boolean;
  handleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextProps>({
  sidebar: true,
  handleSidebar: () => {},
});

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
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
