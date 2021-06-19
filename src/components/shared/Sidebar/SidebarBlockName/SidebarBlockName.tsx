import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { SelectedItemContext } from "../../../../contexts/SelectedItemContext";
import { Text } from "../../../common";
import { formatMessage } from "../../../../intl";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { Params } from "../../../../shared";

interface SidebarBlockNameProps {
  blockId: string;
  blockName: string;
}

const SidebarBlockName: React.FC<SidebarBlockNameProps> = ({
  blockId,
  blockName,
}) => {
  const { id } = useParams<Params>();
  const { selectedBlockName } = useContext(SelectedItemContext);
  const [name, setName] = useState(blockName);
  const intl = useIntl();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (blockId === id) {
      setName(selectedBlockName);
    }
  }, [id, blockId, selectedBlockName]);

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
