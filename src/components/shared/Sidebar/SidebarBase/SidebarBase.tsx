import React, { useCallback, useContext } from "react";
import { FormattedMessage } from "react-intl";
import styled, { ThemeContext } from "styled-components";

import { FILETREE_TYPES, SIZES } from "../../../../shared";
import { useAddAsset } from "../../../../helpers";
import { isAppLoadingAtom } from "../../../../store";
import { useAtom } from "jotai";
import {
  Divider,
  Flex,
  HoverCard,
  PlusIcon,
  Spacer,
  Text,
} from "dekked-design-system";

interface SidebarBaseProps {
  bottomFolderRef: React.RefObject<HTMLDivElement>;
}

const SidebarBase: React.FC<SidebarBaseProps> = ({ bottomFolderRef }) => {
  const theme = useContext(ThemeContext);
  const { addAsset } = useAddAsset();
  const [isLoading] = useAtom(isAppLoadingAtom);
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
