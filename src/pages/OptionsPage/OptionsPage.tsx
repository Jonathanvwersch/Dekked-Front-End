import React, { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { BinderPage, FolderPage, StudyModePage, StudySetPage } from "..";
import { SelectedItemContextProvider } from "../../contexts/SelectedItemContext";
import { Sidebar } from "../../components/shared/Sidebar";
import { FILETREE_TYPES, Params } from "../../shared";
import CustomSwitch from "../../Router/CustomSwitch";
import { FlashcardsContextProvider } from "../../contexts/FlashcardsContext";
import { LayeredModalContextProvider } from "../../contexts/LayeredModalContext";
import PrivateRoute from "../../Router/PrivateRoute";
import { useAtom } from "jotai";

import { typeAtom } from "../../store";
import { differenceInObjects } from "../../helpers";
import { isEmpty } from "lodash";

const OptionsPage: React.FC = () => {
  const { type } = useParams<Params>();
  const [, setType] = useAtom(typeAtom);

  useLayoutEffect(() => {
    setType(type);
  }, [type, setType]);

  return (
    <SelectedItemContextProvider>
      <FlashcardsContextProvider>
        <LayeredModalContextProvider>
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
              exact
              path={`/:type/:id/study/:studyModes/:flashcardIndex`}
              component={StudyModePage}
            />
          </CustomSwitch>
        </LayeredModalContextProvider>
      </FlashcardsContextProvider>
    </SelectedItemContextProvider>
  );
};

export default React.memo(OptionsPage, (prevProps, newProps) => {
  return isEmpty(differenceInObjects(newProps, prevProps));
});
