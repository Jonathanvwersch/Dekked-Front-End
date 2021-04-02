import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { HFlex, HoverCard, IconWrapper, Spacer, Text } from "..";

interface BlockProps {
  label: string;
  backgroundColor?: string;
  handleClick?: (args: any) => any;
  handleMouseDown?: (args: any) => any;
  icon: any;
  activeIndex?: number;
  index?: number;
}

const Block: React.FC<BlockProps> = ({
  label,
  handleClick,
  handleMouseDown,
  icon,
  activeIndex,
  index,
  backgroundColor,
}) => {
  const theme = useContext(ThemeContext);

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
    >
      <HFlex>
        <IconWrapper>{icon}</IconWrapper>
        <Spacer width={theme.spacers.size8} />
        <Text>{label}</Text>
      </HFlex>
    </HoverCard>
  );
};

export default Block;
