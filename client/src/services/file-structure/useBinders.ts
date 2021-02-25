import React from "react";
import { config } from "../../config";
export function useBinders() {
  const [binders, setBinders] = React.useState<{
    [key: string]: BinderInterface;
  }>({});
  const [isError, setIsError] = React.useState(false);

  async function getBinders() {
    try {
      const uri = config.api + "/binders";
      const response = await fetch(uri, {
        headers: {
          Authorization: `Bearer ${config.authToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          setBinders(json.data.binders);
          return;
        }
      }

      throw Error("There was an error getting binders");
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }

  async function addBinder(name: string, color: string, folder_id: string) {
    console.log(folder_id);
    try {
      const uri = config.api + "/binder";
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.authToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          color,
          name,
          folder_id,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          const newBinder: BinderInterface = json.data;

          const bindersCopy = { ...binders };
          bindersCopy[newBinder.id] = newBinder;
          setBinders(bindersCopy);
          return;
        }
      }
      throw Error("There was an error updating binders");
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getBinders,
    addBinder,
    bindersIsError: isError,
    binders,
  };
}
