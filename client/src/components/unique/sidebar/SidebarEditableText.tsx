import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import styled from "styled-components";
import { FileTreeContext } from "../../../contexts";

interface SidebarEditableTextProps {
  editableText: boolean;
  editableTextRef: React.RefObject<HTMLDivElement>;
  setEditableText: Dispatch<SetStateAction<boolean>>;
  blockType: string;
  blockId: string;
  blockName: string | undefined;
  setBlockName: Dispatch<SetStateAction<string | undefined>>;
}

const SidebarEditableText: React.FC<SidebarEditableTextProps> = ({
  children,
  ...props
}) => {
  const { updateAsset } = useContext(FileTreeContext);

  const handleRename = () => {
    updateAsset(props.blockType, props.blockId, {
      name: props.blockName,
    });
  };

  useEffect(() => {
    const updateEditableName = (e: any) => {
      // When user clicks away from name, make sure the beginning of the name is shown
      if (props.editableTextRef.current) {
        props.editableTextRef.current.addEventListener("blur", () => {
          props.editableTextRef.current!.scrollLeft = 0;
        });
      }

      // Turn off editability of text
      if (props.editableText) {
        if (!props.editableTextRef?.current?.contains(e.target)) {
          props.setEditableText((prevValue) => !prevValue);
          handleRename();
        }
      }
    };
    document.addEventListener("click", updateEditableName);

    return () => {
      document.removeEventListener("click", updateEditableName);
    };
  }, [props]);

  return (
    <EditableText
      contentEditable={props.editableText}
      suppressContentEditableWarning={true}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      spellCheck={false}
      ref={props.editableTextRef}
      onKeyDown={(e) => {
        props.setBlockName(props.editableTextRef.current?.innerText);
        if (e.key === "Enter") {
          props.setEditableText((prevValue) => !prevValue);
          handleRename();
        }
      }}
    >
      {children}
    </EditableText>
  );
};

const EditableText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.size12};
  color: ${({ theme }) => theme.colors.fontColor};
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex: 1 1 auto;
  &[contenteditable="true"] {
    text-overflow: clip;
  }
  &:empty:before {
    content: "Untitled";
  }
`;

export default SidebarEditableText;
