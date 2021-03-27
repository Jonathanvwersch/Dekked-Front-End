import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { SelectedItemContext } from "../../../../contexts/SelectedItemContext";
import { EditableText } from "../../../common";

interface SidebarBlockNameProps {
  isEditable: boolean;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
  editableTextRef: React.RefObject<HTMLDivElement>;
  blockType: string;
  blockId: string;
  blockName: string;
}

const SidebarBlockName: React.FC<SidebarBlockNameProps> = ({
  children,
  ...props
}) => {
  const { id, selectedBlockName } = useContext(SelectedItemContext);
  const [name, setName] = useState(props.blockName);

  useEffect(() => {
    if (props.blockId === id) {
      setName(selectedBlockName);
    }
  }, [id, props.blockId, selectedBlockName]);

  return (
    <StyledEditableText
      isEditable={props.isEditable}
      handleEditable={() => {
        props.setIsEditable((prevValue) => !prevValue);
      }}
      editableTextRef={props.editableTextRef}
      name={name}
      id={props.blockId}
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

export default SidebarBlockName;
