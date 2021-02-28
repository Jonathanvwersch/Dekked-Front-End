import { useState } from "react";
import { config } from "../../config";
export function useFileTree() {
  const [fileTree, setFileTree] = useState<FileTreeInterface>({});
  const getFileTree = async () => {
    console.log("UPDATING FILE TREE!");
    const uri = config.api + "/file-tree";
    const response = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${config.authToken}`,
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

  return { getFileTree, fileTree };
}
