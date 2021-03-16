import React, { useContext, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";
import { SidebarContext } from "../../../contexts";

import { SelectedItemContext } from "../../../contexts/SelectedItemContext";

interface EditableTextProps {
  isEditable?: boolean;
  handleOnKeyDownEnter?: () => void;
  className?: string;
  editableTextRef: React.RefObject<HTMLDivElement>;
  name: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  isEditable = true,
  editableTextRef,
  handleOnKeyDownEnter,
  name,
  className,
}) => {
  const { handleSelectedBlockName, type, id } = useContext(SelectedItemContext);
  const { handleUpdateName } = useContext(SidebarContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [html, setHtml] = useState(name);

  const handleChange = (e: any) => {
    setHtml(e.target.value);
  };

  useEffect(() => {
    if (name?.length >= 0) {
      setHtml(name);
      setIsLoading(false);
    }
  }, [name]);

  return !isLoading ? (
    <StyledContentEditable
      spellCheck={false}
      disabled={!isEditable}
      innerRef={editableTextRef}
      onKeyDown={(e: any) => {
        if (e.key === "Enter") {
          handleOnKeyDownEnter &&
            handleOnKeyDownEnter() &&
            handleUpdateName(type, id, editableTextRef.current?.innerText!);
          e.preventDefault();
        }
      }}
      suppressContentEditableWarning={true}
      onDragOver={(e: any) => {
        e.preventDefault();
      }}
      onBlur={() =>
        handleUpdateName(type, id, editableTextRef.current?.innerText!)
      }
      className={className}
      onKeyUp={() => {
        handleSelectedBlockName(editableTextRef.current?.innerText!);
      }}
      onChange={handleChange}
      html={html}
    />
  ) : null;
};

const StyledContentEditable = styled(ContentEditable)`
  width: 100%;
  &:empty:before {
    content: "Untitled";
  }
  &[contenteditable="true"] {
    cursor: text;
  }
`;

export default EditableText;
