import { useState } from "react";
import { config } from "../../config";

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState<FlashcardInterface>();
  const [isError, setIsError] = useState(false);

  async function getFlashcards(studyPackId: string) {
    try {
      const uri =
        config.api + `/get-flashcards-by-study-pack-id/${studyPackId}`;
      console.log(uri);
      const response = await fetch(uri, {
        headers: {
          Authorization: `Bearer ${config.authToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          console.log(json.data);
          setFlashcards(json.data.folders);
          return;
        }
      }

      throw Error("There was an error getting flashcards");
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }

  async function addFlashcard(
    owner_id: string,
    study_pack_id: string,
    block_link?: string
  ) {
    try {
      const uri = config.api + "/flashcard";
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.authToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          owner_id,
          study_pack_id,
          block_link,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          getFlashcards(study_pack_id);
          return;
        }
      }
      throw Error("There was an error adding flashcards");
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }

  return {
    getFlashcards,
    addFlashcard,
    flashcardsIsError: isError,
    flashcards,
  };
}
