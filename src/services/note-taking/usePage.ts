import { useEffect, useState } from "react";
import { config } from "../../config";

export function usePage(study_pack_id: string) {
  const [page, setPage] = useState<undefined | PageInterface>();

  const getPageByStudyPackId = async () => {
    const uri = config.api + `/get-page-by-parent-id/${study_pack_id}`;
    const response = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${config.authToken}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      console.log(json);
      console.log("succesfdsafgds");
      if (json.success) {
        setPage(json.data.page);
        return;
      }
    }
  };

  useEffect(() => {
    if (study_pack_id) {
      getPageByStudyPackId();
    }
  }, [study_pack_id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function savePage({
    draft_keys,
    blocks,
  }: {
    draft_keys: string[];
    blocks: string[];
  }) {
    const url = config.api + `/page/${page?.id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.authToken}`,
        },
        body: JSON.stringify({
          draft_keys,
          blocks,
        }),
      });
      console.log(response.json());
      return await response.json();
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  }

  return {
    page,
    savePage,
  };
}
