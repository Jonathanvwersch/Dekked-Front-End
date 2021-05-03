import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { Halo } from "../../common";
import BlockSettings from "../BlockSettings/BlockSettings";
import { addNewBlockAt } from "../Editor/Editor.helpers";

const DividerBlock: React.FC = (props: any) => {
  // add new block on mount after the divider
  useEffect(() => {
    props.blockProps.setEditorState(
      addNewBlockAt(props.blockProps.editorState, props.block.getKey())
    );
  }, []);

  return (
    <BlockSettings>
      <Halo>
        <Divider />
      </Halo>
    </BlockSettings>
  );
};

export default DividerBlock;

const Divider = styled.hr`
  color: ${({ theme }) => theme.colors.fontColor};
  background-color: ${({ theme }) => theme.colors.fontColor};
  margin-top: ${({ theme }) => theme.spacers.size16};
  margin-bottom: ${({ theme }) => theme.spacers.size16};
  border: none;
  width: 100%;
  height: 1px;
`;
