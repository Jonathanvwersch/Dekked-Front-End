import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { FileTreeContext } from "../../../../contexts";
import { ThemeType } from "../../../../styles/theme";
import { VFlex, Text, Card, Scroller } from "../../../common";
import SidebarFileTree from "../SidebarFileTree/SidebarFileTree";

interface SidebarWorkspaceProps {
  bottomFolderRef: React.RefObject<HTMLDivElement>;
}

const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = ({
  bottomFolderRef,
}) => {
  const theme: ThemeType = useContext(ThemeContext);
  const { fileTree } = useContext(FileTreeContext);

  return (
    <>
      <Card padding={`${theme.spacers.size8} ${theme.spacers.size16}`}>
        <Text fontColor={theme.colors.grey1}>Workspace</Text>
      </Card>
      <Scroller>
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
          <div ref={bottomFolderRef} />
        </VFlex>
      </Scroller>
    </>
  );
};

export default SidebarWorkspace;
