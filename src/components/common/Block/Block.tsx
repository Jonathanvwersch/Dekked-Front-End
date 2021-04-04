import React from "react";
import { ThemeContext } from "styled-components";
import { HFlex, HoverCard, IconWrapper, Spacer, Text } from "..";
import { usePageSetupHelpers } from "../../../hooks";
import { useIntl } from "react-intl";

interface BlockProps {
  label: string;
  backgroundColor?: string;
  handleClick?: (args: any) => any;
  handleMouseDown?: (args: any) => any;
  icon: any;
  activeIndex?: number;
  index?: number;
  fontWeight?: string;
  className?: string;
}

const Block: React.FC<BlockProps> = ({
  label,
  handleClick,
  handleMouseDown,
  icon,
  activeIndex,
  index,
  backgroundColor,
  fontWeight,
  className,
}) => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers(ThemeContext, intl);

  return (
    <HoverCard
      index={index}
      activeIndex={activeIndex}
      backgroundColor={
        backgroundColor
          ? backgroundColor
          : theme.colors.backgrounds.modalBackground
      }
      handleMouseDown={handleMouseDown && handleMouseDown}
      handleClick={handleClick && handleClick}
      padding={`${theme.spacers.size8} ${theme.spacers.size16}`}
      className={className}
    >
      <HFlex>
        <IconWrapper>{icon}</IconWrapper>
        <Spacer width={theme.spacers.size8} />
        <Text fontWeight={fontWeight}>{formatMessage(label)}</Text>
      </HFlex>
    </HoverCard>
  );
};

export default Block;
