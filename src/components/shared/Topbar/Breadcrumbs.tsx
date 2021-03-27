import React, { useContext } from "react";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { FILETREE_TYPES } from "../../../shared";
import { HFlex } from "../../common";
import Crumb from "./Crumb";

const Breadcrumbs: React.FC = () => {
  const { folderData, binderData, studySetData, type, loading } = useContext(
    SelectedItemContext
  );

  return !loading ? (
    <HFlex>
      <Crumb
        breadCrumbData={folderData}
        breadCrumbType={FILETREE_TYPES.FOLDER}
      />
      {type === FILETREE_TYPES.BINDER || type === FILETREE_TYPES.STUDY_SET ? (
        <Crumb
          breadCrumbData={binderData}
          breadCrumbType={FILETREE_TYPES.BINDER}
        />
      ) : null}
      {type === FILETREE_TYPES.STUDY_SET ? (
        <Crumb
          breadCrumbData={studySetData}
          breadCrumbType={FILETREE_TYPES.STUDY_SET}
        />
      ) : null}
    </HFlex>
  ) : null;
};

export default Breadcrumbs;
