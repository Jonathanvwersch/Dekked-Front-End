import React, { useContext, useMemo } from "react";
import { PageHeader } from "../../shared";
import { FILETREE_TYPES, Params } from "../../../shared";
import { FormattedMessage, useIntl } from "react-intl";
import { getPluralOrSingular, useAddAsset } from "../../../helpers";
import {
  bindersAtom,
  numberOfChildrenOfBinder,
  numberOfChildrenOfFolder,
} from "../../../store";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { Button, BUTTON_THEME, Flex, SIZES } from "dekked-design-system";
import styled, { ThemeContext } from "styled-components";

const FolderBinderHeader: React.FC = () => {
  const intl = useIntl();
  const { id, type } = useParams<Params>();
  const theme = useContext(ThemeContext);
  const { addAsset } = useAddAsset();
  const [numberOfBinders] = useAtom(
    useMemo(() => numberOfChildrenOfFolder(id), [id])
  );
  const [numberOfStudySets] = useAtom(
    useMemo(() => numberOfChildrenOfBinder(id), [id])
  );
  const [binders] = useAtom(bindersAtom);
  const folderId = binders?.[id]?.folder_id;

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

  const handleAddItem = () => {
    if (type === FILETREE_TYPES.FOLDER) {
      addAsset(FILETREE_TYPES.BINDER, id);
    } else addAsset(FILETREE_TYPES.STUDY_SET, folderId, id);
  };

  return (
    <Flex flexDirection="column" alignItems="flex-start">
      <AddButtonContainer mt={theme.spacers.size32}>
        <Button
          buttonStyle={BUTTON_THEME.SECONDARY}
          handleClick={handleAddItem}
        >
          <FormattedMessage
            id={
              type === FILETREE_TYPES.FOLDER
                ? "ariaLabels.addBinder"
                : "ariaLabels.addStudySet"
            }
          />
        </Button>
      </AddButtonContainer>
      <PageHeader message={numberOfItems(type)} />
    </Flex>
  );
};

export const AddButtonContainer = styled(Flex)`
  position: sticky;
  margin-top: ${({ theme }) => theme.spacers.size32};
  width: 100%;
  top: 0;
  max-width: ${({ theme }) => theme.sizes.wrappers[SIZES.MEDIUM]};
  padding: ${({ theme }) => theme.spacers.size16} 0px;
  background: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  height: ${({ theme }) => theme.spacers.size64};
  z-index: 100;
`;

export default FolderBinderHeader;
