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
import { NavLink } from "react-router-dom";
import { ThemeType } from "../../theme";
import SidebarWorkspaceModal from "./SidebarWorkspaceModal";
import { FileTreeContext } from "../../contexts/FileTreeContext";

interface SidebarBlockProps {
  blockData: FolderInterface | BinderInterface | StudyPackInterface | undefined;
  type: string;
}

const SidebarBlock: React.FC<SidebarBlockProps> = ({ blockData, type }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  // const theme: ThemeType = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleDropDownClick = () => {
    setExpanded((prevState) => !prevState);
  };

  const paddingLeft =
    type === "folder"
      ? "16px"
      : type === "binder"
      ? "24px"
      : type === "study_pack"
      ? "32px"
      : null;

  return blockData ? (
    /* <NavLink
        to={`/${blockData.id}`}
        activeStyle={{
          fontWeight: "bold",
          filter: `${theme.colors.hover.filter}`,
        }}
      > */
    <>
      <HoverCard className={classes.sidebarBlock}>
        <HorizontalFlexContainer
          padding={`8px 12px 8px ${paddingLeft}`}
          position="relative"
        >
          <IconActive handleClick={handleDropDownClick}>
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
          <IconActive
            className={classes.menuIcon}
            handleClick={() => setModal(true)}
          >
            <DotsMenuIcon />
          </IconActive>
        </HorizontalFlexContainer>
      </HoverCard>
      <Overlay state={modal} handleState={() => setModal(false)}>
        <SidebarWorkspaceModal
          handleModal={() => setModal(false)}
          type={type}
          id={blockData.owner_id}
        />
      </Overlay>
    </>
  ) : /* </NavLink> */

  null;
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
