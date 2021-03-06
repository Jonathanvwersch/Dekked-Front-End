import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createUseStyles, useTheme } from "react-jss";
import {
  BinderIcon,
  DotsMenuIcon,
  DropDownArrowIcon,
  FolderIcon,
  StudySetIcon,
} from "../../../assets";
import { ROTATE } from "../../../assets/types";
import {
  FileTreeContext,
  FILETREE_TYPES,
} from "../../../contexts/FileTreeContext";
import {
  HFlex,
  HoverCard,
  IconActive,
  IconWrapper,
  Overlay,
  Spacer,
} from "../../common";
import { NavLink } from "react-router-dom";

import { positionModals } from "./Sidebar.helpers";
import SidebarBlockModal from "./SidebarBlockModal";
import { ThemeType } from "../../../theme";
import SidebarEditableText from "./SidebarEditableText";
import ColorPicker from "../../common/ColorPicker/ColorPicker";

interface SidebarBlockProps {
  blockData: FolderInterface | BinderInterface | StudyPackInterface | undefined;
  type: string;
  setFolderOpen?: Dispatch<SetStateAction<boolean>>;
  folderData: FolderInterface;
  binderData?: BinderInterface;
  studySetData?: StudyPackInterface;
}

const SidebarBlock: React.FC<SidebarBlockProps> = ({
  blockData,
  type,
  setFolderOpen,
  folderData,
  binderData,
  studySetData,
}) => {
  const classes = useStyles();
  const editableTextRef = useRef<HTMLDivElement>(null);
  const [blockModal, setBlockModal] = useState<boolean>(false);
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const { updateAsset } = useContext(FileTreeContext);
  const [iconColor, setIconColor] = useState<string>(blockData?.color!);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [editableText, setEditableText] = useState<boolean>(false);
  const [blockName, setBlockName] = useState<string | undefined>(
    blockData?.name
  );
  const theme: ThemeType = useTheme();
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
        pathname: `/${type}/${blockData.id}`,
        state: {
          folderData: folderData && folderData,
          binderData: binderData && binderData,
          studySetData: studySetData && studySetData,
        },
      }}
      style={{ width: "100%" }}
      activeStyle={{
        filter: `${theme.colors.active.filter}`,
        fontWeight: "bold",
      }}
    >
      <HoverCard className={classes.sidebarBlock}>
        <HFlex padding={`8px 12px 8px ${paddingLeft}`}>
          {type === FILETREE_TYPES.FOLDER || type === FILETREE_TYPES.BINDER ? (
            <IconActive handleClick={(e: MouseEvent) => handleExpandBlock(e)}>
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
          <IconActive
            className={classes.menuIcon}
            handleClick={handleBlockModal}
          >
            <DotsMenuIcon />
          </IconActive>
        </HFlex>
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

const useStyles = createUseStyles({
  sidebarBlock: {
    "&:hover": {
      "& $menuIcon": {
        opacity: "1",
        visibility: "visible",
        display: "flex",
      },
    },
  },

  menuIcon: {
    visibility: "hidden",
    opacity: "0",
    display: "none",
    marginLeft: "2px",
  },
});

export default SidebarBlock;
