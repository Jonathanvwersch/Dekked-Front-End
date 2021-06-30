import { config } from "../../config";
import { getSessionCookie } from "../../helpers";

export const getBinders = async () => {
  try {
    const uri = config.api + "/binders";

    const response = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      if (json.success) {
        return json.data.binders;
      }
    }

    throw Error("There was an error getting binders");
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addBinder = async ({
  name,
  color,
  folder_id,
  id,
}: {
  name: string;
  color: string;
  folder_id: string;
  id?: string;
}) => {
  try {
    const uri = config.api + "/binder";
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        color,
        name,
        folder_id,
        id,
      }),
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw Error("There was an error adding binders");
  } catch (error) {
    console.log(error);
  }
};

export const updateBinder = async (
  binder_id: string,
  {
    name,
    color,
  }: {
    name?: string;
    color?: string;
  }
) => {
  try {
    const uri = config.api + "/binder";
    const response = await fetch(uri, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        binder_id,
        color,
        name,
      }),
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw Error("There was an error updating binders");
  } catch (error) {
    console.log(error);
  }
};

export const deleteBinder = async (binder_id: string) => {
  try {
    const uri = config.api + "/binder";
    const response = await fetch(uri, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        binder_id,
      }),
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw Error("There was an error deleting the binder");
  } catch (error) {
    console.log(error);
  }
};
