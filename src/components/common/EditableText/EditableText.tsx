import React, { useCallback, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";
import { debounce } from "lodash";
import { useIntl } from "react-intl";

import { formatMessage } from "../../../intl";
import { useUpdateAsset } from "../../../helpers";
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
  const intl = useIntl();
  const [html, setHtml] = useState<string>(name);
  const { updateItem } = useUpdateAsset();

  const handleChange = (e: any) => {
    setHtml(e.target.value);
    // save every 500 milliseconds as you type
    autoSave(e.target.value);
  };

  const debounced = debounce((name: string) => {
    updateItem(itemId, type, {
      name: name.replace("&nbsp;", " "),
    });
  }, 1000);

  const autoSave = useCallback((name: string) => debounced(name), [type]); // eslint-disable-line react-hooks/exhaustive-deps

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
      onDrag={(e: any) => {
        e.preventDefault();
      }}
      onDragOver={(e: any) => {
        e.preventDefault();
      }}
      onBlur={() => {
        handleScrollToStart();
        handleEditable && handleEditable();
      }}
      className={className}
      onChange={handleChange}
      html={html || ""}
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
