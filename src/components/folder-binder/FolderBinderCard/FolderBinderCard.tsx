import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FILETREE_TYPES } from "../../../shared";
import { ThumbnailCard } from "../../common";
import { useIntl } from "react-intl";
import { formatMessage } from "../../../intl";
import {
  getChildType,
  getStudySetTabLink,
  handleUntitled,
} from "../../../helpers";
import { BinderIcon, StudySetIcon } from "../../../assets";
import { ThemeContext } from "styled-components";

interface FolderBinderCardProps {
  data: BinderInterface | StudyPackInterface;
  type: FILETREE_TYPES;
}

const FolderBinderCard: React.FC<FolderBinderCardProps> = ({ data, type }) => {
  const intl = useIntl();
  const theme = useContext(ThemeContext);

  return (
    <>
      {data ? (
        <NavLink
          to={
            getChildType(type) === FILETREE_TYPES.BINDER
              ? `/${FILETREE_TYPES.BINDER}/${data?.id}`
              : `/${FILETREE_TYPES.STUDY_SET}/${data?.id}/${getStudySetTabLink(
                  data?.id
                )}`
          }
        >
          <ThumbnailCard
            topText={handleUntitled(data?.name, intl)}
            bottomText={`${formatMessage(
              "folderBinders.created",
              intl
            )} June 13th, 2021`}
            thumbnailBackgroundColor={theme.colors.secondary}
            descriptionBackgroundColor={theme.colors.backgrounds.pageBackground}
            backgroundIcon={
              getChildType(type) === FILETREE_TYPES.BINDER ? (
                <BinderIcon color={data.color} size="80px" />
              ) : (
                <StudySetIcon color={data.color} size="80px" />
              )
            }
          />
        </NavLink>
      ) : null}
    </>
  );
};

export default FolderBinderCard;
