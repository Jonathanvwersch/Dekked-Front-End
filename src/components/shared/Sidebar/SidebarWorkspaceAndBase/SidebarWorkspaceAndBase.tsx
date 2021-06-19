import React, { useCallback, useContext, useRef } from "react";
import SidebarFileTree from "../SidebarFileTree/SidebarFileTree";
import { FormattedMessage } from "react-intl";
import {
  Card,
  Scroller,
  Flex,
  Text,
  Divider,
  HoverCard,
  Spacer,
} from "../../../common";
import styled, { ThemeContext } from "styled-components";
import { useAtom } from "jotai";
import { fileTreeAtom, foldersAtom } from "../../../../store";
import { PlusIcon } from "../../../../assets";
import { FILETREE_TYPES, SIZES } from "../../../../shared";
import { useAsset } from "../../../../helpers";

interface SidebarWorkspaceProps {}

const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = () => {
  const [fileTree] = useAtom(fileTreeAtom);
  const [folders] = useAtom(foldersAtom);
  const theme = useContext(ThemeContext);
  const bottomFolderRef = useRef<HTMLDivElement>(null);

  const { addAsset } = useAsset();

  const scrollToBottom = useCallback(() => {
    if (bottomFolderRef && bottomFolderRef.current) {
      bottomFolderRef?.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottomFolderRef]);

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
              num: folders ? Object.keys(folders).length : 0,
            }}
          />
        </Text>
      </Card>
      <Scroller>
        <Flex flexDirection="column">
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
        </Flex>
      </Scroller>
      <StyledSidebarBase>
        <Divider />
        <HoverCard
          handleMouseDown={() => {
            addAsset(FILETREE_TYPES.FOLDER);
            scrollToBottom();
          }}
          padding={theme.spacers.size16}
        >
          <Flex>
            <PlusIcon size={SIZES.MEDIUM} />
            <Spacer width={theme.spacers.size8} />
            <Text fontSize={theme.typography.fontSizes.size16}>
              <FormattedMessage id="sidebar.base.addFolder" />
            </Text>
          </Flex>
        </HoverCard>
      </StyledSidebarBase>
    </>
  );
};

const StyledSidebarBase = styled.div`
  z-index: 10;
  margin-top: auto;
  width: 100%;
`;

export default React.memo(SidebarWorkspace);
