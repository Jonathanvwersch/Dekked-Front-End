import React, { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { BinderPage, FolderPage, StudyModePage, StudySetPage } from "..";
import { Sidebar } from "../../components/shared/Sidebar";
import { FILETREE_TYPES, Params } from "../../shared";
import CustomSwitch from "../../Router/CustomSwitch";
import PrivateRoute from "../../Router/PrivateRoute";
import { useAtom } from "jotai";

import { isAppLoadingAtom, typeAtom } from "../../store";

import { FullPageLoadingSpinner } from "dekked-design-system";

const OptionsPage: React.FC = () => {
  const { type } = useParams<Params>();
  const [, setType] = useAtom(typeAtom);
  const [isLoading] = useAtom(isAppLoadingAtom);

  useLayoutEffect(() => {
    setType(type);
  }, [type, setType]);

  return (
    <>
      {!isLoading ? (
        <>
          <Sidebar />
          <CustomSwitch>
            <PrivateRoute
              exact
              path={`/${FILETREE_TYPES.FOLDER}/:id`}
              component={FolderPage}
            />
            <PrivateRoute
              path={`/${FILETREE_TYPES.BINDER}/:id`}
              component={BinderPage}
            />
            <PrivateRoute
              exact
              path={`/${FILETREE_TYPES.STUDY_SET}/:id/:tab`}
              component={StudySetPage}
            />
            <PrivateRoute
              path={`/:type/:id/study/:studyModes`}
              component={StudyModePage}
            />
          </CustomSwitch>
        </>
      ) : (
        <FullPageLoadingSpinner />
      )}
    </>
  );
};

export default OptionsPage;
