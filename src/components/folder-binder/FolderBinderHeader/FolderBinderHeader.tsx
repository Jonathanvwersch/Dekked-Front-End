import React from "react";
import { PageHeader } from "../../shared";
import { Flex } from "../../common";
import { FILETREE_TYPES } from "../../../shared";
import { useIntl } from "react-intl";
import { getPluralOrSingular } from "../../../helpers";
import { bindersAtom, studySetsAtom, typeAtom } from "../../../store";
import { useAtom } from "jotai";

const FolderBinderHeader: React.FC = () => {
  const intl = useIntl();
  const [type] = useAtom(typeAtom);
  const [binders] = useAtom(bindersAtom);
  const [studySets] = useAtom(studySetsAtom);
  const numOfBinders = binders ? Object.keys(binders).length : 0;
  const numOfStudySets = studySets ? Object.keys(studySets).length : 0;

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
