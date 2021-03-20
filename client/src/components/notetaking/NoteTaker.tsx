import {
  ContentBlock,
  ContentState,
  convertFromRaw,
  RawDraftContentBlock,
  RawDraftContentState,
} from "draft-js";

import "draft-js/dist/Draft.css";

import React from "react";
import RichEditor from "./editor/RichEditor";
import { useParams } from "react-router";
// import { getPage, savePage } from "../services/pageService";

const NoteTaker: React.FC = () => {
  const { page_id }: { page_id: string } = useParams();
  const [rawContent, setRawContent] = React.useState<
    RawDraftContentState | undefined
  >();

  const [contentSaved, setContentSaved] = React.useState<
    ContentState | undefined
  >();
  const getSavedContent = async () => {
    // const response = await getPage(page_id);
    // console.log(response);
    // if (response.success) {
    //   const organizedBlocks: string[] = response.data.organizedBlocks;
    //   const parsedBlocks: RawDraftContentBlock[] = organizedBlocks.map(
    //     (block) => JSON.parse(block)
    //   );
    //   const savedState = convertFromRaw({
    //     blocks: parsedBlocks,
    //     entityMap: {},
    //   });
    //   // ContentState.createFromBlockArray();
    //   setTitle(response.data.page.title);
    //   setContentSaved(savedState);
    //   setLoading(false);
    // }
    // const raw = window.localStorage.getItem('raw');
    // if (raw) {
    //   const parsed = JSON.parse(raw);
    //   const title = parsed.title;
    //   const content = parsed.content;
    //   return {
    //     title: title ? convertFromRaw(title) : undefined,
    //     content: content ? convertFromRaw(content) : undefined
    //   };
    // }
  };

  const onSave = async () => {
    console.log("HERE");
    // if (rawContent) {
    //   const keys = rawContent.blocks.map((val) => val.key);
    //   const blocks = rawContent.blocks.map((val) => JSON.stringify(val));
    //   const response = await savePage({
    //     draft_keys: keys,
    //     blocks,
    //     page_id,
    //     title,
    //   });

    //   console.log(response);
    // }
  };

  React.useEffect(() => {
    getSavedContent();
  }, []);

  return (
    <RichEditor
      savedContent={contentSaved}
      setRawContent={setRawContent}
      onSave={onSave}
    />
  );
  //   return (
  //       {loading ? (
  //         <div>Loading...</div>
  //       ) : (
  //       )}
  //     </div>
  //   );
};

export default NoteTaker;
