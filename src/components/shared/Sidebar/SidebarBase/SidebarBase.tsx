import React, { useCallback, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Flex, Text, Divider, HoverCard, Spacer } from "../../../common";
import styled, { ThemeContext } from "styled-components";

import { PlusIcon } from "../../../../assets";
import { FILETREE_TYPES, SIZES } from "../../../../shared";
import { useAsset } from "../../../../helpers";
import { isAppLoadingAtom } from "../../../../store";
import { useAtom } from "jotai";

interface SidebarBaseProps {
  bottomFolderRef: React.RefObject<HTMLDivElement>;
}

const SidebarBase: React.FC<SidebarBaseProps> = ({ bottomFolderRef }) => {
  const theme = useContext(ThemeContext);
  const { addAsset } = useAsset();
  const [isLoading] = useAtom(isAppLoadingAtom);
  console.log("base");

  const scrollToBottom = useCallback(() => {
    if (bottomFolderRef && bottomFolderRef.current) {
      bottomFolderRef?.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottomFolderRef]);

  return (
    <StyledSidebarBase>
      {!isLoading ? (
        <>
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
        </>
      ) : null}
    </StyledSidebarBase>
  );
};

const StyledSidebarBase = styled.div`
  z-index: 10;
  margin-top: auto;
  width: 100%;
`;

export default React.memo(SidebarBase);
