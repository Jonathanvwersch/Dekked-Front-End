import { config } from "../../config";
import { getSessionCookie } from "../../helpers";

export const getFolders = async ({
  name,
  color,
}: {
  name: string;
  color: string;
}) => {
  try {
    const uri = config.api + "/folders";
    const response = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      if (json.success) {
        // if there are no folders, auto add one folder
        if (Object.keys(json.data.folders).length === 0) {
          addFolder({ name, color });
        }
        return json.data.folders;
      }
    }
    throw Error("There was an error getting folders");
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addFolder = async ({
  name,
  color,
  id,
}: {
  name: string;
  color: string;
  id?: string;
}) => {
  try {
    const uri = config.api + "/folder";
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        color,
        name,
        id,
      }),
    });

    if (response.ok) {
      const json = await response.json();
      if (json.success) {
        return json;
      }
    }
    throw Error("There was an error adding folders");
  } catch (error) {
    console.log(error);
  }
};

export const updateFolder = async (
  folder_id: string,
  {
    name,
    color,
  }: {
    name?: string;
    color?: string;
  }
) => {
  try {
    const uri = config.api + "/folder";
    const response = await fetch(uri, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
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
      return json;
    }
    throw Error("There was an error updating folders");
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = async (folder_id: string) => {
  try {
    const uri = config.api + "/folder";
    const response = await fetch(uri, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        folder_id,
      }),
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw Error("There was an error deleting the folder");
  } catch (error) {
    console.log(error);
  }
};
