import React, { SyntheticEvent } from "react";
import { Footer, GeneralModal, H4, Flex, Text } from "../../common";
import { BUTTON_THEME } from "../../../shared";
import { useLayeredModal, usePageSetupHelpers } from "../../../hooks";
import { FormattedMessage } from "react-intl";

export const unsavedChangesModalPrefix = "sharedModals.unsavedChangesModal";

interface UnsavedChangesModalProps {
  isOpen: boolean;
  handleClose: (args?: any) => void;
  handleMainButton: (args?: any) => void;
  bodyText?: string;
}

const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({
  isOpen,
  handleClose,
  bodyText,
  handleMainButton,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const header = (
    <H4>{formatMessage(`${unsavedChangesModalPrefix}.header`)}</H4>
  );

  const handlePrimaryButton = (e: SyntheticEvent) => {
    e.preventDefault();
    handleMainButton();
    handleClose();
  };

  useLayeredModal(isOpen);

  return (
    <GeneralModal
      isOpen={isOpen}
      header={header}
      handleClose={handleClose}
      id="UnsavedChangedModal"
      footer={
        <Footer
          padding="0px"
          secondaryButton={{
            onClick: handleClose,
            text: `${unsavedChangesModalPrefix}.keepEditing`,
          }}
          primaryButton={{
            onClick: handlePrimaryButton,
            style: BUTTON_THEME.DANGER,
            text: `${unsavedChangesModalPrefix}.discardChanges`,
          }}
        />
      }
    >
      <Flex flexDirection="column" justifyContent="center">
        <Text fontSize={theme.typography.fontSizes.size16} textAlign="center">
          {bodyText ? <FormattedMessage id={bodyText} /> : null}
        </Text>
        <Text fontSize={theme.typography.fontSizes.size16}>
          <FormattedMessage id={`${unsavedChangesModalPrefix}.body.default`} />
        </Text>
      </Flex>
    </GeneralModal>
  );
};

export default UnsavedChangesModal;
