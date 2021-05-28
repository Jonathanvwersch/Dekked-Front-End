import { useState } from "react";
import { config } from "../../config";
export function useFolders() {
  const [folders, setFolders] = useState<{
    [key: string]: FolderInterface;
  }>({});
  const [isError, setIsError] = useState(false);

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
          setFolders(json.data.folders);
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
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          color,
          name,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          getFolders();
          return;
        }
      }
      throw Error("There was an error adding folders");
    } catch (error) {
      console.log(error);
    }
  }

  async function updateFolder(
    folder_id: string,
    {
      name,
      color,
    }: {
      name?: string;
      color?: string;
    }
  ) {
    try {
      const uri = config.api + "/folder";
      const response = await fetch(uri, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${config.authToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          folder_id,
          color,
          name,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          getFolders();
          return;
        }
      }
      throw Error("There was an error updating folders");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFolder(folder_id: string) {
    try {
      const uri = config.api + "/folder";
      const response = await fetch(uri, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${config.authToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          folder_id,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          getFolders();
          return;
        }
      }
      throw Error("There was an error deleting the folder");
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getFolders,
    addFolder,
    folderIsError: isError,
    folders,
    updateFolder,
    deleteFolder,
    setFolders,
  };
}
