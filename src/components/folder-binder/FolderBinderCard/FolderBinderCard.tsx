import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FILETREE_TYPES, TAB_TYPE } from "../../../shared";
import { ThumbnailCard } from "../../common";
import { useIntl } from "react-intl";
import { formatMessage } from "../../../intl";
import { getChildType, handleUntitled } from "../../../helpers";
import { BinderIcon, StudySetIcon } from "../../../assets";
import { ThemeContext } from "styled-components";
import { studySetsAtom } from "../../../store";
import { useAtom } from "jotai";

interface FolderBinderCardProps {
  data: FileInterface;
  type: FILETREE_TYPES;
}

const FolderBinderCard: React.FC<FolderBinderCardProps> = ({ data, type }) => {
  const intl = useIntl();
  const theme = useContext(ThemeContext);
  const [studySetTab] = useAtom(studySetsAtom);
  const tab =
    typeof studySetTab?.[data?.id] === "string"
      ? studySetTab?.[data?.id]
      : TAB_TYPE.NOTES;

  return (
    <>
      {data ? (
        <NavLink
          to={
            getChildType(type) === FILETREE_TYPES.BINDER
              ? `/${FILETREE_TYPES.BINDER}/${data?.id}`
              : `/${FILETREE_TYPES.STUDY_SET}/${data?.id}/${tab}`
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
