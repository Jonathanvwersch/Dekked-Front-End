import React from "react";
import { GeneralModal, H4, Flex, Text, Footer } from "../../common";
import { usePageSetupHelpers } from "../../../hooks";
import { FormattedMessage } from "react-intl";
import { BUTTON_THEME } from "../../../shared";

interface DeleteModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleMainButton: () => void;
  bodyText?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  handleClose,
  bodyText,
  handleMainButton,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const header = (
    <H4>{formatMessage("sharedModals.unsavedChangesModal.header")}</H4>
  );

  const handleButtonClick = async () => {
    await handleClose();
    handleMainButton();
  };

  return (
    <GeneralModal
      isOpen={isOpen}
      header={header}
      handleClose={handleClose}
      footer={
        <Footer
          padding="0px"
          secondaryButton={{ onClick: handleClose }}
          primaryButton={{
            onClick: handleButtonClick,
            style: BUTTON_THEME.PRIMARY,
            text: "sharedModals.unsavedChangesModal.unsavedChanges",
          }}
        />
      }
    >
      <Flex flexDirection="column" justifyContent="center">
        <Text fontSize={theme.typography.fontSizes.size16} textAlign="center">
          {bodyText ? <FormattedMessage id={bodyText} /> : null}
        </Text>
        <Text fontSize={theme.typography.fontSizes.size16}>
          <FormattedMessage id="sharedModals.deleteModal.body" />
        </Text>
      </Flex>
    </GeneralModal>
  );
};

export default DeleteModal;
