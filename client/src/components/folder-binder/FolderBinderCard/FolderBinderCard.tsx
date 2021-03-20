import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { BinderIcon, StudySetIcon } from "../../../assets";
import { FILETREE_TYPES, TAB_TYPE } from "../../../contexts/FileTreeContext";
import { handleUntitled } from "../../../helpers/handleUntitled";
import { ThemeType } from "../../../styles/theme";
import { Card, HFlex, Spacer, Text } from "../../common";

interface FolderBinderCardProps {
  data?: BinderInterface | StudyPackInterface;
  type: FILETREE_TYPES;
}

const FolderBinderCard: React.FC<FolderBinderCardProps> = ({ data, type }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const linkType =
    type === FILETREE_TYPES.FOLDER
      ? FILETREE_TYPES.BINDER
      : FILETREE_TYPES.STUDY_SET;

  const handleIconType = (type: FILETREE_TYPES, color: string) => {
    if (type === FILETREE_TYPES.FOLDER) {
      return <BinderIcon color={color} />;
    } else return <StudySetIcon color={color} />;
  };

  return (
    <NavLink
      to={
        linkType === FILETREE_TYPES.BINDER
          ? `/${linkType}/${data?.id}`
          : `/${linkType}/${data?.id}/${TAB_TYPE.NOTES}`
      }
    >
      <StyledCard
        borderRadius={theme.display.borderRadiusTwo}
        height="188px"
        width="170px"
        padding="0px"
        border={`1px solid ${theme.colors.grey2}`}
      >
        <Thumbnail />
        <Description
          borderRadius={`0px 0px ${theme.display.borderRadiusTwo} ${theme.display.borderRadiusTwo}`}
        >
          <Text className="overflow">{handleUntitled(data?.name!)}</Text>
          <Spacer height="4px" />
          <HFlex>
            {handleIconType(type, data?.color!)}
            <Spacer width="4px" />
            <Text
              fontColor={theme.colors.grey1}
              fontSize={theme.typography.fontSizes.size10}
            >
              Created
            </Text>
          </HFlex>
        </Description>
      </StyledCard>
    </NavLink>
  );
};

const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  position: relative;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow};
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
`;

export default FolderBinderCard;
