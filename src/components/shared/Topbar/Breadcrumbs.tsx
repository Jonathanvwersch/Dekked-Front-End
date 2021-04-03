import React, { useContext } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { StudyModeIcon } from "../../../assets";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { FILETREE_TYPES, Params, TAB_TYPE } from "../../../shared";
import { HFlex } from "../../common";
import Crumb from "./Crumb";

const Breadcrumbs: React.FC = () => {
  const { folderData, binderData, studySetData, type, loading } = useContext(
    SelectedItemContext
  );
  const { studyModes } = useParams<Params>();
  const { url } = useRouteMatch();

  return !loading ? (
    <HFlex>
      <Crumb
        breadCrumbData={folderData}
        breadCrumbType={FILETREE_TYPES.FOLDER}
        link={`/${FILETREE_TYPES.FOLDER}/${folderData?.id}`}
      />
      {type === FILETREE_TYPES.BINDER || type === FILETREE_TYPES.STUDY_SET ? (
        <Crumb
          breadCrumbData={binderData}
          breadCrumbType={FILETREE_TYPES.BINDER}
          link={`/${FILETREE_TYPES.BINDER}/${binderData?.id}`}
        />
      ) : null}
      {type === FILETREE_TYPES.STUDY_SET ? (
        <Crumb
          breadCrumbData={studySetData}
          breadCrumbType={FILETREE_TYPES.STUDY_SET}
          link={`/${FILETREE_TYPES.STUDY_SET}/${studySetData?.id}/${TAB_TYPE.NOTES}`}
        />
      ) : null}
      {studyModes ? (
        <Crumb icon={<StudyModeIcon />} name="Study mode" link={url} />
      ) : null}
    </HFlex>
  ) : null;
};

export default Breadcrumbs;
