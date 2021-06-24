import React, { useEffect } from "react";
import SidebarFileTree from "../SidebarFileTree/SidebarFileTree";
import { Scroller, Flex } from "../../../common";
import { useAtom } from "jotai";
import Skeleton from "react-loading-skeleton";
import { fileTreeAtom, isAppLoadingAtom } from "../../../../store";
import styled from "styled-components";
import { useAsset } from "../../../../helpers";
import { FILETREE_TYPES } from "../../../../shared";
import { useHistory } from "react-router-dom";

interface SidebarWorkspaceProps {
  bottomFolderRef: React.RefObject<HTMLDivElement>;
}

const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = ({
  bottomFolderRef,
}) => {
  const [fileTree] = useAtom(fileTreeAtom);
  const { addAsset, assetId } = useAsset();
  const [isAppLoading] = useAtom(isAppLoadingAtom);
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(fileTree || {})?.length === 0 && !isAppLoading) {
      addAsset(FILETREE_TYPES.FOLDER);
      history.push(`/${FILETREE_TYPES.FOLDER}/${assetId}`);
    }
  }, [fileTree, history, addAsset, assetId, isAppLoading]);

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
