import React, { useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { FILETREE_TYPES, TAB_TYPE } from "../../../shared";
import { useIntl } from "react-intl";
import { formatMessage } from "../../../intl";
import { handleUntitled } from "../../../helpers";
import { ThemeContext } from "styled-components";
import { selectStudySetTab } from "../../../store";
import { useAtom } from "jotai";
import { BinderIcon, SIZES, StudySetIcon } from "dekked-design-system";
import { FileCard } from "../../common";

interface FolderBinderCardProps {
  name: string;
  color: string;
  id: string;
  type: FILETREE_TYPES;
  dateModified?: string;
  bottomText?: string;
  size?: SIZES;
  unsetWidth?: boolean;
  studyMode?: boolean;
}

const FolderBinderCard: React.FC<FolderBinderCardProps> = ({
  name,
  color,
  id,
  dateModified,
  bottomText,
  type,
  size,
  unsetWidth,
  studyMode,
}) => {
  const intl = useIntl();
  const theme = useContext(ThemeContext);
  const [studySetTab] = useAtom(useMemo(() => selectStudySetTab(id), [id]));
  var options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(dateModified || "");

  return (
    <NavLink
      to={
        studyMode
          ? `/${FILETREE_TYPES.STUDY_SET}/${id}/study/spaced-repetition`
          : type === FILETREE_TYPES.BINDER
          ? `/${FILETREE_TYPES.BINDER}/${id}`
          : `/${FILETREE_TYPES.STUDY_SET}/${id}/${
              studySetTab || TAB_TYPE.NOTES
            }`
      }
    >
      <FileCard
        topText={handleUntitled(name, intl)}
        bottomText={
          bottomText ||
          `${formatMessage(
            "folderBinders.edited",
            intl
          )} ${date.toLocaleDateString("en-US", options)}`
        }
        thumbnailBackgroundColor={theme.colors.secondary}
        descriptionBackgroundColor={theme.colors.backgrounds.pageBackground}
        icon={
          type === FILETREE_TYPES.BINDER ? (
            <BinderIcon color={color} size="50px" />
          ) : (
            <StudySetIcon color={color} size="50px" />
          )
        }
        size={size}
        unsetWidth={unsetWidth}
      />
    </NavLink>
  );
};

export default React.memo(FolderBinderCard);
