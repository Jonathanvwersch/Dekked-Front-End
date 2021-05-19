import { useState } from "react";
import { config } from "../../config";

export function useFlashcards() {
  const [flashcards, setFlashcards] =
    useState<FlashcardInterface[] | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  async function getFlashcards(studyPackId: string) {
    try {
      const uri =
        config.api + `/get-flashcards-by-study-pack-id/${studyPackId}`;
      const response = await fetch(uri, {
        headers: {
          Authorization: `Bearer ${config.authToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          setFlashcards(json.data.flashcards);
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
          study_pack_id: study_pack_id,
          owner_id: owner_id,
          block_link: block_link,
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

  const saveFlashcard = async ({
    front_blocks,
    front_draft_keys,
    back_blocks,
    back_draft_keys,
    id,
  }: {
    front_blocks: string[];
    front_draft_keys: string[];
    back_blocks: string[];
    back_draft_keys: string[];
    id: string | undefined;
  }) => {
    const url = config.api + `/flashcard/${id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.authToken}`,
        },
        body: JSON.stringify({
          front_blocks,
          front_draft_keys,
          back_blocks,
          back_draft_keys,
        }),
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  };

  return {
    getFlashcards,
    addFlashcard,
    saveFlashcard,
    flashcardsIsError: isError,
    flashcards,
  };
}
