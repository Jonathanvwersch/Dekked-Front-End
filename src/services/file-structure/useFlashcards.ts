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
        console.log(json.data);
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
    block_link?: string,
    front_blocks?: string[],
    front_draft_keys?: string[],
    back_blocks?: string[],
    back_draft_keys?: string[]
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
          front_blocks: front_blocks,
          front_draft_keys: front_draft_keys,
          back_blocks: back_blocks,
          back_draft_keys: back_draft_keys,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          // there is no need to make a get request for linked flashcards
          !block_link && getFlashcards(study_pack_id);
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
    flash_card_id,
    owner_id,
  }: {
    front_blocks: string[];
    front_draft_keys: string[];
    back_blocks: string[];
    back_draft_keys: string[];
    flash_card_id: string | undefined;
    owner_id: string | undefined;
  }) => {
    const url = config.api + `/flashcard/${flash_card_id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.authToken}`,
        },
        body: JSON.stringify({
          flash_card_id,
          owner_id,
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

  async function deleteFlashcard(flashcard_id: string, study_pack_id: string) {
    try {
      const uri = config.api + `/flashcard/${flashcard_id}`;
      const response = await fetch(uri, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${config.authToken}`,
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          getFlashcards(study_pack_id);
          return;
        }
      }
      throw Error("There was an error deleting the flashcard");
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getFlashcards,
    addFlashcard,
    saveFlashcard,
    flashcardsIsError: isError,
    flashcards,
    deleteFlashcard,
  };
}
