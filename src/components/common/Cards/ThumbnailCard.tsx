import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { SIZES } from "../../../shared";
import { ThemeType } from "../../../styles/theme";
import { Card, HFlex, Spacer, Text } from "../../common";

interface ThumbnailCardProps {
  topText: string;
  bottomText: string;
  icon?: any;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({
  topText,
  bottomText,
  icon,
}) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <StyledCard
      height="188px"
      width="170px"
      padding="0px"
      border={`1px solid ${theme.colors.grey2}`}
      backgroundColor={theme.colors.backgrounds.pageBackground}
    >
      <Thumbnail />
      <Description
        borderRadius={`0px 0px ${theme.sizes.borderRadius[SIZES.SMALL]} ${
          theme.sizes.borderRadius[SIZES.SMALL]
        }`}
      >
        <Text className="overflow">{topText}</Text>
        <Spacer height={theme.spacers.size4} />
        <HFlex>
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
        </HFlex>
      </Description>
    </StyledCard>
  );
};
const StyledCard = styled((props) => <Card {...props} />)`
  position: relative;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow};
  }

  &:active {
    box-shadow: none;
  }
`;

const Thumbnail = styled(HFlex)`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Description = styled((props) => <Card {...props} />)`
  display: flex;
  flex-direction: column;
  z-index: 0;
  position: absolute;
  bottom: 0;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.grey2};
  min-height: 63px;
`;

export default ThumbnailCard;
