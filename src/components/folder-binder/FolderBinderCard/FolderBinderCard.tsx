import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { handleUntitled } from "../../../helpers/handleUntitled";
import { FILETREE_TYPES, SIZES, TAB_TYPE } from "../../../shared";
import { ThemeType } from "../../../styles/theme";
import { Card, HFlex, Spacer, Text } from "../../common";
import { handleIconType } from "../../shared/Sidebar/SidebarBlock/SidebarBlock";

interface FolderBinderCardProps {
  data: BinderInterface | StudyPackInterface;
  type: FILETREE_TYPES;
}

const FolderBinderCard: React.FC<FolderBinderCardProps> = ({ data, type }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const childType =
    type === FILETREE_TYPES.FOLDER
      ? FILETREE_TYPES.BINDER
      : FILETREE_TYPES.STUDY_SET;

  return (
    <NavLink
      to={
        childType === FILETREE_TYPES.BINDER
          ? `/${childType}/${data?.id}`
          : `/${childType}/${data?.id}/${TAB_TYPE.NOTES}`
      }
    >
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
          <Text className="overflow">{handleUntitled(data?.name)}</Text>
          <Spacer height={theme.spacers.size4} />
          <HFlex>
            {handleIconType(childType, data?.color)}
            <Spacer width={theme.spacers.size4} />
            <Text
              fontColor={theme.colors.grey1}
              fontSize={theme.typography.fontSizes.size10}
            >
              {`Created ${data?.date_created}`}
            </Text>
          </HFlex>
        </Description>
      </StyledCard>
    </NavLink>
  );
};

const StyledCard = styled(Card)`
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

const Description = styled(Card)`
  display: flex;
  flex-direction: column;
  z-index: 0;
  position: absolute;
  bottom: 0;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.grey2};
  min-height: 63px;
`;

export default FolderBinderCard;
