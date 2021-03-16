import {
  ContentBlock,
  ContentState,
  convertFromRaw,
  RawDraftContentBlock,
  RawDraftContentState,
} from "draft-js";

import "draft-js/dist/Draft.css";
import "./styles/TextEditor.css";

import React from "react";
import RichEditor from "./Editor";
import TitleEditor from "./TitleEditor";
import { useParams } from "react-router";
import { HFlex, VFlex } from "../../../components/common";
// import { getPage, savePage } from "../services/pageService";

export default function Page() {
  const { page_id }: { page_id: string } = useParams();
  const [rawContent, setRawContent] = React.useState<
    RawDraftContentState | undefined
  >();
  const [title, setTitle] = React.useState("");
  const [loading, setLoading] = React.useState(true);
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
    <div
      style={{
        marginLeft: "10%",
        marginRight: "10%",
        width: "100%",
      }}
    >
      <TitleEditor
        savedTitle={ContentState.createFromText(title)}
        setTitle={setTitle}
        onSave={onSave}
      />
      <RichEditor
        savedContent={contentSaved}
        setRawContent={setRawContent}
        onSave={onSave}
      />
    </div>
  );
  //   return (
  //       {loading ? (
  //         <div>Loading...</div>
  //       ) : (
  //       )}
  //     </div>
  //   );
}
