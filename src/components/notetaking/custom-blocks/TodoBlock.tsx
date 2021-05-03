import React from "react";
import styled from "styled-components";
import { CheckmarkIcon } from "../../../assets";
import { SIZES } from "../../../shared";
import { HFlex, HoverCard } from "../../common";
import BlockSettings from "../BlockSettings/BlockSettings";
import { updateDataOfBlock } from "../Editor/Editor.helpers";
import TextBlock from "./TextBlock";

const TodoBlock: React.FC = (props: any) => {
  const { block, blockProps } = props;
  const { setEditorState, editorState } = blockProps;
  const data = block.getData();
  const checked = data.has("checked") && data.get("checked") === true;

  // We need to update the meta data of the block to save the checked state
  const updateData = () => {
    const newData = data.set("checked", !checked);
    setEditorState(updateDataOfBlock(editorState, block, newData));
  };

  return (
    <BlockSettings>
      <HFlex alignItems="flex-start">
        <Checkbox
          checked={checked}
          handleClick={() => {
            updateData();
          }}
        >
          {checked ? <CheckmarkIcon color="white" /> : null}
        </Checkbox>
        <TextBlock {...props} />
      </HFlex>
    </BlockSettings>
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
  margin-top: 2px;
  flex-shrink: 0;
  background: ${({ theme, checked }) =>
    checked ? theme.colors.primary : theme.colors.secondary};
  height: ${({ theme }) => theme.spacers.size16};
  border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.SMALL]};
  border: 1px
    ${({ theme, checked }) => (checked ? "none" : theme.colors.fontColor)} solid;
`;

export default TodoBlock;
