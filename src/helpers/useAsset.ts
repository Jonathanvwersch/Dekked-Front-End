import { useAtom } from "jotai";
import { cloneDeep } from "lodash";
import { useCallback, useContext } from "react";
import { useMutation } from "react-query";
import { ThemeContext } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { addBinder } from "../services/file-structure/binders-api";
import { addFolder } from "../services/file-structure/folders-api";
import { addStudySet } from "../services/file-structure/studySets-api";
import { FILETREE_TYPES } from "../shared";
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
  const theme = useContext(ThemeContext);
  const iconColor = theme.colors.primary;
  const itemName = "";
  const [folders, setFolders] = useAtom(foldersAtom);
  const [binders, setBinders] = useAtom(bindersAtom);
  const [studySets, setStudySets] = useAtom(studySetsAtom);
  const [fileTree, setFileTree] = useAtom(fileTreeAtom);
  const [isBlockOpen, setIsBlockOpen] = useAtom(isBlockOpenAtom);
  const [user] = useAtom(userAtom);
  console.log("useAsset");

  const { mutate: _addFolder } = useMutation(
    "add-folder",
    () => addFolder({ id, name: itemName, color: iconColor }),
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

  const openAsset = useCallback(
    (id: string, isOpen?: boolean) => {
      console.log("openAsset");

      if (isOpen && isOpen === isBlockOpen[id]) return;

      let fileCopy = { ...isBlockOpen };
      if (isOpen === true || isOpen === false) {
        fileCopy[id] = isOpen;
      } else {
        fileCopy[id] = !fileCopy[id];
      }
      setIsBlockOpen(fileCopy);
    },
    [isBlockOpen, setIsBlockOpen]
  );

  const addAsset = useCallback(
    (type: string, parentId?: string) => {
      const now = new Date();
      console.log("addAsset");

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
    },
    [folders, fileTree, binders, studySets]
  );

  return {
    addAsset,
    openAsset,
  };
};
