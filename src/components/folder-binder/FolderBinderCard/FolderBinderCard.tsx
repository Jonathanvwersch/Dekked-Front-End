import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { handleUntitled } from "../../../helpers/handleUntitled";
import { FILETREE_TYPES } from "../../../shared";
import { ThumbnailCard } from "../../common";
import { useIntl } from "react-intl";
import { formatMessage } from "../../../intl";
import { getChildType, handleIconType } from "../../../helpers";
import { SidebarContext } from "../../../contexts";

interface FolderBinderCardProps {
  data: BinderInterface | StudyPackInterface;
  type: FILETREE_TYPES;
}

const FolderBinderCard: React.FC<FolderBinderCardProps> = ({ data, type }) => {
  const intl = useIntl();
  const { studySetTabLink } = useContext(SidebarContext);

  return (
    <>
      {data ? (
        <NavLink
          to={
            getChildType(type) === FILETREE_TYPES.BINDER
              ? `/${FILETREE_TYPES.BINDER}/${data?.id}`
              : `/${FILETREE_TYPES.STUDY_SET}/${data?.id}/${studySetTabLink(
                  data?.id
                )}`
          }
        >
          <ThumbnailCard
            topText={handleUntitled(data?.name, intl)}
            bottomText={`${formatMessage("folderBinders.created", intl)} ${
              data?.date_created
            }`}
            icon={handleIconType(getChildType(type), data?.color)}
          />
        </NavLink>
      ) : null}
    </>
  );
};

export default FolderBinderCard;
