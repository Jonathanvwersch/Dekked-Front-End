import { EditorState } from "draft-js";

import { createKeysAndBlocks } from "../../components/notetaking/Editor/Editor.helpers";
import { config } from "../../config";
import { getSessionCookie } from "../../helpers";

export const getFlashcards = async ({
  studyPackId,
}: {
  studyPackId: string;
}) => {
  const uri = config.api + `/get-flashcards-by-study-pack-id/${studyPackId}`;
  const response = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${getSessionCookie()}`,
    },
  });

  const json = await response.json();
  return json.data.flashcards;
};

export const saveFlashcard = async ({
  flash_card_id,
  owner_id,
  frontEditorState,
  backEditorState,
  flashcardIndex,
}: {
  flash_card_id: string | undefined;
  owner_id: string | undefined;
  frontEditorState: EditorState;
  backEditorState: EditorState;
  flashcardIndex?: number;
}) => {
  const url = config.api + `/flashcard/${flash_card_id}`;

  const { keys: front_draft_keys, blocks: front_blocks } =
    createKeysAndBlocks(frontEditorState);
  const { keys: back_draft_keys, blocks: back_blocks } =
    createKeysAndBlocks(backEditorState);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getSessionCookie()}`,
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
};

export const addFlashcard = async ({
  owner_id,
  study_pack_id,
  block_link,
  frontFlashcardEditorState,
  backFlashcardEditorState,
}: {
  owner_id: string;
  study_pack_id: string;
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
      study_pack_id: study_pack_id,
      owner_id: owner_id,
      block_link: block_link,
      front_blocks: frontBlocks,
      front_draft_keys: frontKeys,
      back_blocks: backBlocks,
      back_draft_keys: backKeys,
    };
  } else {
    body = {
      study_pack_id: study_pack_id,
      owner_id: owner_id,
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
