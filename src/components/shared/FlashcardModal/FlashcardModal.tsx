import React, { useContext, useState } from "react";
import { MODAL_TYPE, SIZES, STUDY_MODE_TYPES } from "../../../shared";
import FocusLock, { AutoFocusInside } from "react-focus-lock";

import { StudySetFlashcard } from "../../study-set";
import styled, { ThemeContext } from "styled-components";
import {
  flashcardsAtom,
  isMainFlashcardButtonDisabledAtom,
  layeredModalAtom,
  srFlashcardsAtom,
} from "../../../store";
import { useAtom } from "jotai";
import UnsavedChangesModal, {
  unsavedChangesModalPrefix,
} from "../UnsavedChangesModal/UnsavedChangesModal";
import { Overlay } from "dekked-design-system";

interface FlashcardModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  type?: "edit" | "add";
  frontBlocks?: string[];
  backBlocks?: string[];
  blockLink?: string;
  flashcardId?: string;
  studyMode?: STUDY_MODE_TYPES;
}

const FlashcardModal: React.FC<FlashcardModalProps> = ({
  frontBlocks,
  backBlocks,
  blockLink,
  flashcardId,
  isOpen,
  setIsOpen,
  type = "add",
  studyMode,
}) => {
  const theme = useContext(ThemeContext);

  const [isLayeredModalOpen] = useAtom(layeredModalAtom);
  const [, setFlashcards] = useAtom(flashcardsAtom);
  const [, setSrFlashcards] = useAtom(srFlashcardsAtom);
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
              setFlashcards={
                studyMode === STUDY_MODE_TYPES.FREE_STUDY
                  ? setFlashcards
                  : setSrFlashcards
              }
              type={type}
              width="100%"
              vertical
              studyMode={studyMode}
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
