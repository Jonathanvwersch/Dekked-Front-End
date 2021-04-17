import React from "react";
import { ThemeContext } from "styled-components/macro";
import { Footer, GeneralModal, H4, VFlex, Text } from "../../common";
import { BUTTON_THEME } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";
import { FormattedMessage } from "react-intl";
import { theme } from "../../../styles/theme";

interface DeleteModalProps {
  isOpen: boolean;
  handleClose: () => void;
  bodyText?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  handleClose,
  bodyText,
}) => {
  const { formatMessage } = usePageSetupHelpers(ThemeContext);

  const header = <H4>{formatMessage("sharedModals.deleteModal.header")}</H4>;

  return (
    <GeneralModal
      isOpen={isOpen}
      header={header}
      handleClose={handleClose}
      footer={
        <Footer
          handleCancel={handleClose}
          handleMainButton={handleClose}
          mainButtonStyle={BUTTON_THEME.DANGER}
          mainButtonText={formatMessage("sharedModals.deleteModal.delete")}
        />
      }
    >
      <VFlex justifyContent="center">
        <Text fontSize={theme.typography.fontSizes.size16}>
          <FormattedMessage id={bodyText} />
        </Text>
        <Text fontSize={theme.typography.fontSizes.size16}>
          <FormattedMessage id={"sharedModals.deleteModal.body"} />
        </Text>
      </VFlex>
    </GeneralModal>
  );
};

export default DeleteModal;
