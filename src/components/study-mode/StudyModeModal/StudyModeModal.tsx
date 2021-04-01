import React from "react";
import { GeneralModal, H4 } from "../../common";
import { MODAL_FOOTER_TYPE } from "../../common/Modals/GeneralModal";

interface StudyModeModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const StudyModeModal: React.FC<StudyModeModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const header = <H4>Choose your study mode</H4>;

  return (
    <GeneralModal
      isOpen={isOpen}
      header={header}
      handleClose={handleClose}
      footerType={MODAL_FOOTER_TYPE.PRIMARY}
    ></GeneralModal>
  );
};

export default StudyModeModal;
