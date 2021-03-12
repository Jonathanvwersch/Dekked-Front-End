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
} from "../../assets";
import { ROTATE } from "../../assets/types";
import {
  FileTreeContext,
  FILETREE_TYPES,
  TAB_TYPE,
} from "../../contexts/FileTreeContext";
import {
  Card,
  HFlex,
  HoverCard,
  IconActive,
  IconWrapper,
  Overlay,
  Spacer,
} from "..";
import { NavLink, useLocation } from "react-router-dom";

import SidebarBlockModal from "./SidebarBlockModal";
import { ThemeType } from "../../styles/theme";
import SidebarEditableText from "./SidebarEditableText";
import ColorPicker from "../ColorPicker/ColorPicker";
import styled, { ThemeContext } from "styled-components";
import { positionModals } from "../../helpers";

interface SidebarBlockProps {
  blockData: FolderInterface | BinderInterface | StudyPackInterface | undefined;
  type: string;
  setFolderOpen?: Dispatch<SetStateAction<boolean>>;
}

const SidebarBlock: React.FC<SidebarBlockProps> = ({
  blockData,
  type,
  setFolderOpen,
}) => {
  const editableTextRef = useRef<HTMLDivElement>(null);
  const [blockModal, setBlockModal] = useState<boolean>(false);
  const { pathname } = useLocation();
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const { updateAsset } = useContext(FileTreeContext);
  const [iconColor, setIconColor] = useState<string>(blockData?.color!);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [editableText, setEditableText] = useState<boolean>(false);
  const [blockName, setBlockName] = useState<string | undefined>(
    blockData?.name
  );
  const theme: ThemeType = useContext(ThemeContext);

  const [coords, setCoords] = useState<{
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }>();

  const paddingLeft =
    type === FILETREE_TYPES.FOLDER
      ? "16px"
      : type === FILETREE_TYPES.BINDER
      ? "24px"
      : type === FILETREE_TYPES.STUDY_SET
      ? "48px"
      : null;

  useEffect(() => {
    if (colorPickerRef.current) {
      updateAsset(type, blockData!.id, { color: iconColor });
    }
  }, [iconColor]);

  const iconType = (type: string) => {
    if (type === FILETREE_TYPES.FOLDER)
      return <FolderIcon color={blockData?.color} />;
    else if (type === FILETREE_TYPES.BINDER)
      return <BinderIcon color={blockData?.color} />;
    else return <StudySetIcon color={blockData?.color} />;
  };

  const handleBlockModal = (e: MouseEvent) => {
    e.preventDefault();
    setBlockModal(true);
    // I hate having to hard code the height of the modal but I'm not sure how to get the height of a component before it has been rendered
    const blockModalHeight = 128;
    setCoords(positionModals(e, blockModalHeight));
  };

  const handleExpandBlock = (e: MouseEvent) => {
    e.preventDefault();
    setExpanded((prevState) => !prevState);
    if (type === FILETREE_TYPES.FOLDER)
      setFolderOpen && setFolderOpen((prevState) => !prevState);
  };

  const handleOpenFolder = () => {
    setExpanded(true);
    setFolderOpen && setFolderOpen(true);
  };

  return blockData ? (
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
          pathname === `/${type}/${blockData.id}` ||
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
        <StyledSidebarBlock>
          <Card padding={`8px 12px 8px ${paddingLeft}`}>
            <HFlex>
              {type === FILETREE_TYPES.FOLDER ||
              type === FILETREE_TYPES.BINDER ? (
                <IconActive
                  handleClick={(e: MouseEvent) => handleExpandBlock(e)}
                >
                  <DropDownArrowIcon
                    rotate={expanded ? ROTATE.NINETY : ROTATE.ZERO}
                  />
                </IconActive>
              ) : null}
              <Spacer width="8px" />
              <IconWrapper>{iconType(type)}</IconWrapper>
              <Spacer width="8px" />
              <SidebarEditableText
                editableText={editableText}
                editableTextRef={editableTextRef}
                setEditableText={setEditableText}
                blockId={blockData.id}
                blockType={type}
                blockName={blockName}
                setBlockName={setBlockName}
              >
                {blockData.name}
              </SidebarEditableText>
              <Spacer width="2px" />
              <DotsMenuIconContainer>
                <IconActive
                  className="menu-icon"
                  handleClick={(e: MouseEvent) => handleBlockModal(e)}
                >
                  <DotsMenuIcon />
                </IconActive>
              </DotsMenuIconContainer>
            </HFlex>
          </Card>
        </StyledSidebarBlock>
      </HoverCard>
      <Overlay
        state={blockModal}
        handleState={() => setBlockModal(false)}
        coords={coords}
      >
        <SidebarBlockModal
          handleBlockModal={() => setBlockModal(false)}
          handleColorPicker={() => setColorPicker(true)}
          type={type}
          id={blockData.id}
          handleOpenFolder={handleOpenFolder}
          handleEditableText={setEditableText}
          editableTextRef={editableTextRef}
          iconColor={iconColor}
        />
      </Overlay>

      <Overlay
        state={colorPicker}
        handleState={() => setColorPicker(false)}
        coords={coords}
      >
        <ColorPicker
          colorPickerRef={colorPickerRef}
          iconColor={iconColor}
          setIconColor={setIconColor}
        />
      </Overlay>
    </NavLink>
  ) : null;
};

const DotsMenuIconContainer = styled.div`
  visibility: hidden;
  opacity: 0;
  display: none;
`;

const StyledSidebarBlock = styled.div`
  &:hover {
    ${DotsMenuIconContainer} {
      opacity: 1;
      visibility: visible;
      display: flex;
    }
  }
`;

export default SidebarBlock;
