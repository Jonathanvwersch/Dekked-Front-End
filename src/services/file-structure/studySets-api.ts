import { config } from "../../config";
import { getSessionCookie } from "../../helpers";

export const getStudySets = async () => {
  try {
    const uri = config.api + "/study-packs";
    const response = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      if (json.success) {
        return json.data.studyPacks;
      }
    }

    throw Error("There was an error getting study packs");
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addStudySet = async ({
  name,
  color,
  binder_id,
  id,
}: {
  name: string;
  color: string;
  binder_id: string;
  id?: string;
}) => {
  try {
    const uri = config.api + "/study-pack";
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        color,
        name,
        binder_id,
        id,
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

export const updateStudySet = async (
  study_pack_id: string,
  {
    name,
    color,
  }: {
    name?: string;
    color?: string;
  }
) => {
  try {
    const uri = config.api + "/study-pack";
    const response = await fetch(uri, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        study_pack_id,
        color,
        name,
      }),
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw Error("There was an error updating study packs");
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudySet = async (study_pack_id: string) => {
  try {
    const uri = config.api + "/study-pack";
    const response = await fetch(uri, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        study_pack_id,
      }),
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw Error("There was an error deleting study packs");
  } catch (error) {
    console.log(error);
  }
};
