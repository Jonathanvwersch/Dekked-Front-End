import { useEffect } from "react";
import { config } from "../../config";
import { useStorageState } from "../../hooks";

export function useBlocks(page_id?: string) {
  const { value: blocks, setValue: setBlocks } = useStorageState<
    string[] | null
  >(null, "page-blocks");
  const getBlocksByPageId = async () => {
    const uri = config.api + `/get-blocks-by-page/${page_id}`;

    try {
      const response = await fetch(uri, {
        headers: {
          Authorization: `Bearer ${config.authToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          setBlocks(json.data.blocks);
          return;
        }
      }
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  };

  useEffect(() => {
    if (page_id) {
      getBlocksByPageId();
    }
  }, [page_id]); // eslint-disable-line react-hooks/exhaustive-deps

  return blocks;
}
