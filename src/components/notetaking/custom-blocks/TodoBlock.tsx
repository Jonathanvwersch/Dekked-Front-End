import React, { memo, useCallback, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { CheckmarkIcon } from "../../../assets";
import { SIZES } from "../../../shared";
import { Flex, HoverCard } from "../../common";
import { updateDataOfBlock } from "../Editor/Editor.helpers";
import TextBlock from "./TextBlock";

const TodoBlock: React.FC = (props: any) => {
  const { block, blockProps } = props;
  const { setEditorState, editorState, isEditable } = blockProps;
  const data = block.getData();
  const checked = data.has("checked") && data.get("checked") === true;
  const theme = useContext(ThemeContext);

  // We need to update the meta data of the block to save the checked state
  const updateData = useCallback(() => {
    const newData = data.set("checked", !checked);
    setEditorState(updateDataOfBlock(editorState, block, newData));
  }, [data, checked, setEditorState, editorState, block]);

  return (
    <Flex id={`${props.block.getKey()}-0-0`} alignItems="flex-start">
      <Checkbox
        isDisabled={!isEditable}
        checked={checked}
        handleClick={updateData}
        width={theme.spacers.size16}
        height={theme.spacers.size16}
        borderRadius={theme.sizes.borderRadius[SIZES.SMALL]}
        backgroundColor={
          checked ? theme.colors.primary : theme.colors.secondary
        }
      >
        {checked ? <CheckmarkIcon color="white" /> : null}
      </Checkbox>
      <TextBlock {...props} />
    </Flex>
  );
};

const Checkbox = styled(HoverCard)<{ checked: boolean }>`
  cursor: pointer;
  display: flex;
  margin-right: ${({ theme }) => theme.spacers.size16};
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  padding: 2px;
  user-select: none;
  margin-bottom: 1px;
  margin-top: 1px;
  flex-shrink: 0;
  border: 1px
    ${({ theme, checked }) => (checked ? "none" : theme.colors.fontColor)} solid;
`;

export default memo(TodoBlock);
