import React, { useContext } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { PlusIcon } from "../../../assets";
import { ThemeType } from "../../../theme";
import { HFlex, HoverCard, IconWrapper, Spacer, Text } from "../../common";
import {
  FileTreeContext,
  FILETREE_TYPES,
} from "../../../contexts/FileTreeContext";

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
      {/* <Divider /> */}
      <HFlex height="100%">
        <IconWrapper>
          <PlusIcon size="20px" />
        </IconWrapper>
        <Spacer width={theme.spacers.size8} />
        <Text fontSize={theme.typography.fontSizes.size16}>Add folder</Text>
      </HFlex>
    </HoverCard>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  sidebarBottom: {
    height: "50px",
    zIndex: "10",
    marginTop: "auto",
  },
}));

export default SidebarBottom;
