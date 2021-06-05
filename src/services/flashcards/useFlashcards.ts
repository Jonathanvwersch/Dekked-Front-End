import { useEffect, useState } from "react";
import { useIsMutating, useQuery } from "react-query";
import { getFlashcards } from "./flashcards-api";
import { useParams } from "react-router-dom";
import { FILETREE_TYPES, Params } from "../../shared";

export default function useFlashcards(studyPackId: string) {
  const [isMutating, setIsMutating] = useState<number>(0);
  const { type } = useParams<Params>();
  const isAdding = useIsMutating({
    mutationKey: `${studyPackId}-add-flashcard`,
  });

  const isDeleting = useIsMutating({
    mutationKey: `${studyPackId}-delete-flashcard`,
  });

  const isSaving = useIsMutating({
    mutationKey: `${studyPackId}-save-flashcard`,
  });

  useEffect(() => {
    setIsMutating(isAdding);
  }, [isAdding]);

  useEffect(() => {
    setIsMutating(isDeleting);
  }, [isDeleting]);

  useEffect(() => {
    setIsMutating(isSaving);
  }, [isSaving]);

  return useQuery(
    `${studyPackId}-get-flashcards`,
    () => getFlashcards({ studyPackId }),
    {
      enabled: type === FILETREE_TYPES.STUDY_SET && isMutating === 0,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
}
