import React, { useContext, useEffect, useRef, useState } from "react";
import {
  DotsMenuIcon,
  DropDownArrowIcon,
  PlusIcon,
  ROTATE,
} from "../../../../assets";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeType } from "../../../../styles/theme";
import styled, { ThemeContext } from "styled-components/macro";
import {
  getChildType,
  positionModals,
  handleIconType,
} from "../../../../helpers";
import {
  Card,
  ColorPicker,
  HFlex,
  HoverCard,
  IconActive,
  IconWrapper,
  Spacer,
  Tooltip,
} from "../../../common";
import { SidebarBlockModal, SidebarBlockName } from "..";
import { CoordsType, FILETREE_TYPES } from "../../../../shared";
import { FileTreeContext, SidebarContext } from "../../../../contexts";

interface SidebarBlockProps {
  blockData: FolderInterface | BinderInterface | StudyPackInterface;
  type: string;
}

const SidebarBlock: React.FC<SidebarBlockProps> = ({ blockData, type }) => {
  const [blockModal, setBlockModal] = useState<boolean>(false);
  const { pathname } = useLocation();
  const theme: ThemeType = useContext(ThemeContext);
  const [coords, setCoords] = useState<CoordsType>();
  const editableTextRef = useRef<HTMLDivElement>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [iconColor, setIconColor] = useState<string>(blockData?.color);
  const { updateAsset } = useContext(FileTreeContext);
  const { isBlockOpen, handleOpenBlock, studySetTabLink, handleAddBlock } =
    useContext(SidebarContext);
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
        : `/${type}/${blockData.id}/${studySetTabLink(blockData.id)}`,
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
              pathname ===
                `/${type}/${blockData.id}/${studySetTabLink(blockData.id)}` ||
              pathname === `/${type}/${blockData.id}`
            )
              return true;
            return false;
          }}
          style={navLinkStyle}
          activeStyle={navLinkActiveStyle}
        >
          <HoverCard>
            <StyledBlock>
              <Card
                padding={`${theme.spacers.size8} ${theme.spacers.size12} ${theme.spacers.size8} ${paddingLeft}`}
              >
                <HFlex>
                  {type === FILETREE_TYPES.FOLDER ||
                  type === FILETREE_TYPES.BINDER ? (
                    <IconActive handleClick={(e) => handleExpandBlock(e)}>
                      <DropDownArrowIcon
                        rotate={
                          handleDropDownArrow() ? ROTATE.NINETY : ROTATE.ZERO
                        }
                      />
                    </IconActive>
                  ) : null}
                  <Spacer width={theme.spacers.size8} />
                  <IconWrapper>{handleIconType(type, iconColor)}</IconWrapper>
                  <Spacer width={theme.spacers.size8} />
                  <SidebarBlockName
                    isEditable={isEditable}
                    setIsEditable={setIsEditable}
                    editableTextRef={editableTextRef}
                    blockId={blockData.id}
                    blockType={type}
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
                        <Tooltip
                          id="AddItem"
                          text={
                            type === FILETREE_TYPES.FOLDER
                              ? "tooltips.sidebar.addBinder"
                              : "tooltips.sidebar.addStudySet"
                          }
                        >
                          <PlusIcon />
                        </Tooltip>
                      </IconActive>
                    ) : null}
                  </HiddenIconsContainer>
                </HFlex>
              </Card>
            </StyledBlock>
          </HoverCard>
          <SidebarBlockModal
            isOpen={blockModal}
            handleClose={() => setBlockModal(false)}
            coords={coords}
            handleBlockModal={() => setBlockModal(false)}
            handleColorPicker={() => setColorPicker(true)}
            type={type}
            id={blockData.id}
            handleEditableText={() => setIsEditable(true)}
            editableTextRef={editableTextRef}
            iconColor={iconColor}
          />
          {colorPicker ? (
            <ColorPicker
              isOpen={colorPicker}
              handleClose={() => setColorPicker(false)}
              coords={coords}
              colorPickerRef={colorPickerRef}
              iconColor={iconColor}
              setIconColor={setIconColor}
            />
          ) : null}
        </NavLink>
      ) : null}
    </>
  );
};

const HiddenIconsContainer = styled.div`
  visibility: hidden;
  opacity: 0;
  display: none;
`;

const StyledBlock = styled.div`
  &:hover {
    ${HiddenIconsContainer} {
      opacity: 1;
      visibility: visible;
      display: flex;
    }
  }
`;

export default React.memo(SidebarBlock);
