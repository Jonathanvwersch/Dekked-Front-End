import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { ThemeType } from "../../../styles/theme";
import { Card, Spacer, Text, Flex } from "../../common";

interface ThumbnailCardProps {
  topText: string;
  bottomText: string;
  backgroundImage?: string;
  icon?: any;
  backgroundIcon?: any;
  thumbnailBackgroundColor?: string;
  descriptionBackgroundColor?: string;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({
  topText,
  bottomText,
  icon,
  backgroundImage,
  backgroundIcon,
  thumbnailBackgroundColor,
  descriptionBackgroundColor,
}) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <StyledCard
      height="180px"
      width="160px"
      padding="0px"
      border={`1px solid ${theme.colors.grey2}`}
      backgroundColor={
        thumbnailBackgroundColor || theme.colors.backgrounds.pageBackground
      }
      ariaLabel={topText}
    >
      <Flex flexDirection="column" height="100%">
        <Thumbnail backgroundImage={backgroundImage}>
          {backgroundIcon}
        </Thumbnail>
        <Description
          borderRadius="0px"
          backgroundColor={descriptionBackgroundColor || theme.colors.secondary}
        >
          <Text className="overflow">{topText}</Text>
          <Spacer height="2px" />
          <Flex>
            {icon ? (
              <>
                {icon}
                <Spacer width={theme.spacers.size4} />
              </>
            ) : null}
            <Text
              fontColor={theme.colors.grey1}
              fontSize={theme.typography.fontSizes.size10}
            >
              {bottomText}
            </Text>
          </Flex>
        </Description>
      </Flex>
    </StyledCard>
  );
};
const StyledCard = styled((props) => <Card {...props} />)`
  position: relative;
  overflow: hidden;
  &:focus,
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
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : undefined};
`;

const Description = styled((props) => <Card {...props} />)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.grey2};
  min-height: 52px;
`;

export default ThumbnailCard;
