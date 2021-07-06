import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
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
  useAddAsset,
  getChildType,
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
import {
  selectBlockOpenStateItem,
  selectStudySetTab,
  updateBlockOpenStateAtom,
} from "../../../../store";
import { useAtom } from "jotai";

interface SidebarBlockProps {
  blockId: string;
  blockName: string;
  blockColor: string;
  blockType: string;
  fileTreeId: string;
  blockFolderId?: string | undefined;
}

const SidebarBlock: React.FC<SidebarBlockProps> = ({
  blockColor,
  blockFolderId,
  blockId,
  blockName,
  blockType,
  fileTreeId,
}) => {
  const [blockModal, setBlockModal] = useState<boolean>(false);
  const theme: ThemeType = useContext(ThemeContext);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState<CoordsType>();
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  const [iconColor, setIconColor] = useState<string>(blockColor);
  const { addAsset } = useAddAsset();
  const [studySetTab] = useAtom(
    useMemo(() => selectStudySetTab(blockId), [blockId])
  );

  const [isBlockOpen] = useAtom(
    useMemo(
      () => selectBlockOpenStateItem(fileTreeId, blockId),
      [blockId, fileTreeId]
    )
  );

  const [, setIsBlockOpen] = useAtom(updateBlockOpenStateAtom);

  const paddingLeft =
    blockType === FILETREE_TYPES.FOLDER
      ? theme.spacers.size16
      : blockType === FILETREE_TYPES.BINDER
      ? theme.spacers.size24
      : blockType === FILETREE_TYPES.STUDY_SET
      ? theme.spacers.size48
      : null;

  const handleCloseBlockModal = useCallback(() => setBlockModal(false), []);
  const handleOpenColorPicker = useCallback(() => setColorPicker(true), []);
  const handleCloseColorPicker = useCallback(() => setColorPicker(false), []);

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
    setIsBlockOpen({ fileTreeId, id: blockId });
  };

  // add item on click of plus icon
  const handleAddItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    addAsset(
      getChildType(blockType as FILETREE_TYPES),
      blockType === FILETREE_TYPES.BINDER ? blockFolderId : blockId,
      blockType === FILETREE_TYPES.BINDER ? blockId : undefined
    );
  };

  const pathName = {
    pathname:
      blockType === FILETREE_TYPES.FOLDER || blockType === FILETREE_TYPES.BINDER
        ? `/${blockType}/${blockId}`
        : `/${blockType}/${blockId}/${studySetTab || TAB_TYPE.NOTES}`,
  };

  const navLinkStyle = { width: "100%" };
  const navLinkActiveStyle = {
    filter: `${theme.colors.active.filter}`,
    fontWeight: theme.typography.fontWeights.bold as "bold",
  };

  return (
    <>
      <NavLink
        to={pathName}
        style={navLinkStyle}
        activeStyle={navLinkActiveStyle}
      >
        <StyledBlock paddingLeft={paddingLeft}>
          <Flex>
            {blockType === FILETREE_TYPES.FOLDER ||
            blockType === FILETREE_TYPES.BINDER ? (
              <IconActive handleClick={(e) => handleExpandBlock(e)}>
                <DropDownArrowIcon
                  rotate={isBlockOpen ? ROTATE.NINETY : ROTATE.ZERO}
                />
              </IconActive>
            ) : null}
            <Spacer width={theme.spacers.size8} />
            <IconWrapper>{handleIconType(blockType, iconColor)}</IconWrapper>
            <Spacer width={theme.spacers.size8} />
            <SidebarBlockName blockId={blockId} blockName={blockName} />
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
              {blockType !== FILETREE_TYPES.STUDY_SET ? (
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
          handleClose={handleCloseBlockModal}
          coords={coords}
          handleColorPicker={handleOpenColorPicker}
          type={blockType}
          id={blockId}
          folderId={blockFolderId}
        />

        <ColorPicker
          isOpen={colorPicker}
          handleClose={handleCloseColorPicker}
          coords={coords}
          iconColor={iconColor}
          setIconColor={setIconColor}
          type={blockType}
          id={blockId}
        />
      </NavLink>
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

export default React.memo(SidebarBlock);

// if (
//   (slugType === FILETREE_TYPES.STUDY_SET &&
//     studySets &&
//     studySets?.[id]?.binder_id === blockId) ||
//   (studySets &&
//     binders?.[studySets?.[id]?.binder_id]?.folder_id === blockId)
// ) {
//   isParentOfActiveBlock = true;
// } else if (
//   slugType === FILETREE_TYPES.BINDER &&
//   binders?.[id]?.folder_id === blockId
// ) {
//   isParentOfActiveBlock = true;
// }
