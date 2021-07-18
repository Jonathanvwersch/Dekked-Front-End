import React, { useContext, useState } from "react";
import { Overlay } from "../../common";
import { MODAL_TYPE, SIZES } from "../../../shared";
import FocusLock, { AutoFocusInside } from "react-focus-lock";

import { StudySetFlashcard } from "../../study-set";
import styled, { ThemeContext } from "styled-components";
import {
  flashcardsAtom,
  isMainFlashcardButtonDisabledAtom,
  layeredModalAtom,
} from "../../../store";
import { useAtom } from "jotai";
import UnsavedChangesModal, {
  unsavedChangesModalPrefix,
} from "../UnsavedChangesModal/UnsavedChangesModal";

interface FlashcardModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  type?: "edit" | "add";
  frontBlocks?: string[];
  backBlocks?: string[];
  blockLink?: string;
  flashcardId?: string;
}

const FlashcardModal: React.FC<FlashcardModalProps> = ({
  frontBlocks,
  backBlocks,
  blockLink,
  flashcardId,
  isOpen,
  setIsOpen,
  type = "add",
}) => {
  const theme = useContext(ThemeContext);

  const [isLayeredModalOpen] = useAtom(layeredModalAtom);
  const [, setFlashcards] = useAtom(flashcardsAtom);
  const [isUnsavedChangesModalOpen, setIsUnsavedChangesModalOpen] =
    useState<boolean>(false);
  const [isMainFlashcardButtonDisabled] = useAtom(
    isMainFlashcardButtonDisabledAtom
  );

  return (
    <>
      <Overlay
        isOpen={isOpen}
        handleClose={() =>
          isMainFlashcardButtonDisabled
            ? setIsOpen(false)
            : setIsUnsavedChangesModalOpen(true)
        }
        center
        type={MODAL_TYPE.MODAL_LIGHTBOX}
        modalWidth="80%"
        modalHeight="60%"
        close
        withOutsideClick={!isLayeredModalOpen}
        closeButtonBackgroundColor={theme.colors.secondary}
      >
        <StyledFocusLock>
          <StyledAutoFocusInside>
            <StudySetFlashcard
              linked={true}
              flashcardId={flashcardId}
              currentBlockKey={blockLink}
              frontBlocks={frontBlocks}
              backBlocks={backBlocks}
              setFlashcards={setFlashcards}
              type={type}
              width="100%"
              vertical
              toolbarSize={SIZES.MEDIUM}
              fullHeight
              closeModal={() => setIsOpen(false)}
            />
          </StyledAutoFocusInside>
        </StyledFocusLock>
      </Overlay>
      <UnsavedChangesModal
        isOpen={isUnsavedChangesModalOpen}
        handleClose={() => {
          isUnsavedChangesModalOpen && setIsUnsavedChangesModalOpen(false);
        }}
        handleMainButton={() => {
          setIsOpen(false);
        }}
        bodyText={
          type === "add"
            ? `${unsavedChangesModalPrefix}.body.addFlashcard`
            : `${unsavedChangesModalPrefix}.body.editFlashcard`
        }
      />
    </>
  );
};

const StyledFocusLock = styled(FocusLock)`
  display: inline;
`;

const StyledAutoFocusInside = styled(AutoFocusInside)`
  display: inline;
`;

export default React.memo(FlashcardModal);
