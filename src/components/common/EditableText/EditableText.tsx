import React, { useCallback, useContext, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";
import { FileTreeContext } from "../../../contexts";
import { debounce } from "lodash";

import { SelectedItemContext } from "../../../contexts/SelectedItemContext";

interface EditableTextProps {
  editableTextRef: React.RefObject<HTMLDivElement>;
  name: string;
  itemId: string;
  handleEditable?: () => void;
  isEditable?: boolean;
  className?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  isEditable = true,
  editableTextRef,
  handleEditable,
  name,
  className,
  itemId,
}) => {
  const { handleSelectedBlockName, type } = useContext(SelectedItemContext);
  const { updateAsset } = useContext(FileTreeContext);
  const [html, setHtml] = useState<string>(name);

  const handleChange = (e: any) => {
    setHtml(e.target.value);
    // save every 500 milliseconds as you type
    autoSave();
  };

  const autoSave = useCallback(
    debounce(() => {
      updateAsset(type, itemId, {
        name: editableTextRef.current?.innerText,
      });
    }, 500),
    [itemId, editableTextRef, type]
  );

  const handleScrollToStart = () => {
    if (editableTextRef && editableTextRef.current)
      editableTextRef.current.scrollLeft = 0;
  };

  useEffect(() => {
    setHtml(name);
  }, [name]);

  // focus in on text when isEditable is true
  useEffect(() => {
    if (isEditable && editableTextRef && editableTextRef.current) {
      editableTextRef.current.focus();
    }
  }, [isEditable, editableTextRef, itemId]);

  return (
    <StyledContentEditable
      placeholder="Untitled"
      spellCheck={false}
      disabled={!isEditable}
      innerRef={editableTextRef}
      suppressContentEditableWarning={true}
      onKeyDown={(e: any) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleScrollToStart();
          handleEditable && handleEditable();
        }
      }}
      onPaste={(e: any) => {
        e.preventDefault();
      }}
      onDragOver={(e: any) => {
        e.preventDefault();
      }}
      onBlur={() => {
        handleScrollToStart();
        handleEditable && handleEditable();
      }}
      onKeyUp={() => {
        editableTextRef &&
          editableTextRef.current &&
          handleSelectedBlockName(editableTextRef.current?.innerText);
      }}
      className={className}
      onChange={handleChange}
      html={html}
    />
  );
};

const StyledContentEditable = styled(ContentEditable)`
  &:empty:before {
    content: "Untitled";
  }
  width: 100%;
  &[contenteditable="true"] {
    cursor: text;
  }
`;

export default EditableText;
