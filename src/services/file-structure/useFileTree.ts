import { useState } from "react";
import { config } from "../../config";
import { getSessionCookie } from "../../helpers";

export function useFileTree() {
  const [fileTree, setFileTree] = useState<FileTreeInterface>({});
  const [isTreeEmpty, setIsTreeEmpty] = useState<boolean>(false);
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
        console.log("success");
        if (Object.keys(json.data.fileTree).length === 0) {
          setIsTreeEmpty(true);
          return;
        }
        setIsTreeEmpty(false);
        setFileTree(json.data.fileTree);
        return;
      } else;
    }
  };

  return { getFileTree, fileTree, isTreeEmpty, setFileTree };
}
