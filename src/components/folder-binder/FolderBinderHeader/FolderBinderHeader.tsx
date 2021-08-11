import React, { useMemo } from "react";
import { PageHeader } from "../../shared";
import { FILETREE_TYPES, Params } from "../../../shared";
import { useIntl } from "react-intl";
import { getPluralOrSingular } from "../../../helpers";
import {
  numberOfChildrenOfBinder,
  numberOfChildrenOfFolder,
  typeAtom,
} from "../../../store";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { Flex } from "dekked-design-system";

const FolderBinderHeader: React.FC = () => {
  const intl = useIntl();
  const { id } = useParams<Params>();
  const [type] = useAtom(typeAtom);
  const [numberOfBinders] = useAtom(
    useMemo(() => numberOfChildrenOfFolder(id), [id])
  );
  const [numberOfStudySets] = useAtom(
    useMemo(() => numberOfChildrenOfBinder(id), [id])
  );

  // Use plural form of item (either binder or study set) if the number of items does not equal 1
  const numberOfItems = (type: FILETREE_TYPES) => {
    if (type === FILETREE_TYPES.FOLDER) {
      return getPluralOrSingular(
        numberOfBinders,
        "folderBinders.numOfBinder",
        "folderBinders.numOfBinders",
        intl
      );
    }

    return getPluralOrSingular(
      numberOfStudySets,
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
