import React, { memo, useEffect } from "react";
import styled from "styled-components/macro";
import { Halo } from "../../common";
import BlockSettings from "../BlockSettings/BlockSettings";
import { addNewBlockAt } from "../Editor/Editor.helpers";

const DividerBlock: React.FC = (props: any) => {
  // add new block on mount after the divider
  const { editorState, setEditorState, dragBlockKey, setDragBlockKey } =
    props.blockProps;
  useEffect(() => {
    setEditorState(
      addNewBlockAt(props.blockProps.editorState, props.block.getKey())
    );
  }, []);

  return (
    <BlockSettings
      editorState={editorState}
      setEditorState={setEditorState}
      blockKey={props.block.getKey()}
      block={props.block}
      dragBlockKey={dragBlockKey}
      setDragBlockKey={setDragBlockKey}
    >
      <Halo>
        <Divider />
      </Halo>
    </BlockSettings>
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
