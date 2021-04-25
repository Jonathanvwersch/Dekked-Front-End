import { useEffect, useState } from "react";
import { config } from "../../config";

export function useBlocks(page_id?: string) {
  const [blocks, setBlocks] = useState<string[] | null>(null);
  const getBlocksByPageId = async () => {
    const uri = config.api + `/get-blocks-by-page/${page_id}`;
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
  };

  useEffect(() => {
    if (page_id) {
      getBlocksByPageId();
    }
  }, [page_id]); // eslint-disable-line react-hooks/exhaustive-deps
  return blocks;
}
