import React, { Dispatch, SetStateAction, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import {
  BinderIcon,
  DotsMenuIcon,
  DropDownArrowIcon,
  FolderIcon,
  StudySetIcon,
} from "../../../assets";
import { ROTATE } from "../../../assets/types";
import { FILETREE_TYPES } from "../../../contexts/FileTreeContext";
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
import EditableText from "./EditableText";

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
  const classes = useStyles();
  const [blockModal, setBlockModal] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [editableText, setEditableText] = useState<boolean>(false);
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

  const handleExpandBlock = () => {
    setExpanded((prevState) => !prevState);
    if (type === FILETREE_TYPES.FOLDER)
      setFolderOpen && setFolderOpen((prevState) => !prevState);
  };

  const handleFolderOpen = () => {
    setExpanded(true);
    setFolderOpen && setFolderOpen(true);
  };

  return blockData ? (
    <NavLink
      to={`/${type}/${blockData.id}`}
      activeStyle={{
        filter: `${theme.colors.active.filter}`,
        fontWeight: "bold",
      }}
    >
      <HoverCard className={classes.sidebarBlock}>
        <HFlex padding={`8px 12px 8px ${paddingLeft}`}>
          {type === FILETREE_TYPES.FOLDER || type === FILETREE_TYPES.BINDER ? (
            <IconActive handleClick={handleExpandBlock}>
              <DropDownArrowIcon
                rotate={expanded ? ROTATE.NINETY : ROTATE.ZERO}
              />
            </IconActive>
          ) : null}
          <Spacer width="8pxa" />
          <IconWrapper>{iconType(type)}</IconWrapper>
          <Spacer width="8px" />
          <EditableText
            className={classes.overflowText}
            editableText={editableText}
          >
            {blockData.name}
          </EditableText>
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
          type={type}
          id={blockData.id}
          handleOpenFolder={handleFolderOpen}
          handleEditableText={setEditableText}
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
  overflowText: {
    flex: "1 1 auto",
    "&[contenteditable=true]": {
      textOverflow: "clip",
    },
    "&:empty:before": {
      content: '"Untitled"',
    },
  },
  menuIcon: {
    visibility: "hidden",
    opacity: "0",
    display: "none",
    marginLeft: "2px",
  },
});

SidebarBlock.defaultProps = {};

export default SidebarBlock;
