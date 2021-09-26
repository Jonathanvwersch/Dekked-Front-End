import { EditorState } from "draft-js";
import { createKeysAndBlocks } from "../components/notetaking/Editor/Editor.helpers";
import { get, patch } from "./utils";
import { AxiosResponse } from "axios";

const getPageByStudySetId = async (
  studySetId: string
): Promise<PageInterface> => {
  const response: AxiosResponse<PageInterface> = await get({
    apiUrl: `/pages/study-sets/${studySetId}`,
  });
  return response?.data;
};

export const getBlocksByPageId = async ({
  studySetId,
}: {
  studySetId: string;
}): Promise<{ data: BlockInterface[]; pageId: string }> => {
  const page = await getPageByStudySetId(studySetId);

  const response: AxiosResponse<BlockInterface[] & { pageId: string }> =
    await get({
      apiUrl: `/pages/${page?.id}`,
    });

  return { data: response?.data, pageId: page?.id };
};

export const savePage = async ({
  editorState,
  pageId,
}: {
  editorState: EditorState;
  pageId?: string;
}): Promise<PageInterface> => {
  const { keys, blocks } = createKeysAndBlocks(editorState);
  const payload = {
    draft_keys: keys,
    blocks,
  };

  const response: AxiosResponse<PageInterface> = await patch({
    apiUrl: `/pages/${pageId}`,
    body: payload,
  });
  return response?.data;
};
