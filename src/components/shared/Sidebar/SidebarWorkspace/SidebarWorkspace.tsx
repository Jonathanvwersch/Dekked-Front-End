import React from "react";
import SidebarFileTree from "../SidebarFileTree/SidebarFileTree";
import { Scroller, Flex } from "../../../common";
import { useAtom } from "jotai";
import Skeleton from "react-loading-skeleton";
import { fileTreeAtom } from "../../../../store";
import styled from "styled-components";

interface SidebarWorkspaceProps {
  bottomFolderRef: React.RefObject<HTMLDivElement>;
}

const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = ({
  bottomFolderRef,
}) => {
  const [fileTree] = useAtom(fileTreeAtom);

  console.log("workspace");

  return (
    <Scroller>
      <Flex flexDirection="column" justifyContent="center">
        {fileTree ? (
          Object.entries(fileTree).map((file) => (
            <SidebarFileTree key={file[0]} file={Object.fromEntries([file])} />
          ))
        ) : (
          <div style={{ width: "100%" }}>
            <StyledSkeleton
              count={10}
              width="90%"
              height="32px"
              wrapper={StyledFlex}
            />
          </div>
        )}
        <div ref={bottomFolderRef} />
      </Flex>
    </Scroller>
  );
};

const StyledSkeleton = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.spacers.size8};
`;

const StyledFlex = styled(Flex)`
  justify-content: center;
`;

export default React.memo(SidebarWorkspace);
