import { useState } from "react";
import { config } from "../../config";
export function useStudyPacks() {
  const [studyPacks, setStudyPacks] = useState<{
    [key: string]: StudyPackInterface;
  }>({});
  const [isError, setIsError] = useState(false);

  async function getStudyPacks() {
    try {
      const uri = config.api + "/study-packs";
      const response = await fetch(uri, {
        headers: {
          Authorization: `Bearer ${config.authToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          setStudyPacks(json.data.studyPacks);
          return;
        }
      }

      throw Error("There was an error getting study packs");
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }

  async function addStudyPack(name: string, color: string, binder_id: string) {
    try {
      console.log({ binder_id, name, color });
      const uri = config.api + "/study-pack";
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.authToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          color,
          name,
          binder_id,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          getStudyPacks();
          return;
        }
      }
      throw Error("There was an error updating folders");
    } catch (error) {
      console.log(error);
    }
  }

  async function updateStudyPack(
    study_pack_id: string,
    {
      name,
      color,
    }: {
      name?: string;
      color?: string;
    }
  ) {
    try {
      const uri = config.api + "/study-pack";
      const response = await fetch(uri, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${config.authToken}`,
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
        console.log(json);
        if (json.success) {
          getStudyPacks();
          return;
        }
      }
      throw Error("There was an error updating study packs");
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getStudyPacks,
    addStudyPack,
    studyPacksIsError: isError,
    studyPacks,
    updateStudyPack,
  };
}
