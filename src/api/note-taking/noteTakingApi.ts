import { EditorState } from "draft-js";
import { createKeysAndBlocks } from "../../components/notetaking/Editor/Editor.helpers";
import { config } from "../../config";
import { getSessionCookie } from "../../helpers";

const getPageByStudySetId = async (studySetId: string) => {
  const uri = config.API + `/get-page-by-study-set-id/${studySetId}`;
  const response = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${getSessionCookie()}`,
    },
  });
  const json = await response.json();
  return json.data.page;
};

export const getBlocksByPageId = async ({
  studySetId,
}: {
  studySetId: string;
}) => {
  const page = await getPageByStudySetId(studySetId);

  const uri = config.API + `/get-blocks-by-page/${page?.id}`;
  const response = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${getSessionCookie()}`,
    },
  });

  const json = await response.json();
  return { data: json.data.blocks, pageId: page?.id };
};

export const savePage = async ({
  editorState,
  pageId,
}: {
  editorState: EditorState;
  pageId?: string;
}) => {
  const { keys, blocks } = createKeysAndBlocks(editorState);
  const url = config.API + `/page/${pageId}`;
  await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getSessionCookie()}`,
    },
    body: JSON.stringify({
      draft_keys: keys,
      blocks,
    }),
  });
};
