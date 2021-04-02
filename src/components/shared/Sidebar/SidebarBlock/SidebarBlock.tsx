import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BinderIcon,
  DotsMenuIcon,
  DropDownArrowIcon,
  FolderIcon,
  StudySetIcon,
} from "../../../../assets";

import { NavLink, useLocation } from "react-router-dom";

import { ThemeType } from "../../../../styles/theme";
import SidebarEditableText from "../SidebarBlockName/SidebarBlockName";
import styled, { ThemeContext } from "styled-components";
import { positionModals } from "../../../../helpers";
import { CoordsProps } from "../../../../helpers/positionModals";
import {
  Card,
  ColorPicker,
  HFlex,
  HoverCard,
  IconActive,
  IconWrapper,
  Spacer,
} from "../../../common";
import { SidebarBlockModal } from "..";
import { FILETREE_TYPES, TAB_TYPE } from "../../../../shared";
import { FileTreeContext } from "../../../../contexts";
import { ROTATE } from "../../../../assets/icons/Icon.types";

interface SidebarBlockProps {
  blockData: FolderInterface | BinderInterface | StudyPackInterface;
  type: string;
  setFolderOpen?: Dispatch<SetStateAction<boolean | undefined>>;
  handleOpenBinder?: (id: string, isOpen?: boolean) => void;
}

export const handleIconType = (type: string, iconColor: string) => {
  if (type === FILETREE_TYPES.FOLDER) return <FolderIcon color={iconColor} />;
  else if (type === FILETREE_TYPES.BINDER)
    return <BinderIcon color={iconColor} />;
  else return <StudySetIcon color={iconColor} />;
};

const SidebarBlock: React.FC<SidebarBlockProps> = ({
  blockData,
  type,
  setFolderOpen,
  handleOpenBinder,
}) => {
  const [blockModal, setBlockModal] = useState<boolean>(false);
  const { pathname } = useLocation();
  const theme: ThemeType = useContext(ThemeContext);
  const [coords, setCoords] = useState<CoordsProps>();
  const editableTextRef = useRef<HTMLDivElement>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [iconColor, setIconColor] = useState<string>(blockData?.color);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { updateAsset } = useContext(FileTreeContext);

  // Update icon color only if new icon color is different from current icon color
  useEffect(() => {
    if (blockData && iconColor !== blockData.color && colorPickerRef)
      updateAsset(type, blockData.id, { color: iconColor });
  }, [iconColor, blockData, colorPickerRef, type, updateAsset]);

  const paddingLeft =
    type === FILETREE_TYPES.FOLDER
      ? theme.spacers.size16
      : type === FILETREE_TYPES.BINDER
      ? theme.spacers.size24
      : type === FILETREE_TYPES.STUDY_SET
      ? theme.spacers.size48
      : null;

  const handleBlockModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setBlockModal(true);
    // I hate having to hard code the height of the modal but I'm not sure how to get the height of a component before it has been rendered
    const blockModalHeight = 128;
    setCoords(positionModals(e, blockModalHeight));
  };

  const handleExpandBlock = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded((prevState) => !prevState);
    if (type === FILETREE_TYPES.FOLDER)
      setFolderOpen && setFolderOpen((prevState) => !prevState);
    else if (type === FILETREE_TYPES.BINDER)
      handleOpenBinder && handleOpenBinder(blockData.id);
  };

  const handleOpenBlock = () => {
    setIsExpanded(true);
    if (type === FILETREE_TYPES.FOLDER) setFolderOpen && setFolderOpen(true);
    else if (type === FILETREE_TYPES.BINDER)
      handleOpenBinder && handleOpenBinder(blockData.id, true);
  };

  return (
    <>
      {blockData ? (
        <NavLink
          to={{
            pathname:
              type === FILETREE_TYPES.FOLDER || type === FILETREE_TYPES.BINDER
                ? `/${type}/${blockData.id}`
                : `/${type}/${blockData.id}/${TAB_TYPE.NOTES}`,
          }}
          isActive={() => {
            if (
              pathname === `/${type}/${blockData.id}/${TAB_TYPE.FLASHCARDS}` ||
              pathname === `/${type}/${blockData.id}/${TAB_TYPE.NOTES}` ||
              pathname === `/${type}/${blockData.id}`
            )
              return true;
            return false;
          }}
          style={{ width: "100%" }}
          activeStyle={{
            filter: `${theme.colors.active.filter}`,
            fontWeight: theme.typography.fontWeights.bold as "bold",
          }}
        >
          <HoverCard>
            <StyledBlock>
              <Card
                padding={`${theme.spacers.size8} ${theme.spacers.size12} ${theme.spacers.size8} ${paddingLeft}`}
              >
                <HFlex>
                  {type === FILETREE_TYPES.FOLDER ||
                  type === FILETREE_TYPES.BINDER ? (
                    <IconActive
                      handleClick={(
                        e: React.MouseEvent<HTMLDivElement, MouseEvent>
                      ) => handleExpandBlock(e)}
                    >
                      <DropDownArrowIcon
                        rotate={isExpanded ? ROTATE.NINETY : ROTATE.ZERO}
                      />
                    </IconActive>
                  ) : null}
                  <Spacer width={theme.spacers.size8} />
                  <IconWrapper>{handleIconType(type, iconColor)}</IconWrapper>
                  <Spacer width={theme.spacers.size8} />
                  <SidebarEditableText
                    isEditable={isEditable}
                    setIsEditable={setIsEditable}
                    editableTextRef={editableTextRef}
                    blockId={blockData.id}
                    blockType={type}
                    blockName={blockData.name}
                  />
                  <Spacer width={theme.spacers.size4} />
                  <DotsMenuIconContainer>
                    <IconActive
                      handleClick={(
                        e: React.MouseEvent<HTMLDivElement, MouseEvent>
                      ) => handleBlockModal(e)}
                    >
                      <DotsMenuIcon />
                    </IconActive>
                  </DotsMenuIconContainer>
                </HFlex>
              </Card>
            </StyledBlock>
          </HoverCard>
          {coords && (
            <SidebarBlockModal
              state={blockModal}
              handleState={() => setBlockModal(false)}
              coords={coords}
              handleBlockModal={() => setBlockModal(false)}
              handleColorPicker={() => setColorPicker(true)}
              type={type}
              id={blockData.id}
              handleOpenBlock={handleOpenBlock}
              handleEditableText={() => setIsEditable(true)}
              editableTextRef={editableTextRef}
              iconColor={iconColor}
            />
          )}
          {coords && (
            <ColorPicker
              id={blockData.id}
              type={type as FILETREE_TYPES}
              state={colorPicker}
              handleState={() => setColorPicker(false)}
              coords={coords}
              colorPickerRef={colorPickerRef}
              iconColor={iconColor}
              setIconColor={setIconColor}
            />
          )}
        </NavLink>
      ) : null}
    </>
  );
};

const DotsMenuIconContainer = styled.div`
  visibility: hidden;
  opacity: 0;
  display: none;
`;

const StyledBlock = styled.div`
  &:hover {
    ${DotsMenuIconContainer} {
      opacity: 1;
      visibility: visible;
      display: flex;
    }
  }
`;

export default SidebarBlock;
