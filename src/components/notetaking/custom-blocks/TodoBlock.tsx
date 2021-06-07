import React, { memo } from "react";
import styled from "styled-components";
import { CheckmarkIcon } from "../../../assets";
import { SIZES } from "../../../shared";
import { Flex, HoverCard } from "../../common";
import {
  removeSpecificBlockStyle,
  updateDataOfBlock,
} from "../Editor/Editor.helpers";
import TextBlock from "./TextBlock";

const TodoBlock: React.FC = (props: any) => {
  const { block, blockProps } = props;
  const { setEditorState, editorState } = blockProps;
  const data = block.getData();
  const checked = data.has("checked") && data.get("checked") === true;

  // We need to update the meta data of the block to save the checked state
  const updateData = () => {
    const newData = data.set("checked", !checked);
    // for some reason, if I just pass in the editorState as the first argument of updateDataOfBlock,
    // the block loses focus every time the data is updated, which causes a lot of problems.
    // And then for some other reason I don't quite understand, if I use the editor state return from
    // the removeSpecificBlockStyle function, everything works as expected--the block maintains focus
    // AND no block styles are moved. Very weird behaviour but I am not bothered enough to look into more at the moment.
    setEditorState(
      updateDataOfBlock(
        removeSpecificBlockStyle(undefined, editorState, true),
        block,
        newData
      )
    );
  };

  return (
    <Flex id={`${props.block.getKey()}-0-0`} alignItems="flex-start">
      <Checkbox
        checked={checked}
        handleClick={() => {
          updateData();
        }}
      >
        {checked ? <CheckmarkIcon color="white" /> : null}
      </Checkbox>
      <TextBlock {...props} />
    </Flex>
  );
};

const Checkbox = styled(HoverCard)<{ checked: boolean }>`
  cursor: pointer;
  width: ${({ theme }) => theme.spacers.size16};
  display: flex;
  margin-right: ${({ theme }) => theme.spacers.size16};
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  user-select: none;
  margin-bottom: 1px;
  margin-top: 1px;
  flex-shrink: 0;
  background: ${({ theme, checked }) =>
    checked ? theme.colors.primary : theme.colors.secondary};
  height: ${({ theme }) => theme.spacers.size16};
  border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.SMALL]};
  border: 1px
    ${({ theme, checked }) => (checked ? "none" : theme.colors.fontColor)} solid;
`;

export default memo(TodoBlock);
