import { useAtom } from "jotai";
import { cloneDeep } from "lodash";
import { useCallback, useContext } from "react";
import { useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import {
  addBinder,
  deleteBinder,
  updateBinder,
} from "../services/file-structure/binders-api";
import {
  addFolder,
  deleteFolder,
  updateFolder,
} from "../services/file-structure/folders-api";
import {
  addStudySet,
  deleteStudySet,
  updateStudySet,
} from "../services/file-structure/studySets-api";
import { FILETREE_TYPES, Params } from "../shared";
import {
  bindersAtom,
  fileTreeAtom,
  foldersAtom,
  isBlockOpenAtom,
  studySetsAtom,
  userAtom,
} from "../store";

export const useAsset = () => {
  const id = uuidv4();
  const now = new Date();
  const theme = useContext(ThemeContext);
  const iconColor = theme.colors.primary;
  const { id: urlId } = useParams<Params>();
  const history = useHistory();
  const itemName = "";
  const [folders, setFolders] = useAtom(foldersAtom);
  const [binders, setBinders] = useAtom(bindersAtom);
  const [studySets, setStudySets] = useAtom(studySetsAtom);
  const [fileTree, setFileTree] = useAtom(fileTreeAtom);
  const [isBlockOpen, setIsBlockOpen] = useAtom(isBlockOpenAtom);
  const [user] = useAtom(userAtom);

  const { mutate: _addFolder } = useMutation(
    "add-folder",
    () => addFolder({ id, name: itemName, color: iconColor }),
    {
      retry: 3,
    }
  );

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

  const { mutate: _deleteFolder } = useMutation(
    "delete-folder",
    (folderId: string) => deleteFolder(folderId),
    {
      retry: 3,
    }
  );

  const { mutate: _addBinder } = useMutation(
    "add-binder",
    (folderId: string) =>
      addBinder({ id, name: itemName, color: iconColor, folder_id: folderId }),
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

  const { mutate: _deleteBinder } = useMutation(
    "delete-binder",
    (binderId: string) => deleteBinder(binderId),
    {
      retry: 3,
    }
  );

  const { mutate: _addStudySet } = useMutation(
    "add-study-set",
    (binderId: string) =>
      addStudySet({
        id,
        name: itemName,
        color: iconColor,
        binder_id: binderId,
      }),
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

  const { mutate: _deleteStudySet } = useMutation(
    "delete-study-set",
    (studySetId: string) => deleteStudySet(studySetId),
    {
      retry: 3,
    }
  );

  const openAsset = (id: string, isOpen?: boolean) => {
    if (isOpen && isOpen === isBlockOpen[id]) return;

    let fileCopy = { ...isBlockOpen };
    if (isOpen === true || isOpen === false) {
      fileCopy[id] = isOpen;
    } else {
      fileCopy[id] = !fileCopy[id];
    }
    setIsBlockOpen(fileCopy);
  };

  const addAsset = (type: string, parentId?: string) => {
    switch (type) {
      case FILETREE_TYPES.FOLDER: {
        if (fileTree && folders) {
          fileTree[id] = {
            type,
            children: {},
          };
          folders[id] = {
            date_created: now,
            date_modified: now,
            id,
            owner_id: user?.id || "",
            color: iconColor,
            name: itemName,
          };
          setFileTree(cloneDeep(fileTree));
          setFolders(cloneDeep(folders));
          parentId && openAsset(parentId, true);
          _addFolder();
        }
        break;
      }

      case FILETREE_TYPES.BINDER:
        if (parentId && fileTree && binders) {
          fileTree[parentId] = {
            type: FILETREE_TYPES.FOLDER,
            children: {
              ...fileTree[parentId].children,
              [id]: {
                type,
                children: {},
              },
            },
          };
          binders[id] = {
            date_created: now,
            date_modified: now,
            id,
            owner_id: user?.id || "",
            color: iconColor,
            name: itemName,
            folder_id: parentId,
          };
          setFileTree(cloneDeep(fileTree));
          setBinders(cloneDeep(binders));
          parentId && openAsset(parentId, true);
          _addBinder(parentId);
        }
        break;

      case FILETREE_TYPES.STUDY_SET:
        if (parentId && binders && fileTree && studySets) {
          const folderId = binders[parentId].folder_id;
          fileTree[folderId] = {
            type: FILETREE_TYPES.FOLDER,
            children: {
              ...fileTree[folderId].children,
              [parentId]: {
                type: FILETREE_TYPES.BINDER,
                children: {
                  ...fileTree[folderId].children[parentId].children,
                  [id]: {
                    type,
                    children: {},
                  },
                },
              },
            },
          };
          studySets[id] = {
            date_created: now,
            date_modified: now,
            id,
            owner_id: user?.id || "",
            color: iconColor,
            name: itemName,
            binder_id: parentId,
          };
          setFileTree(cloneDeep(fileTree));
          setStudySets(cloneDeep(studySets));
          parentId && openAsset(parentId, true);
          _addStudySet(parentId);
        }
        break;
      default:
        break;
    }
  };

  const updateAsset = (
    type: string,
    assetId: string,
    updateData: {
      color?: string;
      name?: string;
    }
  ) => {
    const now = new Date();

    switch (type) {
      case FILETREE_TYPES.FOLDER:
        if (folders) {
          folders[assetId] = {
            ...folders[assetId],
            ...updateData,
            date_modified: now,
          };
          _updateFolder({ folderId: assetId, updateData });
        }
        break;

      case FILETREE_TYPES.BINDER:
        if (binders) {
          binders[assetId] = {
            ...binders[assetId],
            ...updateData,
          };
          _updateBinder({ binderId: assetId, updateData });
        }
        break;

      case FILETREE_TYPES.STUDY_SET:
        if (studySets) {
          studySets[assetId] = {
            ...studySets[assetId],
            ...updateData,
          };
          _updateStudySet({ studySetId: assetId, updateData });
        }
        break;

      default:
        break;
    }
  };

  const deleteAsset = (type: string, assetId: string) => {
    const shouldRedirect = urlId === assetId;
    switch (type) {
      case FILETREE_TYPES.FOLDER:
        if (fileTree && folders && studySets) {
          // delete folder on client side
          // not deleting if last folder item
          delete folders[assetId];
          delete fileTree[assetId];

          if (Object.keys(folders).length === 0) {
            addAsset(type);
          }

          setFolders(cloneDeep(folders));
          setFileTree(cloneDeep(fileTree));

          // navigate to first folder after deleting a folder
          const firstFolderId = Object.keys(fileTree)[0];
          const firstFolderLink = `/${FILETREE_TYPES.FOLDER}/${firstFolderId}`;

          shouldRedirect ||
            ((binders?.[studySets?.[urlId]?.binder_id]?.folder_id === assetId ||
              binders?.[urlId]?.folder_id === assetId) &&
              history.push(firstFolderLink));
        }
        return _deleteFolder(assetId);

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
          const numberOfBinders = Object.keys(
            fileTree?.[parentFolder?.id]?.children
          )?.length;

          delete binders[assetId];
          delete fileTree[parentFolder?.id].children[assetId];
          // delete binder on client side
          setBinders(cloneDeep(binders));
          setFileTree(cloneDeep(fileTree));

          if (numberOfBinders === 1) {
            openAsset(parentFolderId, false);
          }
        }
        return _deleteBinder(assetId);

      case FILETREE_TYPES.STUDY_SET:
        if (binders && fileTree && studySets) {
          // navigate to parent binder after deleting a study pack
          const parentBinder = binders[studySets?.[assetId]?.binder_id];
          const parentBinderId = parentBinder?.id;

          const parentBinderLink = `/${FILETREE_TYPES.BINDER}/${parentBinderId}`;
          shouldRedirect && history.push(parentBinderLink);

          // Close binder if you are deleting last study set
          // makes for cleaner UX
          const numberOfStudySets = Object.keys(
            fileTree?.[parentBinder?.folder_id]?.children?.[parentBinderId]
              ?.children
          )?.length;

          // delete study pack on client side
          delete studySets[assetId];
          delete fileTree[parentBinder?.folder_id]?.children[parentBinderId]
            .children[assetId];
          setStudySets(cloneDeep(studySets));
          setFileTree(cloneDeep(fileTree));

          if (numberOfStudySets === 1) {
            openAsset(parentBinderId, false);
          }
        }
        return _deleteStudySet(assetId);

      default:
        break;
    }
  };

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
    addAsset,
    updateAsset,
    deleteAsset,
    getAsset,
    openAsset,
  };
};
