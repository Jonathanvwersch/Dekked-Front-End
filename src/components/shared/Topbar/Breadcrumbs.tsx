import React, { useMemo } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { StudyModeIcon } from "../../../assets";
import { FILETREE_TYPES, Params, TAB_TYPE } from "../../../shared";
import { Flex } from "../../common";
import Crumb from "./Crumb";
import { useIntl } from "react-intl";
import { formatMessage } from "../../../intl";
import {
  getActiveBinder,
  getActiveFolder,
  getActiveStudySet,
  isAppLoadingAtom,
  studySetTabAtom,
  typeAtom,
} from "../../../store";
import { useAtom } from "jotai";

const Breadcrumbs: React.FC = () => {
  const [type] = useAtom(typeAtom);
  const [loading] = useAtom(isAppLoadingAtom);
  const { studyModes, id } = useParams<Params>();
  const [studySetTab] = useAtom(studySetTabAtom);
  const { url } = useRouteMatch();
  const intl = useIntl();
  const [folderData] = useAtom(
    useMemo(() => getActiveFolder(id, type), [id, type])
  );
  const [binderData] = useAtom(
    useMemo(() => getActiveBinder(id, type), [id, type])
  );
  const [studySetData] = useAtom(
    useMemo(() => getActiveStudySet(id, type), [id, type])
  );

  console.log(folderData);
  console.log(binderData);
  console.log(studySetData);
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
          link={`/${FILETREE_TYPES.STUDY_SET}/${studySetData.id}/${
            studySetTab[studySetData?.id] || TAB_TYPE.NOTES
          }`}
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
