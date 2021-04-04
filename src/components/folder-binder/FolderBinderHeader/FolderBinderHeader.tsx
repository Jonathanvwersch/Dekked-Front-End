import React, { useContext } from "react";
import { PageHeader } from "../../shared";
import { VFlex } from "../../common";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { FILETREE_TYPES } from "../../../shared";
import { useIntl } from "react-intl";
import { formatMessage } from "../../../intl";

const FolderBinderHeader: React.FC = () => {
  const intl = useIntl();

  const { type, numOfBinders, numOfStudySets } = useContext(
    SelectedItemContext
  );

  // Use plural form of item (either binder or study set) if the number of items does not equal 1
  const numberOfItems = (type: FILETREE_TYPES) => {
    if (type === FILETREE_TYPES.FOLDER) {
      if (numOfBinders !== 1) {
        return `${numOfBinders} ${formatMessage(
          "folderBinders.binders",
          intl
        )}`;
      } else
        return `${numOfBinders} ${formatMessage("folderBinders.binder", intl)}`;
    }
    if (type === FILETREE_TYPES.BINDER) {
      if (numOfStudySets !== 1) {
        return `${numOfStudySets} ${formatMessage(
          "folderBinders.studySets",
          intl
        )}`;
      } else
        return `${numOfStudySets} ${formatMessage(
          "folderBinders.studySet",
          intl
        )}`;
    }
    return;
  };

  return (
    <VFlex>
      <PageHeader message={numberOfItems(type)}></PageHeader>
    </VFlex>
  );
};

export default FolderBinderHeader;
