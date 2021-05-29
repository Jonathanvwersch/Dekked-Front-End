import { useEffect, useState } from "react";
import { useIsMutating, useQuery } from "react-query";
import { getFlashcards } from "./flashcards-api";

export default function useFlashcards(
  studyPackId: string,
  includeSaving?: boolean,
  type?: string
) {
  const [isMutating, setIsMutating] = useState<number>(0);
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
    includeSaving && setIsMutating(isSaving);
  }, [isSaving, includeSaving]);

  return useQuery(
    `${studyPackId}-get-flashcards`,
    () => getFlashcards(studyPackId),
    { enabled: isMutating === 0 }
  );
}
