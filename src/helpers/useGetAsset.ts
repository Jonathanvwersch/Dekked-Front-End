import { useAtom } from "jotai";
import { useCallback } from "react";

import { FILETREE_TYPES } from "../shared";
import {
  bindersAtom,
  fileTreeAtom,
  foldersAtom,
  studySetsAtom,
} from "../store";

export const useGetAsset = (message?: string) => {
  const [folders] = useAtom(foldersAtom);
  const [binders] = useAtom(bindersAtom);
  const [studySets] = useAtom(studySetsAtom);
  const [fileTree] = useAtom(fileTreeAtom);
  console.log("getAsset" + message);

  const getAsset = useCallback(
    (type: string, assetId: string) => {
      console.log("getAsset");
      switch (type) {
        case FILETREE_TYPES.FOLDER:
          return folders && folders[assetId];
        case FILETREE_TYPES.BINDER:
          return binders && binders[assetId];
        case FILETREE_TYPES.STUDY_SET:
          return studySets && studySets[assetId];
        default:
          break;
      }
    },
    [folders, binders, studySets]
  );

  const getNumberOfChildAssets = useCallback(
    (type: string, assetId: string) => {
      console.log("getChildren");
      switch (type) {
        case FILETREE_TYPES.FOLDER:
          const folderObject = fileTree?.[assetId]?.children;
          return (
            (fileTree && folderObject && Object.keys(folderObject).length) || 0
          );
        case FILETREE_TYPES.BINDER:
          const folderId = binders?.[assetId]?.folder_id;
          const binderObject =
            fileTree?.[folderId || 0]?.children?.[assetId]?.children;
          return (
            (fileTree &&
              binders &&
              folderId &&
              binderObject &&
              Object.keys(binderObject)?.length) ||
            0
          );
        default:
          return 0;
      }
    },
    [binders, fileTree]
  );
  return {
    getAsset,
    getNumberOfChildAssets,
  };
};
