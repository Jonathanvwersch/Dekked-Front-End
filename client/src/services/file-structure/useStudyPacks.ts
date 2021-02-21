import React from "react";
import { config } from "../../config";
export function useStudyPacks() {
  const [studyPacks, setStudyPacks] = React.useState<{
    [key: string]: StudyPackInterface;
  }>({});
  const [isError, setIsError] = React.useState(false);

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
      const uri = config.api + "/study-pack";
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.authToken}`,
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
          const newStudyPack: StudyPackInterface = json.data;
          const studyPacksCopy = { ...studyPacks };
          studyPacksCopy[newStudyPack.id] = newStudyPack;
          setStudyPacks(studyPacksCopy);
          return;
        }
      }
      throw Error("There was an error updating folders");
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getStudyPacks,
    addStudyPack,
    studyPacksIsError: isError,
    studyPacks,
  };
}
