import { useState } from "react";
import { config } from "../../config";
import { getSessionCookie } from "../../helpers";

export function useFileTree() {
  const [fileTree, setFileTree] = useState<FileTreeInterface>({});
  const getFileTree = async () => {
    const uri = config.api + "/file-tree";

    const response = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
      },
    });
    if (response.ok) {
      const json = await response.json();
      if (json.success) {
        setFileTree(json.data.fileTree);
        return;
      }
    }
  };

  return { getFileTree, fileTree, setFileTree };
}
