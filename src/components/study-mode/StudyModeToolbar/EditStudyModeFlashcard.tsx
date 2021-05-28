import React, { useEffect } from "react";
import { Overlay } from "../../common";
import { MODAL_TYPE, Params, SIZES } from "../../../shared";

import { useParams } from "react-router-dom";

import { StudySetFlashcard } from "../../study-set";
import { useIsMutating } from "react-query";

interface EditStudyModeFlashcardProps {
  frontBlocks?: string[];
  backBlocks?: string[];
  blockLink?: string;
  flashcardId?: string;
  ownerId?: string;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  isEditable: boolean;
}

const EditStudyModeFlashcard: React.FC<EditStudyModeFlashcardProps> = ({
  frontBlocks,
  backBlocks,
  blockLink,
  flashcardId,
  ownerId,
  isEditable,
  setIsEditable,
}) => {
  const { id } = useParams<Params>();
  const isSaving = useIsMutating({
    mutationKey: `${id}-save-flashcard`,
  });

  useEffect(() => {
    if (isSaving) {
      setIsEditable(false);
    }
  }, [isSaving]);

  return (
    <Overlay
      isOpen={isEditable}
      handleClose={() => setIsEditable(false)}
      center
      type={MODAL_TYPE.MODAL_LIGHTBOX}
      modalWidth="80%"
      close
    >
      <StudySetFlashcard
        ownerId={ownerId}
        studyPackId={id}
        linked={true}
        flashcardId={flashcardId}
        currentBlockKey={blockLink}
        frontBlocks={frontBlocks}
        backBlocks={backBlocks}
        vertical
        withSave
        width="100%"
        toolbarSize={SIZES.MEDIUM}
      />
    </Overlay>
  );
};

export default EditStudyModeFlashcard;
