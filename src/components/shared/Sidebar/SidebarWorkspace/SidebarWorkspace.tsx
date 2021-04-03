import React, { useContext } from "react";
import { FileTreeContext } from "../../../../contexts";
import SidebarFileTree from "../SidebarFileTree/SidebarFileTree";
import SidebarScroller from "../SidebarScroller/SidebarScroller";

interface SidebarWorkspaceProps {
  bottomFolderRef: React.RefObject<HTMLDivElement>;
}

const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = ({
  bottomFolderRef,
}) => {
  const { fileTree } = useContext(FileTreeContext);

  return (
    <SidebarScroller heading="Home">
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
    </SidebarScroller>
  );
};

export default SidebarWorkspace;
