import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Card, Spacer, Text, Flex, ThemeType } from "dekked-design-system";

interface ThumbnailCardProps {
  topText: string;
  bottomText: string;
  backgroundImage?: string;
  backgroundIcon?: any;
  thumbnailBackgroundColor?: string;
  descriptionBackgroundColor?: string;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({
  topText,
  bottomText,
  backgroundImage,
  backgroundIcon,
  thumbnailBackgroundColor,
  descriptionBackgroundColor,
}) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <StyledCard
      height="90px"
      width="200px"
      padding="0px"
      border={`1px solid ${theme.colors.grey2}`}
      backgroundColor={
        thumbnailBackgroundColor || theme.colors.backgrounds.pageBackground
      }
      ariaLabel={topText}
    >
      <Flex height="100%">
        <Thumbnail backgroundImage={backgroundImage}>
          {backgroundIcon}
        </Thumbnail>
        <Description
          borderRadius="0px"
          backgroundColor={descriptionBackgroundColor || theme.colors.secondary}
        >
          <Text className="overflow">{topText}</Text>
          <Spacer height="8px" />
          <Text
            fontColor={theme.colors.grey1}
            fontSize={theme.typography.fontSizes.size10}
          >
            {bottomText}
          </Text>
        </Description>
      </Flex>
    </StyledCard>
  );
};
const StyledCard = styled((props) => <Card {...props} />)`
  position: relative;
  overflow: hidden;
  &:focus-visible,
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
  &:active {
    box-shadow: none;
  }
`;

const Thumbnail = styled.div<{ backgroundImage?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
  background-size: cover;
  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : undefined};
`;

const Description = styled((props) => <Flex {...props} />)`
  flex-direction: column;
  justify-content: center;
  padding: 8px 16px;
  background: white;
  height: 100%;
  align-items: flex-start;
`;

export default ThumbnailCard;
