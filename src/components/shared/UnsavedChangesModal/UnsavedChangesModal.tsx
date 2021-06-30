import React, { SyntheticEvent, useEffect } from "react";
import { Footer, GeneralModal, H4, Flex, Text } from "../../common";
import { BUTTON_THEME } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";
import { FormattedMessage } from "react-intl";
import { useAtom } from "jotai";
import { layeredModalAtom } from "../../../store";

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

  const [, setIsLayeredModalOpen] = useAtom(layeredModalAtom);

  useEffect(() => {
    setIsLayeredModalOpen(true);
    !isOpen && setIsLayeredModalOpen(false);
  }, [isOpen, setIsLayeredModalOpen]);

  return (
    <GeneralModal
      isOpen={isOpen}
      header={header}
      handleClose={handleClose}
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
