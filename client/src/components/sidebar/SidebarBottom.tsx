import React, { useContext } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { PlusIcon } from "../../assets";
import { ThemeType } from "../../theme";
import {
  HorizontalFlexContainer,
  HoverCard,
  IconWrapper,
  Spacer,
  Text,
} from "../common";
import {
  FileTreeContext,
  FILETREE_TYPES,
} from "../../contexts/FileTreeContext";

interface SidebarBottomProps {}

const SidebarBottom: React.FC<SidebarBottomProps> = () => {
  const theme: ThemeType = useTheme();
  const classes = useStyles({ theme });
  const { handleAddingAsset } = useContext(FileTreeContext);

  return (
    <HoverCard
      className={classes.sidebarBottom}
      handleClick={() => {
        handleAddingAsset(FILETREE_TYPES.FOLDER);
      }}
    >
      <HorizontalFlexContainer height="100%">
        <IconWrapper>
          <PlusIcon />
        </IconWrapper>
        <Spacer width={theme.spacers.size8} />
        <Text fontSize={theme.typography.fontSizes.size16}>Add folder</Text>
      </HorizontalFlexContainer>
    </HoverCard>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  sidebarBottom: {
    borderTop: `1px solid ${theme.colors.grey3};`,
    height: "50px",
    zIndex: "10",
    marginTop: "auto",
    backgroundColor: `${theme.colors.secondary}`,
    "&:hover": {
      filter: `${theme.colors.hover.filter}`,
    },
    "&:focus": {
      filter: `${theme.colors.active.filter}`,
    },
    "&:active": {
      filter: `${theme.colors.active.filter}`,
    },
  },
}));

export default SidebarBottom;
