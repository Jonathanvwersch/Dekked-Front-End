import React, { useContext, useEffect } from "react";
import { Overlay } from "../../common";
import { MODAL_TYPE, Params, SIZES } from "../../../shared";

import { useParams } from "react-router-dom";

import { StudySetFlashcard } from "../../study-set";
import { useIsMutating } from "react-query";
import { LayeredModalContext } from "../../../contexts";

interface FlashcardModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  type?: "edit" | "add";
  frontBlocks?: string[];
  backBlocks?: string[];
  blockLink?: string;
  flashcardId?: string;
  ownerId?: string;
}

const FlashcardModal: React.FC<FlashcardModalProps> = ({
  frontBlocks,
  backBlocks,
  blockLink,
  flashcardId,
  ownerId,
  isOpen,
  setIsOpen,
  type = "add",
}) => {
  const { id } = useParams<Params>();
  const isSaving = useIsMutating({
    mutationKey: `${id}-save-flashcard`,
  });
  const { isLayeredModalOpen } = useContext(LayeredModalContext);

  useEffect(() => {
    if (!isSaving) {
      setIsOpen(false);
    }
  }, [isSaving, setIsOpen]);

  return (
    <Overlay
      isOpen={isOpen}
      handleClose={() => setIsOpen(false)}
      center
      type={MODAL_TYPE.MODAL_LIGHTBOX}
      modalWidth="80%"
      modalHeight="60%"
      close
      withOutsideClick={!isLayeredModalOpen}
    >
      <StudySetFlashcard
        ownerId={ownerId}
        studyPackId={id}
        linked={true}
        flashcardId={flashcardId}
        currentBlockKey={blockLink}
        frontBlocks={frontBlocks}
        backBlocks={backBlocks}
        type={type}
        width="100%"
        vertical
        toolbarSize={SIZES.MEDIUM}
        fullHeight
      />
    </Overlay>
  );
};

export default React.memo(FlashcardModal);