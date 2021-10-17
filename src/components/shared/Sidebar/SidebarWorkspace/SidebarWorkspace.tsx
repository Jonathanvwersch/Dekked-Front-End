import React from "react";
import SidebarFileTree from "../SidebarFileTree/SidebarFileTree";
import { Scroller, Flex } from "dekked-design-system";
import { useAtom } from "jotai";
import Skeleton from "react-loading-skeleton";
import { fileTreeAtom, isAppLoadingAtom } from "../../../../store";
import styled from "styled-components";

interface SidebarWorkspaceProps {
  bottomFolderRef: React.RefObject<HTMLDivElement>;
}

const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = ({
  bottomFolderRef,
}) => {
  const [fileTree] = useAtom(fileTreeAtom);
  const [isLoading] = useAtom(isAppLoadingAtom);

  return (
    <Scroller>
      <Flex flexDirection="column" justifyContent="center">
        {!isLoading && fileTree ? (
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

export default SidebarWorkspace;
