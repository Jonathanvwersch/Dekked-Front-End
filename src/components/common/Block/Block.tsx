import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { ThemeContext } from "styled-components";
import { Flex, HoverCard, IconWrapper, Spacer, Text } from "..";

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
  turnOffHover?: boolean;
  fakeFocus?: boolean;
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
  turnOffHover = false,
  fakeFocus,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <HoverCard
      turnOffHover={turnOffHover}
      index={index}
      activeIndex={activeIndex}
      backgroundColor={
        backgroundColor
          ? backgroundColor
          : theme.colors.backgrounds.modalBackground
      }
      handleMouseDown={handleMouseDown}
      handleClick={handleClick}
      padding={`${theme.spacers.size8} ${theme.spacers.size16}`}
      className={className}
      fakeFocus={fakeFocus}
    >
      <Flex>
        <IconWrapper>{icon}</IconWrapper>
        <Spacer width={theme.spacers.size8} />
        <Text
          fontSize={theme.typography.fontSizes.size14}
          fontWeight={fontWeight}
        >
          <FormattedMessage id={label} />
        </Text>
      </Flex>
    </HoverCard>
  );
};

export default Block;
