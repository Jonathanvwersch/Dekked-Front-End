import React, { useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { FILETREE_TYPES, TAB_TYPE } from "../../../shared";
import { ThumbnailCard } from "../../common";
import { useIntl } from "react-intl";
import { formatMessage } from "../../../intl";
import { getChildType, handleUntitled } from "../../../helpers";
import { BinderIcon, StudySetIcon } from "../../../assets";
import { ThemeContext } from "styled-components";
import { selectStudySetTab } from "../../../store";
import { useAtom } from "jotai";

interface FolderBinderCardProps {
  data: FileInterface;
  type: FILETREE_TYPES;
}

const FolderBinderCard: React.FC<FolderBinderCardProps> = ({ data, type }) => {
  const intl = useIntl();
  const theme = useContext(ThemeContext);
  const [studySetTab] = useAtom(
    useMemo(() => selectStudySetTab(data?.id), [data?.id])
  );
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(data?.date_created || "");

  return (
    <>
      {data ? (
        <NavLink
          to={
            getChildType(type) === FILETREE_TYPES.BINDER
              ? `/${FILETREE_TYPES.BINDER}/${data?.id}`
              : `/${FILETREE_TYPES.STUDY_SET}/${data?.id}/${
                  studySetTab || TAB_TYPE.NOTES
                }`
          }
        >
          <ThumbnailCard
            topText={handleUntitled(data?.name, intl)}
            bottomText={`${formatMessage(
              "folderBinders.created",
              intl
            )} ${date.toLocaleDateString("en-US", options)}`}
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
