import { useAtom } from "jotai";
import { cloneDeep } from "lodash";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { updateBinder } from "../services/file-structure/binders-api";
import { updateFolder } from "../services/file-structure/folders-api";
import { updateStudySet } from "../services/file-structure/studySets-api";
import { FILETREE_TYPES } from "../shared";
import { bindersAtom, foldersAtom, studySetsAtom } from "../store";

export const useUpdateAsset = () => {
  const [folders, setFolders] = useAtom(foldersAtom);
  const [binders, setBinders] = useAtom(bindersAtom);
  const [studySets, setStudySets] = useAtom(studySetsAtom);

  const { mutate: _updateFolder } = useMutation(
    "update-folder",
    ({
      folderId,
      updateData,
    }: {
      folderId: string;
      updateData: {
        color?: string;
        name?: string;
      };
    }) =>
      updateFolder(folderId, {
        name: updateData.name,
        color: updateData.color,
      }),
    {
      retry: 3,
    }
  );

  const { mutate: _updateBinder } = useMutation(
    "update-binder",
    ({
      binderId,
      updateData,
    }: {
      binderId: string;
      updateData: {
        color?: string;
        name?: string;
      };
    }) => {
      return updateBinder(binderId, {
        name: updateData.name,
        color: updateData.color,
      });
    },
    {
      retry: 3,
    }
  );

  const { mutate: _updateStudySet } = useMutation(
    "update-study-set",
    ({
      studySetId,
      updateData,
    }: {
      studySetId: string;
      updateData: {
        color?: string;
        name?: string;
      };
    }) =>
      updateStudySet(studySetId, {
        name: updateData.name,
        color: updateData.color,
      }),
    {
      retry: 3,
    }
  );

  const updateAsset = useCallback(
    (
      type: string,
      assetId: string,
      updateData: {
        color?: string;
        name?: string;
      },
      networkRequest?: boolean
    ) => {
      console.log("updateAsset");
      const now = new Date();

      switch (type) {
        case FILETREE_TYPES.FOLDER:
          if (folders && !networkRequest) {
            folders[assetId] = {
              ...folders[assetId],
              ...updateData,
              date_modified: now,
            };

            setFolders(cloneDeep(folders));
          }
          networkRequest !== false &&
            _updateFolder({ folderId: assetId, updateData });
          break;

        case FILETREE_TYPES.BINDER:
          if (binders && !networkRequest) {
            binders[assetId] = {
              ...binders[assetId],
              ...updateData,
            };
            setBinders(cloneDeep(binders));
          }
          networkRequest !== false &&
            _updateBinder({ binderId: assetId, updateData });
          break;

        case FILETREE_TYPES.STUDY_SET:
          if (studySets && !networkRequest) {
            studySets[assetId] = {
              ...studySets[assetId],
              ...updateData,
            };
            setStudySets(cloneDeep(studySets));
          }
          networkRequest !== false &&
            _updateStudySet({ studySetId: assetId, updateData });
          break;

        default:
          break;
      }
    },
    [
      _updateBinder,
      _updateFolder,
      _updateStudySet,
      binders,
      folders,
      studySets,
      setStudySets,
      setBinders,
      setFolders,
    ]
  );

  return {
    updateAsset,
  };
};
