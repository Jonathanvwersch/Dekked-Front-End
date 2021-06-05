import { useState } from "react";
import { config } from "../../config";
import { getSessionCookie } from "../../helpers";
export function useBinders() {
  const [binders, setBinders] = useState<{
    [key: string]: BinderInterface;
  }>({});
  const [isError, setIsError] = useState(false);

  async function getBinders() {
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
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          getBinders();
          return;
        }
      }
      throw Error("There was an error adding binders");
    } catch (error) {
      console.log(error);
    }
  }

  async function updateBinder(
    binder_id: string,

    {
      name,
      color,
    }: {
      name?: string;
      color?: string;
    }
  ) {
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
        if (json.success) {
          getBinders();
          return;
        }
      }
      throw Error("There was an error updating binders");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBinder(binder_id: string) {
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
        if (json.success) {
          getBinders();
          return;
        }
      }
      throw Error("There was an error deleting the binder");
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getBinders,
    addBinder,
    bindersIsError: isError,
    binders,
    updateBinder,
    deleteBinder,
    setBinders,
  };
}
