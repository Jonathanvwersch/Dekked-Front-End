import React, { useContext, useEffect, useRef, useState } from "react";
import {
  DotsMenuIcon,
  DropDownArrowIcon,
  PlusIcon,
  ROTATE,
} from "../../../../assets";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeType } from "../../../../styles/theme";
import styled, { ThemeContext } from "styled-components";
import {
  getChildType,
  positionModals,
  handleIconType,
  getStudySetTabLink,
} from "../../../../helpers";
import {
  Card,
  ColorPicker,
  Flex,
  HoverCard,
  IconActive,
  IconWrapper,
  Spacer,
  Tooltip,
} from "../../../common";
import { SidebarBlockModal, SidebarBlockName } from "..";
import { CoordsType, FILETREE_TYPES, TAB_TYPE } from "../../../../shared";
import { FileTreeContext, SidebarBlocksContext } from "../../../../contexts";

interface SidebarBlockProps {
  blockData: FolderInterface | BinderInterface | StudyPackInterface;
  type: string;
}

const SidebarBlock: React.FC<SidebarBlockProps> = ({ blockData, type }) => {
  const [blockModal, setBlockModal] = useState<boolean>(false);
  const { pathname } = useLocation();
  const theme: ThemeType = useContext(ThemeContext);
  const [coords, setCoords] = useState<CoordsType>();
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [iconColor, setIconColor] = useState<string>(blockData?.color);
  const { updateAsset } = useContext(FileTreeContext);
  const { isBlockOpen, handleOpenBlock, handleAddBlock } =
    useContext(SidebarBlocksContext);
  const paddingLeft =
    type === FILETREE_TYPES.FOLDER
      ? theme.spacers.size16
      : type === FILETREE_TYPES.BINDER
      ? theme.spacers.size24
      : type === FILETREE_TYPES.STUDY_SET
      ? theme.spacers.size48
      : null;

  // Update icon color only if new icon color is different from current icon color
  useEffect(() => {
    if (blockData && iconColor !== blockData.color && colorPicker) {
      updateAsset(type, blockData.id, { color: iconColor });
    }
  }, [iconColor, blockData, type, updateAsset, colorPicker]);

  // open and position block modal
  const handleBlockModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setBlockModal(true);
    const blockModalHeight = 128;
    setCoords(positionModals(e, blockModalHeight, menuRef));
  };

  // open block on click of dropdown arrow
  const handleExpandBlock = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    handleOpenBlock(blockData.id);
  };

  // rotate dropdown arrow on click
  const handleDropDownArrow = () => {
    return isBlockOpen ? isBlockOpen[blockData.id] : false;
  };

  // add item on click of plus icon
  const handleAddItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddBlock(blockData.id, getChildType(type as FILETREE_TYPES));
  };

  const pathName = blockData && {
    pathname:
      type === FILETREE_TYPES.FOLDER || type === FILETREE_TYPES.BINDER
        ? `/${type}/${blockData.id}`
        : `/${type}/${blockData.id}/${getStudySetTabLink(blockData.id)}`,
  };

  const navLinkStyle = { width: "100%" };
  const navLinkActiveStyle = {
    filter: `${theme.colors.active.filter}`,
    fontWeight: theme.typography.fontWeights.bold as "bold",
  };

  return (
    <>
      {blockData ? (
        <NavLink
          to={pathName}
          isActive={() => {
            if (
              pathname === `/${type}/${blockData.id}/${TAB_TYPE.FLASHCARDS}` ||
              pathname === `/${type}/${blockData.id}/${TAB_TYPE.NOTES}` ||
              pathname === `/${type}/${blockData.id}`
            )
              return true;
            return false;
          }}
          style={navLinkStyle}
          activeStyle={navLinkActiveStyle}
        >
          <StyledBlock padding={`0 ${theme.spacers.size12} 0 ${paddingLeft}`}>
            <Flex>
              {type === FILETREE_TYPES.FOLDER ||
              type === FILETREE_TYPES.BINDER ? (
                <IconActive handleClick={(e) => handleExpandBlock(e)}>
                  <DropDownArrowIcon
                    rotate={handleDropDownArrow() ? ROTATE.NINETY : ROTATE.ZERO}
                  />
                </IconActive>
              ) : null}
              <Spacer width={theme.spacers.size8} />
              <IconWrapper>{handleIconType(type, iconColor)}</IconWrapper>
              <Spacer width={theme.spacers.size8} />
              <SidebarBlockName
                blockId={blockData.id}
                blockName={blockData.name}
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
            id={blockData.id}
          />

          <ColorPicker
            isOpen={colorPicker}
            handleClose={() => setColorPicker(false)}
            coords={coords}
            colorPickerRef={colorPickerRef}
            iconColor={iconColor}
            setIconColor={setIconColor}
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

const StyledBlock = styled(HoverCard)`
  display: flex;
  align-items: center;
  min-height: ${({ theme }) => theme.spacers.size32};
  &:hover {
    ${HiddenIconsContainer} {
      opacity: 1;
      visibility: visible;
      display: flex;
    }
  }
`;

export default React.memo(SidebarBlock);
