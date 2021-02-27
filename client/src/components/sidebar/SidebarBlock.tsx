import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import {
  BinderIcon,
  DotsMenuIcon,
  DropDownArrowIcon,
  FolderIcon,
  StudySetIcon,
} from "../../assets";
import { ROTATE } from "../../assets/types";
import { FILETREE_TYPES } from "../../contexts/FileTreeContext";
import {
  HorizontalFlexContainer,
  HoverCard,
  IconActive,
  IconWrapper,
  Spacer,
  Text,
  Overlay,
} from "../common";
import { positionModals } from "./Sidebar.helpers";
import SidebarBlockModal from "./SidebarBlockModal";

interface SidebarBlockProps {
  blockData: FolderInterface | BinderInterface | StudyPackInterface | undefined;
  type: string;
  openBlock?: () => void;
}

const SidebarBlock: React.FC<SidebarBlockProps> = ({
  blockData,
  type,
  openBlock,
}) => {
  const classes = useStyles();
  const [blockModal, setBlockModal] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
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
      ? "32px"
      : null;

  const iconType = (type: string) => {
    if (type === FILETREE_TYPES.FOLDER)
      return <FolderIcon color={blockData?.color} />;
    else if (type === FILETREE_TYPES.BINDER)
      return <BinderIcon color={blockData?.color} />;
    else return <StudySetIcon color={blockData?.color} />;
  };

  const handleBlockModal = (e: MouseEvent) => {
    setBlockModal(true);
    const blockModalHeight = 128;
    setCoords(positionModals(e, blockModalHeight));
  };

  const handleExpandBlock = () => {
    setExpanded((prevState) => !prevState);
    openBlock && openBlock();
  };

  return blockData ? (
    <>
      <HoverCard className={classes.sidebarBlock}>
        <HorizontalFlexContainer padding={`8px 12px 8px ${paddingLeft}`}>
          <IconActive handleClick={handleExpandBlock}>
            <DropDownArrowIcon
              rotate={expanded ? ROTATE.NINETY : ROTATE.ZERO}
            />
          </IconActive>
          <Spacer width="8pxa" />
          <IconWrapper>{iconType(type)}</IconWrapper>
          <Spacer width="8px" />
          <Text className={classes.overflowText}>{blockData.name}</Text>
          <IconActive
            className={classes.menuIcon}
            handleClick={handleBlockModal}
          >
            <DotsMenuIcon />
          </IconActive>
        </HorizontalFlexContainer>
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
        />
      </Overlay>
    </>
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
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",

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
