import React from "react";
import styled from "styled-components";
import { Card, Spacer, Text, Flex, SIZES } from "dekked-design-system";
import { useTheme } from "../../../hooks";

interface FileCardProps {
  topText: string;
  bottomText: string;
  backgroundImage?: string;
  icon?: any;
  thumbnailBackgroundColor?: string;
  descriptionBackgroundColor?: string;
  size?: SIZES;
}

const FileCard: React.FC<FileCardProps> = ({
  topText,
  bottomText,
  backgroundImage,
  icon,
  thumbnailBackgroundColor,
  descriptionBackgroundColor,
  size,
}) => {
  const theme = useTheme();
  const width = size === SIZES.LARGE ? "300px" : "210px";

  return (
    <StyledCard
      height={size === SIZES.LARGE ? "150px" : "90px"}
      width={width}
      padding="0px"
      border={`1px solid ${theme.colors.grey2}`}
      backgroundColor={
        thumbnailBackgroundColor || theme.colors.backgrounds.pageBackground
      }
      ariaLabel={topText}
    >
      <Flex height="100%">
        <Thumbnail backgroundImage={backgroundImage}>{icon}</Thumbnail>
        <Description
          borderRadius="0px"
          backgroundColor={descriptionBackgroundColor || theme.colors.secondary}
        >
          <Text
            fontWeight="bold"
            fontSize={
              size === SIZES.LARGE
                ? theme.typography.fontSizes.size14
                : theme.typography.fontSizes.size12
            }
            className="overflow"
          >
            {topText}
          </Text>
          <Spacer height="8px" />
          <Text
            fontColor={theme.colors.grey1}
            fontSize={
              size === SIZES.LARGE
                ? theme.typography.fontSizes.size12
                : theme.typography.fontSizes.size10
            }
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
  padding-left: 16px;
  padding-right: 16px;
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

export default FileCard;
