import { EditorState } from "draft-js";
import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useKeyPress, useOutsideClickListener } from "../../../hooks";
import { removeBlock } from "../../notetaking/Editor/Editor.helpers";

interface HaloProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  blockKey: string;
  editable?: boolean;
  saveEditor?: (args: any) => void;
}

const Halo: React.FC<HaloProps> = ({
  children,
  editable = true,
  setEditorState,
  editorState,
  blockKey,
  saveEditor,
}) => {
  const haloRef = useRef<HTMLDivElement>(null);
  const [isColored, setIsColored] = useState<boolean>(false);
  useOutsideClickListener(
    haloRef,
    () => setIsColored(false),
    editable && isColored,
    true,
    true
  );

  useKeyPress(
    ["Backspace"],
    () => {
      const newEditorState = removeBlock(editorState, blockKey);
      setEditorState(newEditorState);
      saveEditor && saveEditor(newEditorState);
    },
    editable && isColored
  );

  return (
    <StyledHalo
      onClick={() => editable && setIsColored(true)}
      onFocus={() => editable && setIsColored(true)}
      isColored={isColored}
      ref={haloRef}
      contentEditable={editable}
    >
      {children}
    </StyledHalo>
  );
};

export default Halo;

const coloredBackground = css`
  background: ${({ theme }) => theme.colors.selection};
  filter: opacity(0.5);
  z-index: 81;
`;

const StyledHalo = styled.div<{ isColored: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  ${({ isColored }) => (isColored ? coloredBackground : undefined)}
`;
