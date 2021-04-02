import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Footer, GeneralModal, Input, Spacer, Text } from "../../common";
import { SIZES } from "../../../shared";

interface ChangePasswordModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <GeneralModal
      isOpen={isOpen}
      handleClose={handleClose}
      footer={<Footer handleCancel={handleClose} mainButtonText="Update" />}
    >
      <Input
        size={SIZES.MEDIUM}
        placeholder="New password"
        type="password"
        label="Password"
      />
      <Spacer height={theme.spacers.size16} />
      <Input
        size={SIZES.MEDIUM}
        placeholder="Repeat new password"
        type="password"
        label="Password"
      />
      <Spacer height={theme.spacers.size8} />
      <Text fontColor={theme.colors.grey2}>
        Your password must be atleast eight characters long.
      </Text>
      <Spacer height={theme.spacers.size32} />
    </GeneralModal>
  );
};

export default ChangePasswordModal;
