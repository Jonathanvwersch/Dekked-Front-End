import React, { useContext } from "react";
import { FileTreeContext, SelectedItemContext } from "../../../../contexts";
import { formatMessage } from "../../../../intl";
import SidebarFileTree from "../SidebarFileTree/SidebarFileTree";
import SidebarScroller from "../SidebarScroller/SidebarScroller";
import { useIntl } from "react-intl";

interface SidebarWorkspaceProps {
  bottomFolderRef: React.RefObject<HTMLDivElement>;
}

const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = ({
  bottomFolderRef,
}) => {
  const { fileTree } = useContext(FileTreeContext);
  const { numOfFolders } = useContext(SelectedItemContext);
  const intl = useIntl();

  return (
    <SidebarScroller
      heading={formatMessage("sidebar.workspace.header", intl, {
        num: numOfFolders,
      })}
    >
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
