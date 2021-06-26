import React, { useContext, useLayoutEffect } from "react";
import styled, { ThemeContext } from "styled-components";
import { Text } from "../../../common";
import { formatMessage } from "../../../../intl";
import { useIntl } from "react-intl";
import { Params } from "../../../../shared";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { selectedBlockNameAtom } from "../../../../store";

interface SidebarBlockNameProps {
  blockId: string;
  blockName: string;
}

const SidebarBlockName: React.FC<SidebarBlockNameProps> = ({
  blockName,
  blockId,
}) => {
  const intl = useIntl();
  const theme = useContext(ThemeContext);
  const { id } = useParams<Params>();
  const [selectedBlockName, setSelectedBlockName] = useAtom(
    selectedBlockNameAtom
  );

  useLayoutEffect(() => {
    id === blockId && setSelectedBlockName(blockName);
  }, [blockName, setSelectedBlockName, id, blockId]);

  return (
    <StyledText
      placeholder={formatMessage("generics.untitled", intl)}
      className="overflow"
      fontSize={theme.typography.fontSizes.size14}
    >
      {id === blockId ? selectedBlockName : blockName}
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
