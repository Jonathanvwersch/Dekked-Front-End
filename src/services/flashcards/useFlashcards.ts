import { useEffect } from "react";
import { useIsMutating, useQuery } from "react-query";
import { getFlashcards } from "./flashcards-api";
import { useAtom } from "jotai";
import { flashcardsAtom } from "../../store";
import { useParams } from "react-router-dom";
import { Params } from "../../shared";

export default function useFlashcards() {
  const { id: studyPackId } = useParams<Params>();
  const [flashcards, setFlashcards] = useAtom(flashcardsAtom);
  const isAdding = useIsMutating({
    mutationKey: `${studyPackId}-add-flashcard`,
  });

  const { data, isLoading } = useQuery(
    `${studyPackId}-get-flashcards`,
    () => getFlashcards({ studyPackId }),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    setFlashcards(data);
  }, [data, setFlashcards]);

  return { flashcards, isLoading, isAdding, setFlashcards };
}
