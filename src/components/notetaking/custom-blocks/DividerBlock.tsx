import React, { memo, useEffect } from "react";
import styled from "styled-components/macro";
import { Halo } from "../../common";
import { addNewBlockAt } from "../Editor/Editor.helpers";

const DividerBlock: React.FC = (props: any) => {
  // add new block on mount after the divider
  const { setEditorState } = props.blockProps;
  useEffect(() => {
    setEditorState(
      addNewBlockAt(props.blockProps.editorState, props.block.getKey())
    );
  }, []);

  return (
    <Halo editable={false}>
      <Divider />
    </Halo>
  );
};

export default memo(DividerBlock);

const Divider = styled.hr`
  color: ${({ theme }) => theme.colors.fontColor};
  background-color: ${({ theme }) => theme.colors.fontColor};
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  width: 100%;
  height: 1px;
`;
