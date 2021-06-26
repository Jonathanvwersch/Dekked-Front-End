import { useAtom } from "jotai";
import { useCallback } from "react";

import { FILETREE_TYPES } from "../shared";
import { bindersAtom, foldersAtom, studySetsAtom } from "../store";

export const useGetAsset = () => {
  const [folders] = useAtom(foldersAtom);
  const [binders] = useAtom(bindersAtom);
  const [studySets] = useAtom(studySetsAtom);

  const getAsset = useCallback(
    (type: string, assetId: string) => {
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

  return {
    getAsset,
  };
};
