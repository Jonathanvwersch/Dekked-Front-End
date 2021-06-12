import React, { useContext } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { StudyModeIcon } from "../../../assets";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { FILETREE_TYPES, Params } from "../../../shared";
import { Flex } from "../../common";
import Crumb from "./Crumb";
import { useIntl } from "react-intl";
import { formatMessage } from "../../../intl";
import { getStudySetTabLink } from "../../../helpers";

const Breadcrumbs: React.FC = () => {
  const { folderData, binderData, studySetData, type, loading } =
    useContext(SelectedItemContext);
  const { studyModes } = useParams<Params>();
  const { url } = useRouteMatch();
  const intl = useIntl();

  return !loading ? (
    <Flex>
      {folderData && (
        <Crumb
          breadCrumbData={folderData}
          breadCrumbType={FILETREE_TYPES.FOLDER}
          link={`/${FILETREE_TYPES.FOLDER}/${folderData.id}`}
        />
      )}
      {type !== FILETREE_TYPES.FOLDER && binderData ? (
        <Crumb
          breadCrumbData={binderData}
          breadCrumbType={FILETREE_TYPES.BINDER}
          link={`/${FILETREE_TYPES.BINDER}/${binderData.id}`}
        />
      ) : null}
      {type === FILETREE_TYPES.STUDY_SET && studySetData ? (
        <Crumb
          breadCrumbData={studySetData}
          breadCrumbType={FILETREE_TYPES.STUDY_SET}
          link={`/${FILETREE_TYPES.STUDY_SET}/${
            studySetData.id
          }/${getStudySetTabLink(studySetData?.id)}`}
        />
      ) : null}
      {studyModes ? (
        <Crumb
          icon={<StudyModeIcon />}
          name={formatMessage("breadCrumbs.studyMode", intl)}
          link={url}
        />
      ) : null}
    </Flex>
  ) : null;
};

export default Breadcrumbs;
