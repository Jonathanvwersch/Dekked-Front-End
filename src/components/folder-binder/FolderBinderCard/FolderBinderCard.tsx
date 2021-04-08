import React from "react";
import { NavLink } from "react-router-dom";
import { handleUntitled } from "../../../helpers/handleUntitled";
import { FILETREE_TYPES, TAB_TYPE } from "../../../shared";
import { ThumbnailCard } from "../../common";
import { useIntl } from "react-intl";
import { formatMessage } from "../../../intl";
import { handleIconType } from "../../../helpers";

interface FolderBinderCardProps {
  data: BinderInterface | StudyPackInterface;
  type: FILETREE_TYPES;
}

const FolderBinderCard: React.FC<FolderBinderCardProps> = ({ data, type }) => {
  const intl = useIntl();

  const childType =
    type === FILETREE_TYPES.FOLDER
      ? FILETREE_TYPES.BINDER
      : FILETREE_TYPES.STUDY_SET;

  return (
    <>
      {data ? (
        <NavLink
          to={
            childType === FILETREE_TYPES.BINDER
              ? `/${childType}/${data?.id}`
              : `/${childType}/${data?.id}/${TAB_TYPE.NOTES}`
          }
        >
          <ThumbnailCard
            topText={handleUntitled(data?.name, intl)}
            bottomText={`${formatMessage("folderBinders.created", intl)} ${
              data?.date_created
            }`}
            icon={handleIconType(childType, data?.color)}
          />
        </NavLink>
      ) : null}
    </>
  );
};

export default FolderBinderCard;
