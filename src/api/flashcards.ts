import { EditorState } from "draft-js";
import { createKeysAndBlocks } from "../components/notetaking/Editor/Editor.helpers";
import { FlashcardLearningStatus, FlashcardQuality } from "../shared";
import { del, get, patch, post } from "./utils";
import { AxiosResponse } from "axios";

export const getDeckByStudySetId = async ({
  studySetId,
}: {
  studySetId: string;
}): Promise<DeckInterface> => {
  const response: AxiosResponse<DeckInterface> = await get({
    apiUrl: `/get-deck-by-study-set-id/${studySetId}`,
    errorMessage: "There was an error getting the deck by study set id",
  });

  return response.data;
};

export const getAllDueSrDecks = async (): Promise<DueSpacedRepetitionDecks> => {
  const response: AxiosResponse<DueSpacedRepetitionDecks> = await get({
    apiUrl: `/get-all-due-sr-decks`,
    errorMessage:
      "There was an error getting all of the due spaced repetition decks",
  });
  return response.data;
};

export const getFlashcardsByDeckId = async ({
  deckId,
}: {
  deckId?: string;
}): Promise<FlashcardInterface[]> => {
  const response: AxiosResponse<FlashcardInterface[]> = await get({
    apiUrl: `/get-flashcards-by-deck-id/${deckId}`,
    errorMessage: "There was an error getting the deck by deck id",
  });

  return response.data;
};

export const getSpacedRepetitionFlashcardsByDeckId = async ({
  deckId,
}: {
  deckId: string;
}): Promise<FlashcardInterface[]> => {
  const response: AxiosResponse<FlashcardInterface[]> = await get({
    apiUrl: `/get-sr-flashcards-by-deck-id/${deckId}`,
    errorMessage:
      "There was an error getting the spaced repetition flashcard by deck id",
  });
  return response.data;
};

export const saveFlashcard = async ({
  flashcard_id,
  owner_id,
  deck_id,
  frontEditorState,
  backEditorState,
  quality,
  interval,
  learningStatus,
}: {
  flashcard_id: string | undefined;
  owner_id: string | undefined;
  deck_id: string | undefined;
  frontEditorState?: EditorState;
  backEditorState?: EditorState;
  quality?: FlashcardQuality;
  interval?: number;
  learningStatus?: FlashcardLearningStatus;
}) => {
  const payload: {
    flashcard_id: string | undefined;
    owner_id: string | undefined;
    deck_id: string | undefined;
    front_draft_keys?: string[];
    front_blocks?: string[];
    back_draft_keys?: string[];
    back_blocks?: string[];
    quality?: FlashcardQuality;
    interval?: number;
    learning_status?: FlashcardLearningStatus;
  } = {
    flashcard_id,
    owner_id,
    deck_id,
    quality,
    interval,
    learning_status: learningStatus,
  };

  if (frontEditorState) {
    const { keys: front_draft_keys, blocks: front_blocks } =
      createKeysAndBlocks(frontEditorState);
    payload["front_draft_keys"] = front_draft_keys;
    payload["front_blocks"] = front_blocks;
  }

  if (backEditorState) {
    const { keys: back_draft_keys, blocks: back_blocks } =
      createKeysAndBlocks(backEditorState);
    payload["back_draft_keys"] = back_draft_keys;
    payload["back_blocks"] = back_blocks;
  }

  const response: AxiosResponse<FlashcardInterface> = await patch({
    apiUrl: `/flashcard/${flashcard_id}`,
    errorMessage: "There was an error updating the flashcard",
    body: payload,
  });

  return response.data;
};

export const addFlashcard = async ({
  owner_id,
  study_set_id,
  block_link,
  frontFlashcardEditorState,
  deck_id,
  backFlashcardEditorState,
}: {
  owner_id: string;
  study_set_id: string;
  deck_id: string | undefined;
  block_link?: string;
  frontFlashcardEditorState?: EditorState;
  backFlashcardEditorState?: EditorState;
}): Promise<FlashcardInterface> => {
  let payload = {};
  if (frontFlashcardEditorState && backFlashcardEditorState) {
    const { keys: frontKeys, blocks: frontBlocks } =
      frontFlashcardEditorState &&
      createKeysAndBlocks(frontFlashcardEditorState);
    const { keys: backKeys, blocks: backBlocks } =
      backFlashcardEditorState && createKeysAndBlocks(backFlashcardEditorState);
    payload = {
      study_set_id,
      owner_id,
      deck_id,
      block_link,
      front_blocks: frontBlocks,
      front_draft_keys: frontKeys,
      back_blocks: backBlocks,
      back_draft_keys: backKeys,
    };
  } else {
    payload = {
      study_set_id: study_set_id,
      owner_id: owner_id,
      deck_id,
      block_link: block_link,
    };
  }

  const response: AxiosResponse<FlashcardInterface> = await post({
    apiUrl: `/flashcard`,
    errorMessage: "There was an error creating the flashcard",
    body: payload,
  });

  return response.data;
};

export const deleteFlashcard = async ({
  flashcard_id,
}: {
  flashcard_id?: string;
}) => {
  const response = await del({
    apiUrl: `/flashcard/${flashcard_id}`,
    errorMessage: "There was an error deleting the flashcard",
  });

  return response.data;
};