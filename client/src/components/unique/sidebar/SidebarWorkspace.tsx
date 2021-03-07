import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { FileTreeContext } from "../../../contexts/FileTreeContext";
import { ThemeType } from "../../../styles/theme";
import { HFlex, VFlex, Text } from "../../common";
import Scroller from "../../common/Scroller/Scroller";
import SidebarFileTree from "./SidebarFileTree";

interface SidebarWorkspaceProps {}

const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = () => {
  const theme: ThemeType = useContext(ThemeContext);
  const { fileTree } = useContext(FileTreeContext);

  return (
    <Scroller>
      <VFlex padding="0px">
        <HFlex padding="8px 16px">
          <Text fontColor={theme.colors.grey1}>Workspace</Text>
        </HFlex>
        <VFlex padding="0px">
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
    </Scroller>
  );
};

export default SidebarWorkspace;
