import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import styled from "styled-components";
import { SidebarContext } from "../../contexts";
import { SelectedItemContext } from "../../contexts/SelectedItemContext";
import EditableText from "../EditableText/EditableText";

interface SidebarEditableTextProps {
  editableText: boolean;
  editableTextRef: React.RefObject<HTMLDivElement>;
  setEditableText: Dispatch<SetStateAction<boolean>>;
  blockType: string;
  blockId: string;
  blockName: string | undefined;
}

const SidebarEditableText: React.FC<SidebarEditableTextProps> = ({
  children,
  ...props
}) => {
  const { handleUpdateName } = useContext(SidebarContext);
  const { id, selectedBlockName } = useContext(SelectedItemContext);

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
          handleUpdateName(props.blockType, props.blockId, selectedBlockName);
        }
      }
    };
    document.addEventListener("click", updateEditableName);

    return () => {
      document.removeEventListener("click", updateEditableName);
    };
  }, [props, handleUpdateName, selectedBlockName]);

  return (
    <StyledEditableText
      isEditable={props.editableText}
      handleOnKeyDownEnter={() => {
        props.setEditableText((prevValue) => !prevValue);
      }}
      editableTextRef={props.editableTextRef}
    >
      {id === props.blockId ? selectedBlockName : props.blockName}
    </StyledEditableText>
  );
};

const StyledEditableText = styled(EditableText)`
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
