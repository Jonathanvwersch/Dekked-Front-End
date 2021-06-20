import React, { useCallback, useContext, useRef, useState } from "react";
import {
  DotsMenuIcon,
  DropDownArrowIcon,
  PlusIcon,
  ROTATE,
} from "../../../../assets";
import { NavLink } from "react-router-dom";
import { ThemeType } from "../../../../styles/theme";
import styled, { ThemeContext } from "styled-components";

import {
  positionModals,
  handleIconType,
  useAsset,
  getChildType,
  differenceInObjects,
} from "../../../../helpers";
import {
  ColorPicker,
  Flex,
  IconActive,
  IconWrapper,
  Spacer,
  Tooltip,
} from "../../../common";
import { SidebarBlockModal, SidebarBlockName } from "..";
import { CoordsType, FILETREE_TYPES, TAB_TYPE } from "../../../../shared";
import { isBlockOpenAtom } from "../../../../store";
import { useAtom } from "jotai";
import { isEmpty } from "lodash";

interface SidebarBlockProps {
  blockData: FolderInterface | BinderInterface | StudyPackInterface;
  type: string;
}

const SidebarBlock: React.FC<SidebarBlockProps> = ({ blockData, type }) => {
  const [blockModal, setBlockModal] = useState<boolean>(false);
  const theme: ThemeType = useContext(ThemeContext);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState<CoordsType>();
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  const [isBlockOpen] = useAtom(isBlockOpenAtom);
  const { openAsset, addAsset } = useAsset();

  const paddingLeft =
    type === FILETREE_TYPES.FOLDER
      ? theme.spacers.size16
      : type === FILETREE_TYPES.BINDER
      ? theme.spacers.size24
      : type === FILETREE_TYPES.STUDY_SET
      ? theme.spacers.size48
      : null;

  // open and position block modal
  const handleBlockModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      setBlockModal(true);
      const blockModalHeight = 128;
      setCoords(positionModals(e, blockModalHeight, menuRef));
    },
    []
  );

  // open block on click of dropdown arrow
  const handleExpandBlock = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    openAsset(blockData.id);
  };

  // add item on click of plus icon
  const handleAddItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    addAsset(getChildType(type as FILETREE_TYPES), blockData.id);
  };

  const pathName = blockData && {
    pathname:
      type === FILETREE_TYPES.FOLDER || type === FILETREE_TYPES.BINDER
        ? `/${type}/${blockData.id}`
        : `/${type}/${blockData.id}/${TAB_TYPE.NOTES}`,
  };

  const navLinkStyle = { width: "100%" };
  const navLinkActiveStyle = {
    filter: `${theme.colors.active.filter}`,
    fontWeight: theme.typography.fontWeights.bold as "bold",
  };

  console.log("block");

  return (
    <>
      {blockData ? (
        <NavLink
          to={pathName}
          style={navLinkStyle}
          activeStyle={navLinkActiveStyle}
        >
          <StyledBlock paddingLeft={paddingLeft}>
            <Flex>
              {type === FILETREE_TYPES.FOLDER ||
              type === FILETREE_TYPES.BINDER ? (
                <IconActive handleClick={(e) => handleExpandBlock(e)}>
                  <DropDownArrowIcon
                    rotate={
                      isBlockOpen?.[blockData?.id] ? ROTATE.NINETY : ROTATE.ZERO
                    }
                  />
                </IconActive>
              ) : null}
              <Spacer width={theme.spacers.size8} />
              <IconWrapper>
                {handleIconType(type, blockData?.color)}
              </IconWrapper>
              <Spacer width={theme.spacers.size8} />
              <SidebarBlockName
                blockId={blockData?.id}
                blockName={blockData?.name}
              />
              <Spacer width={theme.spacers.size4} />
              <HiddenIconsContainer>
                <IconActive
                  iconActiveRef={menuRef}
                  handleClick={(e) => handleBlockModal(e)}
                >
                  <Tooltip id="Menu" text="tooltips.sidebar.menu">
                    <DotsMenuIcon rotate={ROTATE.NINETY} />
                  </Tooltip>
                </IconActive>
                {type !== FILETREE_TYPES.STUDY_SET ? (
                  <IconActive
                    handleClick={(
                      e: React.MouseEvent<HTMLDivElement, MouseEvent>
                    ) => handleAddItem(e)}
                  >
                    <Tooltip id="AddItem" text="tooltips.sidebar.addItem">
                      <PlusIcon />
                    </Tooltip>
                  </IconActive>
                ) : null}
              </HiddenIconsContainer>
            </Flex>
          </StyledBlock>

          <SidebarBlockModal
            isOpen={blockModal}
            handleClose={() => setBlockModal(false)}
            coords={coords}
            handleColorPicker={() => setColorPicker(true)}
            type={type}
            id={blockData?.id}
          />

          <ColorPicker
            isOpen={colorPicker}
            handleClose={() => setColorPicker(false)}
            coords={coords}
            iconColor={blockData?.color}
            type={type}
            id={blockData?.id}
          />
        </NavLink>
      ) : null}
    </>
  );
};

const HiddenIconsContainer = styled.div`
  visibility: hidden;
  display: flex;
  opacity: 0;
  display: none;
`;

const StyledBlock = styled.div<{
  paddingLeft?: string | null;
}>`
  display: flex;
  align-items: center;
  padding: ${({ theme, paddingLeft }) =>
    `0 ${theme.spacers.size12} 0 ${paddingLeft}`};
  min-height: ${({ theme }) => theme.spacers.size32};
  background-color: ${({ theme }) => theme.colors.secondary};
  &:active {
    background-color: transparent;
  }
  &:focus,
  &:hover {
    filter: ${({ theme }) => theme.colors.hover.filter};
    ${HiddenIconsContainer} {
      opacity: 1;
      visibility: visible;
      display: flex;
    }
  }
`;

export default React.memo(SidebarBlock, (prevProps, newProps) => {
  return isEmpty(differenceInObjects(newProps, prevProps));
});

// if (
//   (slugType === FILETREE_TYPES.STUDY_SET &&
//     studyPacks &&
//     studyPacks?.[id]?.binder_id === blockData?.id) ||
//   (studyPacks &&
//     binders?.[studyPacks?.[id]?.binder_id]?.folder_id === blockData?.id)
// ) {
//   isParentOfActiveBlock = true;
// } else if (
//   slugType === FILETREE_TYPES.BINDER &&
//   binders?.[id]?.folder_id === blockData?.id
// ) {
//   isParentOfActiveBlock = true;
// }
