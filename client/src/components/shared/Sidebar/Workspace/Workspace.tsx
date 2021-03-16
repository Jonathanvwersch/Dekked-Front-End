import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { FileTreeContext } from "../../../../contexts/FileTreeContext";
import { ThemeType } from "../../../../styles/theme";
import { VFlex, Text, Card, Scroller } from "../../../common";
import SidebarFileTree from "../FileTree/FileTree";

interface WorkspaceProps {}

const Workspace: React.FC<WorkspaceProps> = () => {
  const theme: ThemeType = useContext(ThemeContext);
  const { fileTree } = useContext(FileTreeContext);

  return (
    <Scroller>
      <VFlex>
        <Card padding="8px 16px">
          <Text fontColor={theme.colors.grey1}>Workspace</Text>
        </Card>
        <VFlex>
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

export default Workspace;
