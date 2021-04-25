import React, { useContext } from "react";
import { DropDownArrowIcon, ROTATE } from "../../../assets";
import { Box, HFlex, IconActive, VFlex } from "../../common";
import PlaceholderBlock from "./PlaceholderBlock";
import { updateDataOfBlock } from "../Utils/editorUtils";
import { SIZES } from "../../../shared";
import styled, { ThemeContext } from "styled-components";

const ToggleBlock: React.FC = (props: any) => {
  const { block, blockProps } = props;
  const { setEditorState, editorState } = blockProps;
  const data = block.getData();
  const toggled = data.has("toggled") && data.get("toggled") === true;
  const theme = useContext(ThemeContext);

  // We need to update the meta data of the block to save the toggled state
  const updateData = () => {
    const newData = data.set("toggled", !toggled);
    setEditorState(updateDataOfBlock(editorState, block, newData));
  };

  return (
    <HFlex alignItems="flex-start">
      <Box mr={theme.spacers.size8}>
        <IconActive
          handleClick={() => {
            updateData();
          }}
        >
          <DropDownArrowIcon
            rotate={toggled ? ROTATE.NINETY : ROTATE.ZERO}
            size={SIZES.LARGE}
          />
        </IconActive>
      </Box>
      <VFlex>
        <PlaceholderBlock {...props} />
        <StyledSpacer contentEditable={false} />
        {toggled ? <PlaceholderBlock {...props} /> : null}
      </VFlex>
    </HFlex>
  );
};

const StyledSpacer = styled.div`
  height: ${({ theme }) => theme.spacers.size8};
  width: 1px;
`;

export default ToggleBlock;
