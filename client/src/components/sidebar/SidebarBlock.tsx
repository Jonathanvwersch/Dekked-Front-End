import React, { useContext, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { DotsMenuIcon, DropDownArrowIcon, FolderIcon } from "../../assets";
import { ROTATE } from "../../assets/types";
import {
  HorizontalFlexContainer,
  HoverCard,
  IconActive,
  IconWrapper,
  Spacer,
  Text,
  Overlay,
} from "../common";
import SidebarBlockModal from "./SidebarBlockModal";

interface SidebarBlockProps {
  blockData: FolderInterface | BinderInterface | StudyPackInterface | undefined;
  type: string;
}

const SidebarBlock: React.FC<SidebarBlockProps> = ({ blockData, type }) => {
  const classes = useStyles();
  const [modal, setModal] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [coords, setCoords] = useState<{
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }>();
  const paddingLeft =
    type === "folder"
      ? "16px"
      : type === "binder"
      ? "24px"
      : type === "study_pack"
      ? "32px"
      : null;

  const getMousePosition = (e: MouseEvent) => {
    const event = e.target as HTMLElement; // Necessary conversion so typescript doesnt complain about MouseEvent type
    const rect = event.getBoundingClientRect();
    const distanceToTop = rect.y; // Distance from mouse click to top of window
    const distanceToBottom = window.innerHeight - distanceToTop; // Distance from mouse click to bottom of window
    const distanceToLeft = rect.x + rect.width / 2; // Distance from mouse click to left of window
    const distanceToRight = window.innerWidth - distanceToLeft; // Distance from mouse click to right of window
    return {
      top: distanceToTop,
      right: distanceToRight,
      bottom: distanceToBottom,
      left: distanceToLeft,
    };
  };

  const positionModals = (e: MouseEvent, componentHeight: number) => {
    const { top, bottom, left } = getMousePosition(e);
    let newCoordinate;

    if (componentHeight && bottom - componentHeight < componentHeight) {
      newCoordinate = { bottom: bottom };
    } else {
      newCoordinate = { top: top };
    }
    return { ...newCoordinate, left: left };
  };

  const handleModal = (e: MouseEvent) => {
    setModal(true);
    const blockModalHeight = 128;
    setCoords(positionModals(e, blockModalHeight));
  };

  return blockData ? (
    <>
      <HoverCard className={classes.sidebarBlock}>
        <HorizontalFlexContainer
          padding={`8px 12px 8px ${paddingLeft}`}
          position="relative"
        >
          <IconActive>
            <DropDownArrowIcon
              rotate={expanded ? ROTATE.NINETY : ROTATE.ZERO}
            />
          </IconActive>
          <Spacer width="8px" />
          <IconWrapper>
            <FolderIcon color={blockData.color} />
          </IconWrapper>
          <Spacer width="8px" />
          <Text className={classes.overflowText}>{blockData.name}</Text>
          <IconActive className={classes.menuIcon} handleClick={handleModal}>
            <DotsMenuIcon />
          </IconActive>
        </HorizontalFlexContainer>
      </HoverCard>
      <Overlay
        state={modal}
        handleState={() => setModal(false)}
        coords={coords}
      >
        <SidebarBlockModal type={type} id={blockData.owner_id} />
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
