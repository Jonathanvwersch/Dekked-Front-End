import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { SidebarContext } from "../../../../contexts";
import { SelectedItemContext } from "../../../../contexts/SelectedItemContext";
import { EditableText } from "../../../common";

interface BlockNameProps {
  editableText: boolean;
  editableTextRef: React.RefObject<HTMLDivElement>;
  setEditableText: Dispatch<SetStateAction<boolean>>;
  blockType: string;
  blockId: string;
  blockName: string | undefined;
}

const BlockName: React.FC<BlockNameProps> = ({ children, ...props }) => {
  const { handleUpdateName } = useContext(SidebarContext);
  const { id, selectedBlockName } = useContext(SelectedItemContext);
  const [name, setName] = useState(props.blockName);

  useEffect(() => {
    if (props.blockId === id) {
      setName(selectedBlockName);
    }
  }, [selectedBlockName]);

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
      name={name}
    />
  );
};

const StyledEditableText = styled((props) => <EditableText {...props} />)`
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

export default BlockName;
