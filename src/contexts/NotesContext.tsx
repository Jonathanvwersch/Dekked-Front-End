import { createContext, useContext, useEffect, useMemo, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { Params } from "../shared";
import { isNull } from "lodash";
import { useBlocks } from "../services/note-taking/useBlocks";
import { usePage } from "../services/note-taking/usePage";
import { convertToRaw, EditorState } from "draft-js";
import { EditorContext } from ".";

export interface NotesContextProps {
  blocks: string[] | null;
  loading: boolean;
  onSave: (editorState: EditorState, id: string | undefined) => Promise<void>;
  pageId: string | undefined;
}

export const NotesContext = createContext<NotesContextProps>(
  {} as NotesContextProps
);

export const NotesContextProvider: React.FC = ({ children }) => {
  const { id } = useParams<Params>();
  const { page, savePage, getPageByStudyPackId } = usePage(id);
  const pageId = page?.id;
  const blocks = useBlocks(page?.id);
  const [loading, setLoading] = useState<boolean>(isNull(blocks));
  const { setSaving, setSaveError } = useContext(EditorContext);

  useEffect(() => {
    id && getPageByStudyPackId();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Make call to server to save text blocks
  const onSave = async (editorState: EditorState, id: string | undefined) => {
    setSaving(true);
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const keys = rawContent.blocks.map((val) => val.key);
    const blocks = rawContent.blocks.map((val) => JSON.stringify(val));
    const response = await savePage({
      draft_keys: keys,
      blocks,
      id,
    });
    if (!response.success) {
      setSaveError(true);
    } else {
      setSaving(!response.success);
      setSaveError(false);
    }
  };

  return (
    <NotesContext.Provider value={{ onSave, loading, blocks, pageId }}>
      {children}
    </NotesContext.Provider>
  );
};
