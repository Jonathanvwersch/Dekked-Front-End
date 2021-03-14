import React, { useContext } from "react";
import { PageHeader } from "../../shared";
import { VFlex } from "../../common";
import { FILETREE_TYPES } from "../../../contexts/FileTreeContext";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";

const FolderBinderHeader: React.FC = () => {
  const { type, numOfBinders, numOfStudySets } = useContext(
    SelectedItemContext
  );

  // Use plural form of item (either binder or study set) if the number of items does not equal 1
  const numberOfItems = (type: FILETREE_TYPES) => {
    if (type === FILETREE_TYPES.FOLDER)
      if (numOfBinders! !== 1) {
        return `${numOfBinders} binders`;
      } else return `${numOfBinders} binder`;
    else if (numOfStudySets! !== 1) {
      return `${numOfStudySets} study sets`;
    } else return `${numOfStudySets} study set`;
  };

  return (
    <VFlex>
      <PageHeader message={numberOfItems(type)}></PageHeader>
    </VFlex>
  );
};

export default FolderBinderHeader;
