import React, { ReactElement } from "react";
import { Card, HFlex, HoverCard, IconWrapper, Spacer, Text } from "..";
import { usePageSetupHelpers } from "../../../hooks";
import ConditionalWrapper from "../ConditionalWrapper/ConditionalWrapper";

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
  hoverCard?: boolean;
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
  hoverCard = true,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();

  const CardComponent = (children: ReactElement) => (
    <Card
      backgroundColor={
        backgroundColor
          ? backgroundColor
          : theme.colors.backgrounds.modalBackground
      }
      padding={`${theme.spacers.size8} ${theme.spacers.size16}`}
    >
      {children}
    </Card>
  );

  const children = (
    <HFlex>
      <IconWrapper>{icon}</IconWrapper>
      <Spacer width={theme.spacers.size8} />
      <Text
        fontSize={theme.typography.fontSizes.size14}
        fontWeight={fontWeight}
      >
        {formatMessage(label)}
      </Text>
    </HFlex>
  );

  return (
    <ConditionalWrapper
      condition={!hoverCard}
      wrapper={() => CardComponent(children)}
    >
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
        {children}
      </HoverCard>
    </ConditionalWrapper>
  );
};

export default Block;
