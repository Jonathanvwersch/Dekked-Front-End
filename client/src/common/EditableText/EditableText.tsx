import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { SidebarContext } from "../../contexts";

import { SelectedItemContext } from "../../contexts/SelectedItemContext";

interface EditableTextProps {
  editableTextRef: React.RefObject<HTMLDivElement>;
  isEditable?: boolean;
  handleOnKeyDownEnter?: () => void;
  className?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  isEditable = true,
  editableTextRef,
  handleOnKeyDownEnter,
  children,
  className,
}) => {
  const { handleSelectedBlockName, type, id } = useContext(SelectedItemContext);
  const { handleUpdateName } = useContext(SidebarContext);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      handleUpdateName(type, id, editableTextRef.current?.innerText!);
    }, 5000);
    return () => clearTimeout(timeOutId);
  }, [children]);

  return (
    <StyledEditableText
      contentEditable={isEditable}
      suppressContentEditableWarning={true}
      onDragOver={(e: any) => {
        e.preventDefault();
      }}
      spellCheck={false}
      ref={editableTextRef}
      onKeyDown={(e: any) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleOnKeyDownEnter && handleOnKeyDownEnter();
        }
      }}
      className={className}
      onKeyUp={() => {
        handleSelectedBlockName(editableTextRef.current?.innerText!);
      }}
    >
      {children}
    </StyledEditableText>
  );
};

const StyledEditableText = styled.div`
  width: 100%;
  &:empty:before {
    content: "Untitled";
    cursor: text;
  }
`;

export default EditableText;
