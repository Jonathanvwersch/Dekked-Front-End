import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import styled, { ThemeContext } from "styled-components";
import { SelectedItemContext } from "../../../../contexts/SelectedItemContext";
import { Text } from "../../../common";
import { formatMessage } from "../../../../intl";
import { useIntl } from "react-intl";

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
  const intl = useIntl();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (props.blockId === id) {
      setName(selectedBlockName);
    }
  }, [id, props.blockId, selectedBlockName]);

  return (
    <StyledText
      placeholder={formatMessage("generics.untitled", intl)}
      className="overflow"
      fontSize={theme.typography.fontSizes.size14}
    >
      {name}
    </StyledText>
  );
};

const StyledText = styled(Text)`
  flex: 1 1 auto;
  &:empty:before {
    content: attr(placeholder);
  }
`;

export default SidebarBlockName;
