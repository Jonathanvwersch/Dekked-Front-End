import { EditorState } from "draft-js";
import { createKeysAndBlocks } from "../../components/notetaking/Editor/Editor.helpers";
import { config } from "../../config";

const getPageByStudyPackId = async (studyPackId: string) => {
  const uri = config.api + `/get-page-by-parent-id/${studyPackId}`;
  const response = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${config.authToken}`,
    },
  });

  const json = await response.json();
  return json.data.page;
};

export const getBlocksByPageId = async (studyPackId: string) => {
  const page = await getPageByStudyPackId(studyPackId);

  const uri = config.api + `/get-blocks-by-page/${page?.id}`;
  const response = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${config.authToken}`,
    },
  });

  const json = await response.json();
  return { data: json.data.blocks, pageId: page?.id };
};

export const savePage = async (editorState: EditorState, pageId?: string) => {
  const { keys, blocks } = createKeysAndBlocks(editorState);
  const url = config.api + `/page/${pageId}`;
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.authToken}`,
    },
    body: JSON.stringify({
      draft_keys: keys,
      blocks,
    }),
  });
};
