import { config } from "../../config";
import { getSessionCookie } from "../../helpers";

export const getFileTree = async () => {
  const uri = config.api + "/file-tree";

  try {
    const response = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${getSessionCookie()}`,
      },
    });
    if (response.ok) {
      const json = await response.json();
      if (json.success) {
        return json?.data?.fileTree;
      }
    }
    throw Error("There was an error getting the file tree");
  } catch (error) {
    console.log(error);
    return false;
  }
};
