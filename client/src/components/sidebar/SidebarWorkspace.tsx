import React, { useContext } from "react";
import { useTheme } from "react-jss";
import { FileTreeContext } from "../../contexts/FileTreeContext";
import { ThemeType } from "../../theme";
import {
  HorizontalFlexContainer,
  VerticalFlexContainer,
  Text,
} from "../common";
import SidebarFileTree from "./SidebarFileTree";

interface SidebarWorkspaceProps {}

const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = () => {
  const theme: ThemeType = useTheme();
  const fileTreeContext = useContext(FileTreeContext);
  console.log(fileTreeContext);

  return (
    <VerticalFlexContainer overflow="hidden auto">
      <HorizontalFlexContainer padding="8px 16px">
        <Text fontColor={theme.colors.grey1}>Workspace</Text>
      </HorizontalFlexContainer>
      <VerticalFlexContainer overflow="hidden auto">
        {fileTreeContext.fileTree
          ? Object.entries(fileTreeContext.fileTree).map((file) => {
              // .fromEntries is necessary to give the file data type, the global FileInterface type
              return (
                <SidebarFileTree
                  key={file[0]}
                  file={Object.fromEntries([file])}
                />
              );
            })
          : null}
      </VerticalFlexContainer>
    </VerticalFlexContainer>
  );
};

export default SidebarWorkspace;
