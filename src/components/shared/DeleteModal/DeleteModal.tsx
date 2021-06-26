import React, { SyntheticEvent } from "react";
import { Footer, GeneralModal, H4, Flex, Text } from "../../common";
import { BUTTON_THEME } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";
import { FormattedMessage } from "react-intl";

interface DeleteModalProps {
  isOpen: boolean;
  handleClose: (args?: any) => void;
  handleMainButton: (args?: any) => void;
  bodyText?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  handleClose,
  bodyText,
  handleMainButton,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const header = <H4>{formatMessage("sharedModals.deleteModal.header")}</H4>;

  const handlePrimaryButton = (e: SyntheticEvent) => {
    e.preventDefault();
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
            onClick: handlePrimaryButton,
            style: BUTTON_THEME.DANGER,
            text: "sharedModals.deleteModal.delete",
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
