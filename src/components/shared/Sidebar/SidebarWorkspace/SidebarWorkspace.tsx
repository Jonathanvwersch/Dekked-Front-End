import React, { useContext } from "react";
import { FileTreeContext } from "../../../../contexts";
import SidebarFileTree from "../SidebarFileTree/SidebarFileTree";
import { FormattedMessage } from "react-intl";
import { Card, Scroller, VFlex, Text } from "../../../common";
import { ThemeContext } from "styled-components/macro";

interface SidebarWorkspaceProps {
  bottomFolderRef: React.RefObject<HTMLDivElement>;
  numOfFolders: number;
}

const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = ({
  bottomFolderRef,
  numOfFolders,
}) => {
  const { fileTree } = useContext(FileTreeContext);
  const theme = useContext(ThemeContext);

  return (
    <>
      <Card padding={`${theme.spacers.size8} ${theme.spacers.size16}`}>
        <Text
          fontSize={theme.typography.fontSizes.size14}
          fontColor={theme.colors.grey1}
        >
          <FormattedMessage
            id="sidebar.workspace.header"
            values={{
              num: numOfFolders,
            }}
          />
        </Text>
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

export default React.memo(SidebarWorkspace);
