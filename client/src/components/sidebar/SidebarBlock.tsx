import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { DotsMenuIcon, DropDownArrowIcon, FolderIcon } from "../../assets";
import { ROTATE } from "../../assets/types";
import {
  HorizontalFlexContainer,
  HoverCard,
  IconActive,
  IconWrapper,
  Spacer,
  Text,
} from "../common";

interface SidebarBlockProps {
  paddingLeft?: string;
}

const SidebarBlock: React.FC<SidebarBlockProps> = ({ paddingLeft }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleDropDownClick = () => {
    setExpanded((prevState) => !prevState);
  };

  return (
    <HoverCard className={classes.sidebarBlock}>
      <HorizontalFlexContainer
        padding={`8px 12px 8px ${paddingLeft}`}
        position="relative"
      >
        <IconActive handleClick={handleDropDownClick}>
          <DropDownArrowIcon rotate={expanded ? ROTATE.NINETY : ROTATE.ZERO} />
        </IconActive>
        <Spacer width="8px" />
        <IconWrapper>
          <FolderIcon />
        </IconWrapper>
        <Spacer width="8px" />
        <Text className={classes.overflowText}>
          Welcome to Dekkkkkedsfds gfdsg dfs gdsfg e
        </Text>
        <IconActive className={classes.menuIcon}>
          <DotsMenuIcon />
        </IconActive>
      </HorizontalFlexContainer>
    </HoverCard>
  );
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

SidebarBlock.defaultProps = {
  paddingLeft: "16px",
};

export default SidebarBlock;
