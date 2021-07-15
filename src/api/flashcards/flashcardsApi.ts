import { EditorState } from "draft-js";

import { createKeysAndBlocks } from "../../components/notetaking/Editor/Editor.helpers";
import { config } from "../../config";
import { getSessionCookie } from "../../helpers";

export const getDeckByStudySetId = async (studySetId: string) => {
  const uri = config.api + `/get-deck-by-study-set-id/${studySetId}`;
  const response = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${getSessionCookie()}`,
    },
  });
  const json = await response.json();
  return json.data.deck;
};

export const getFlashcardsByDeckId = async ({
  studySetId,
}: {
  studySetId: string;
}) => {
  const deck = await getDeckByStudySetId(studySetId);

  const uri = config.api + `/get-flashcards-by-deck-id/${deck?.id}`;
  const response = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${getSessionCookie()}`,
    },
  });

  const json = await response.json();
  return { data: json.data.flashcards, deckId: deck?.id };
};

export const getSpacedRepetitionFlashcardsByDeckId = async ({
  studySetId,
}: {
  studySetId: string;
}) => {
  const deck = await getDeckByStudySetId(studySetId);

  const uri = config.api + `/get-sr-flashcards-by-deck-id/${deck?.id}`;
  const response = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${getSessionCookie()}`,
    },
  });

  const json = await response.json();
  return json.data.flashcards;
};

export const saveFlashcard = async ({
  flashcard_id,
  owner_id,
  deck_id,
  frontEditorState,
  backEditorState,
}: {
  flashcard_id: string | undefined;
  owner_id: string | undefined;
  deck_id: string | undefined;
  frontEditorState: EditorState;
  backEditorState: EditorState;
}) => {
  const url = config.api + `/flashcard/${flashcard_id}`;

  const { keys: front_draft_keys, blocks: front_blocks } =
    createKeysAndBlocks(frontEditorState);
  const { keys: back_draft_keys, blocks: back_blocks } =
    createKeysAndBlocks(backEditorState);

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getSessionCookie()}`,
    },
    body: JSON.stringify({
      flashcard_id,
      owner_id,
      deck_id,
      front_blocks,
      front_draft_keys,
      back_blocks,
      back_draft_keys,
    }),
  });
  return await response.json();
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
}) => {
  let body = {};
  if (frontFlashcardEditorState && backFlashcardEditorState) {
    const { keys: frontKeys, blocks: frontBlocks } =
      frontFlashcardEditorState &&
      createKeysAndBlocks(frontFlashcardEditorState);
    const { keys: backKeys, blocks: backBlocks } =
      backFlashcardEditorState && createKeysAndBlocks(backFlashcardEditorState);
    body = {
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
    body = {
      study_set_id: study_set_id,
      owner_id: owner_id,
      deck_id,
      block_link: block_link,
    };
  }
  const uri = config.api + "/flashcard";
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getSessionCookie()}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();
  return json;
};

export const deleteFlashcard = async ({
  flashcard_id,
}: {
  flashcard_id?: string;
}) => {
  const uri = config.api + `/flashcard/${flashcard_id}`;
  const response = await fetch(uri, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getSessionCookie()}`,
      "Content-type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};
