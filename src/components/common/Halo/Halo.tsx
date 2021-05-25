import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useOutsideClickListener } from "../../../hooks";

interface DividerBlockProps {
  editable: boolean;
}

const DividerBlock: React.FC<DividerBlockProps> = ({
  children,
  editable = true,
}) => {
  const haloRef = useRef<HTMLDivElement>(null);
  const [isColored, setIsColored] = useState<boolean>(false);
  useOutsideClickListener(
    haloRef,
    () => setIsColored(false),
    isColored,
    true,
    true
  );

  return (
    <Halo
      onClick={() => setIsColored(true)}
      onFocus={() => setIsColored(true)}
      isColored={isColored}
      ref={haloRef}
      contentEditable={editable}
    >
      {children}
    </Halo>
  );
};

export default DividerBlock;

const coloredBackground = css`
  background: ${({ theme }) => theme.colors.selection};
  z-index: 81;
`;

const Halo = styled.div<{ isColored: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  ${({ isColored }) => (isColored ? coloredBackground : undefined)}
`;
