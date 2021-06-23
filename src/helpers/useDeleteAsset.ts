import { useAtom } from "jotai";
import { cloneDeep } from "lodash";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { useAsset } from ".";
import { deleteBinder } from "../services/file-structure/binders-api";
import { deleteFolder } from "../services/file-structure/folders-api";
import { deleteStudySet } from "../services/file-structure/studySets-api";
import { FILETREE_TYPES, Params } from "../shared";
import {
  bindersAtom,
  fileTreeAtom,
  foldersAtom,
  isBlockOpenAtom,
  studySetsAtom,
} from "../store";

export const useDeleteAsset = () => {
  const { id: urlId } = useParams<Params>();
  const history = useHistory();
  const [folders, setFolders] = useAtom(foldersAtom);
  const [binders, setBinders] = useAtom(bindersAtom);
  const [studySets, setStudySets] = useAtom(studySetsAtom);
  const [fileTree] = useAtom(fileTreeAtom);
  const [isBlocksOpen] = useAtom(isBlockOpenAtom);
  const { addAsset } = useAsset("useDelete");

  const { mutate: _deleteFolder } = useMutation(
    "delete-folder",
    (folderId: string) => deleteFolder(folderId),
    {
      retry: 3,
    }
  );

  const { mutate: _deleteBinder } = useMutation(
    "delete-binder",
    (binderId: string) => deleteBinder(binderId),
    {
      retry: 3,
    }
  );

  const { mutate: _deleteStudySet } = useMutation(
    "delete-study-set",
    (studySetId: string) => deleteStudySet(studySetId),
    {
      retry: 3,
    }
  );

  const deleteAsset = useCallback(
    (type: string, assetId: string) => {
      console.log("deleteAsset");

      const shouldRedirect = urlId === assetId;
      switch (type) {
        case FILETREE_TYPES.FOLDER:
          if (fileTree && folders && studySets) {
            // delete folder on client side
            // not deleting if last folder item
            delete folders[assetId];
            delete fileTree[assetId];
            delete isBlocksOpen[assetId];

            if (Object.keys(folders).length === 0) {
              addAsset(FILETREE_TYPES.FOLDER);
            }

            setFolders(cloneDeep(folders));

            // navigate to first folder after deleting a folder
            const firstFolderId = Object.keys(fileTree)[0];
            const firstFolderLink = `/${FILETREE_TYPES.FOLDER}/${firstFolderId}`;

            shouldRedirect ||
              ((binders?.[studySets?.[urlId]?.binder_id]?.folder_id ===
                assetId ||
                binders?.[urlId]?.folder_id === assetId) &&
                history.push(firstFolderLink));
            _deleteFolder(assetId);
          }
          break;

        case FILETREE_TYPES.BINDER:
          if (binders && fileTree && folders) {
            // navigate to parent folder after deleting a binder
            const parentFolder = folders?.[binders?.[assetId]?.folder_id];
            const parentFolderId = parentFolder?.id;
            const parentFolderLink = `/${FILETREE_TYPES.FOLDER}/${parentFolderId}`;

            shouldRedirect && history.push(parentFolderLink);
            studySets?.[urlId]?.binder_id === assetId &&
              history.push(parentFolderLink);

            // Close folder if you are deleting last binder
            // makes for cleaner UX
            // const numberOfBinders = Object.keys(
            //   fileTree?.[parentFolder?.id]?.children
            // )?.length;

            delete binders[assetId];
            delete fileTree[parentFolder?.id].children[assetId];
            delete isBlocksOpen[assetId];

            // delete binder on client side
            setBinders(cloneDeep(binders));

            // if (numberOfBinders === 1) {
            //   openAsset(parentFolderId, false);
            // }
            _deleteBinder(assetId);
          }
          break;
        case FILETREE_TYPES.STUDY_SET:
          if (binders && fileTree && studySets) {
            // navigate to parent binder after deleting a study pack
            const parentBinder = binders[studySets?.[assetId]?.binder_id];
            const parentBinderId = parentBinder?.id;

            const parentBinderLink = `/${FILETREE_TYPES.BINDER}/${parentBinderId}`;
            shouldRedirect && history.push(parentBinderLink);

            // Close binder if you are deleting last study set
            // makes for cleaner UX
            // const numberOfStudySets = Object.keys(
            //   fileTree?.[parentBinder?.folder_id]?.children?.[parentBinderId]
            //     ?.children
            // )?.length;

            // delete study pack on client side
            delete studySets[assetId];
            delete fileTree[parentBinder?.folder_id]?.children[parentBinderId]
              .children[assetId];
            delete isBlocksOpen[assetId];
            setStudySets(cloneDeep(studySets));

            // if (numberOfStudySets === 1) {
            //   openAsset(parentBinderId, false);
            // }
            _deleteStudySet(assetId);
          }
          break;
        default:
          break;
      }
    },
    [folders, fileTree, binders, studySets]
  );

  return {
    deleteAsset,
  };
};
