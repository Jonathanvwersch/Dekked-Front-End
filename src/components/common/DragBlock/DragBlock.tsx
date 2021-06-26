import React, { memo, ReactNode } from "react";
import styled, { FlattenInterpolation, ThemeProps } from "styled-components";

interface DragBlockProps {
  children: ReactNode;
  isDraggable: boolean;
  handleDragEnter?: () => void;
  handleDragLeave?: () => void;
  handleDrop?: () => void;
  handleDragEnd?: () => void;
  handleDragOver?: () => void;
  dragStyles?: FlattenInterpolation<ThemeProps<any>>;
  className?: string;
  showDragStyles?: boolean;
}

const DragBlock: React.FC<DragBlockProps> = ({
  children,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
  handleDragEnd,
  isDraggable,
  handleDragOver,
  dragStyles,
  className,
  showDragStyles,
}) => (
  <StyledDragBlock
    dragStyles={dragStyles}
    className={className}
    draggable={isDraggable}
    onDragEnter={(e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleDragEnter && handleDragEnter();
    }}
    onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleDragLeave && handleDragLeave();
    }}
    onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleDragOver && handleDragOver();
    }}
    onDragEnd={(e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleDragEnd && handleDragEnd();
    }}
    onDrop={(e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleDrop && handleDrop();
    }}
    showDragStyles={showDragStyles}
  >
    {children}
  </StyledDragBlock>
);

const StyledDragBlock = styled.div<{
  dragStyles?: FlattenInterpolation<ThemeProps<any>>;
  showDragStyles?: boolean;
}>`
  ${({ showDragStyles, dragStyles }) => showDragStyles && dragStyles}
`;

export default memo(DragBlock);
