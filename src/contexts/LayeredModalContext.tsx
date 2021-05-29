import { createContext, useState } from "react";
import React from "react";

export interface LayeredModalContextProps {
  isLayeredModalOpen: boolean;
  setIsLayeredModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayeredModalContext = createContext<LayeredModalContextProps>(
  {} as LayeredModalContextProps
);

export const LayeredModalContextProvider: React.FC = ({ children }) => {
  const [isLayeredModalOpen, setIsLayeredModalOpen] = useState<boolean>(false);

  return (
    <LayeredModalContext.Provider
      value={{
        isLayeredModalOpen,
        setIsLayeredModalOpen,
      }}
    >
      {children}
    </LayeredModalContext.Provider>
  );
};
