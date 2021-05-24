import React, { useContext } from "react";
import { PageHeader } from "../../shared";
import { Flex } from "../../common";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { FILETREE_TYPES } from "../../../shared";
import { useIntl } from "react-intl";
import { getPluralOrSingular } from "../../../helpers";

const FolderBinderHeader: React.FC = () => {
  const intl = useIntl();

  const { type, numOfBinders, numOfStudySets } =
    useContext(SelectedItemContext);

  // Use plural form of item (either binder or study set) if the number of items does not equal 1
  const numberOfItems = (type: FILETREE_TYPES) => {
    if (type === FILETREE_TYPES.FOLDER) {
      return getPluralOrSingular(
        numOfBinders,
        "folderBinders.numOfBinder",
        "folderBinders.numOfBinders",
        intl
      );
    }

    return getPluralOrSingular(
      numOfStudySets,
      "folderBinders.numOfStudySet",
      "folderBinders.numOfStudySets",
      intl
    );
  };

  return (
    <Flex flexDirection="column">
      <PageHeader message={numberOfItems(type)}></PageHeader>
    </Flex>
  );
};

export default FolderBinderHeader;
