import { useAtom } from "jotai";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { getSessionCookie } from ".";
import { queryClient } from "..";
import { deleteBinder, deleteFolder, deleteStudySet } from "../api";
import { FILETREE_TYPES, Params } from "../shared";
import {
  bindersAtom,
  deleteAssetAtom,
  firstFolderIdAtom,
  foldersAtom,
  secondFolderIdAtom,
  studySetsAtom,
} from "../store";

export const useDeleteAsset = () => {
  const { id } = useParams<Params>();
  const history = useHistory();
  const [, setAsset] = useAtom(deleteAssetAtom);
  const [folders] = useAtom(foldersAtom);
  const [binders] = useAtom(bindersAtom);
  const [studySets] = useAtom(studySetsAtom);
  const [firstFolderId] = useAtom(firstFolderIdAtom);
  const [secondFolderId] = useAtom(secondFolderIdAtom);

  const { mutate: _deleteFolder } = useMutation(
    "delete-folder",
    (folderId: string) => deleteFolder(folderId),
    {
      onSuccess: () => {
        queryClient.refetchQueries("get-all-due-sr-decks");
      },
    }
  );

  const { mutate: _deleteBinder } = useMutation(
    "delete-binder",
    (binderId: string) => deleteBinder(binderId),
    {
      onSuccess: () => {
        queryClient.refetchQueries("get-all-due-sr-decks");
      },
    }
  );

  const { mutate: _deleteStudySet } = useMutation(
    "delete-study-set",
    (studySetId: string) => deleteStudySet(studySetId),
    {
      onSuccess: () => {
        queryClient.refetchQueries("get-all-due-sr-decks");
      },
    }
  );

  const deleteAsset = useCallback(
    (type: string, assetId: string) => {
      const shouldRedirect = id === assetId;
      switch (type) {
        case FILETREE_TYPES.FOLDER:
          setAsset({ fileId: assetId, type });

          // navigate to first folder after deleting folder if id === assetId
          const firstFolderLink = `/${FILETREE_TYPES.FOLDER}/${firstFolderId}`;
          const secondFolderLink = `/${FILETREE_TYPES.FOLDER}/${secondFolderId}`;
          if (
            shouldRedirect ||
            binders?.[studySets?.[id]?.binder_id || 0]?.folder_id === assetId ||
            binders?.[id]?.folder_id === assetId
          ) {
            if (assetId === firstFolderId) {
              history.push(secondFolderLink);
            } else if (folders && !Object.keys(folders).length) {
              history.push("/");
            } else history.push(firstFolderLink);
          }

          if (folders && !Object.keys(folders).length) {
            history.push("/");
          }

          _deleteFolder(assetId);

          break;

        case FILETREE_TYPES.BINDER:
          // navigate to parent folder after deleting a binder
          const parentFolder = folders?.[binders?.[assetId]?.folder_id || 0];
          const parentFolderId = parentFolder?.id;
          const parentFolderLink = `/${FILETREE_TYPES.FOLDER}/${parentFolderId}`;

          if (shouldRedirect || studySets?.[id]?.binder_id === assetId)
            history.push(parentFolderLink);

          setAsset({ fileId: assetId, type });

          _deleteBinder(assetId);
          break;

        case FILETREE_TYPES.STUDY_SET:
          // navigate to parent binder after deleting a study set
          const parentBinder = binders?.[studySets?.[assetId]?.binder_id || 0];
          const parentBinderId = parentBinder?.id;
          const parentBinderLink = `/${FILETREE_TYPES.BINDER}/${parentBinderId}`;

          shouldRedirect && history.push(parentBinderLink);
          setAsset({ fileId: assetId, type });

          _deleteStudySet(assetId);
          break;

        default:
          break;
      }
    },
    [
      setAsset,
      id,
      firstFolderId,
      _deleteBinder,
      _deleteStudySet,
      _deleteFolder,
      binders,
      studySets,
      folders,
      history,
      secondFolderId,
    ]
  );

  return {
    deleteAsset,
  };
};
