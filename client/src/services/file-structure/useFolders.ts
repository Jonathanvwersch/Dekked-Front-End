import React from "react";
import { config } from "../../config";
export function useFolders() {
  const [folders, setFolders] = React.useState<{
    [key: string]: FolderInterface;
  }>({});
  const [isError, setIsError] = React.useState(false);

  async function getFolders() {
    try {
      const uri = config.api + "/folders";
      const response = await fetch(uri, {
        headers: {
          Authorization: `Bearer ${config.authToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          setFolders(json.data);
          return;
        }
      }

      throw Error("There was an error getting folders");
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }

  async function addFolder(name: string, color: string) {
    try {
      const uri = config.api + "/folder";
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.authToken}`,
        },
        body: JSON.stringify({
          color,
          name,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          const newFolder: FolderInterface = json.data;

          const foldersCopy = { ...folders };
          foldersCopy[newFolder.id] = newFolder;
          setFolders(foldersCopy);
          return;
        }
      }
      throw Error("There was an error updating folders");
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getFolders,
    addFolder,
    folderIsError: isError,
    folders,
  };
}
