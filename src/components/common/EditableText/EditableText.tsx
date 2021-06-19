import React, { useCallback, useContext, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";
import { debounce } from "lodash";
import { useIntl } from "react-intl";

import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { formatMessage } from "../../../intl";
import { useAsset } from "../../../helpers";
import { typeAtom } from "../../../store";
import { useAtom } from "jotai";

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
  const [type] = useAtom(typeAtom);
  const { handleSelectedBlockName } = useContext(SelectedItemContext);
  const intl = useIntl();
  const { updateAsset } = useAsset();
  const [html, setHtml] = useState<string>(name);

  const handleChange = (e: any) => {
    setHtml(e.target.value);
    // save every 500 milliseconds as you type
    autoSave(e.target.value);
  };

  const autoSave = useCallback(
    debounce((name: string) => {
      updateAsset(type, itemId, {
        name: name.replace("&nbsp;", " "),
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

  // only allow plain text (or emojis) on paste
  const handlePaste = (e: any) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    window.document.execCommand("insertText", false, text);
  };

  return (
    <StyledContentEditable
      placeholder={formatMessage("generics.untitled", intl)}
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
        handlePaste(e);
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
    content: attr(placeholder);
  }
  width: 100%;
  &[contenteditable="true"] {
    cursor: text;
  }
`;

export default EditableText;
