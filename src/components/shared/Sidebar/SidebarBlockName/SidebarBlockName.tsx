import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { formatMessage } from "../../../../intl";
import { useIntl } from "react-intl";
import { Text } from "dekked-design-system";

interface SidebarBlockNameProps {
  blockName: string;
}

const SidebarBlockName: React.FC<SidebarBlockNameProps> = ({ blockName }) => {
  const intl = useIntl();
  const theme = useContext(ThemeContext);

  return (
    <StyledText
      placeholder={formatMessage("generics.untitled", intl)}
      className="overflow"
      fontSize={theme.typography.fontSizes.size14}
    >
      {blockName}
    </StyledText>
  );
};

const StyledText = styled(Text)`
  flex: 1 1 auto;
  user-select: none;
  &:empty:before {
    content: attr(placeholder);
  }
`;

export default SidebarBlockName;
