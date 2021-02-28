import React, { useContext } from "react";
import { useTheme } from "react-jss";
import { FileTreeContext } from "../../../contexts/FileTreeContext";
import { ThemeType } from "../../../theme";
import { HFlex, VFlex, Text } from "../../common";
import SidebarFileTree from "./SidebarFileTree";

interface SidebarWorkspaceProps {}

const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = () => {
  const theme: ThemeType = useTheme();
  const { fileTree } = useContext(FileTreeContext);

  return (
    <VFlex overflow="hidden auto" className="sidebarWorkspace">
      <HFlex padding="8px 16px" className="headingContainer">
        <Text fontColor={theme.colors.grey1} className="heading">
          Workspace
        </Text>
      </HFlex>
      <VFlex overflow="hidden auto" className="block">
        {fileTree
          ? Object.entries(fileTree).map((file) => {
              return (
                <SidebarFileTree
                  key={file[0]}
                  file={Object.fromEntries([file])}
                />
              );
            })
          : null}
      </VFlex>
    </VFlex>
  );
};

export default SidebarWorkspace;
