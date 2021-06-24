import { useAtom } from "jotai";
import { useCallback, useContext } from "react";
import { useMutation } from "react-query";
import { ThemeContext } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { addBinder } from "../services/file-structure/binders-api";
import { addFolder } from "../services/file-structure/folders-api";
import { addStudySet } from "../services/file-structure/studySets-api";
import { FILETREE_TYPES } from "../shared";
import { addAssetAtom, updateBlockOpenStateAtom, userAtom } from "../store";

export const useAsset = () => {
  const id = uuidv4();
  const theme = useContext(ThemeContext);
  const iconColor = theme.colors.primary;
  const itemName = "";
  const [, setAsset] = useAtom(addAssetAtom);
  const [, setIsBlockOpen] = useAtom(updateBlockOpenStateAtom);
  const [user] = useAtom(userAtom);

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

  const addAsset = useCallback(
    (type: string, folderId?: string, binderId?: string) => {
      const now = new Date();

      switch (type) {
        case FILETREE_TYPES.FOLDER:
          setAsset({
            newFileId: id,
            type,
            newFile: {
              id,
              type,
              owner_id: user?.id || "",
              color: iconColor,
              name: itemName,
              date_created: now,
              date_modified: now,
              children: {},
            },
          });
          _addFolder();
          break;

        case FILETREE_TYPES.BINDER:
          setAsset({
            newFileId: id,
            type,
            newFile: {
              id,
              type,
              folder_id: folderId,
              owner_id: user?.id || "",
              color: iconColor,
              name: itemName,
              date_created: now,
              date_modified: now,
              children: {},
            },
            folderId,
          });
          folderId &&
            setIsBlockOpen({
              fileTreeId: folderId,
              id: folderId,
              isOpen: true,
            });
          folderId && _addBinder(folderId);
          break;

        case FILETREE_TYPES.STUDY_SET:
          setAsset({
            newFileId: id,
            type,
            newFile: {
              id,
              type,
              binder_id: binderId,
              owner_id: user?.id || "",
              color: iconColor,
              name: itemName,
              date_created: now,
              date_modified: now,
              children: {},
            },
            folderId,
            binderId,
          });
          folderId &&
            binderId &&
            setIsBlockOpen({
              fileTreeId: folderId,
              id: binderId,
              isOpen: true,
            });
          binderId && _addStudySet(binderId);
          break;
        default:
          break;
      }
    },
    [
      id,
      setIsBlockOpen,
      setAsset,
      _addBinder,
      _addStudySet,
      _addFolder,
      user?.id,
      iconColor,
    ]
  );

  return {
    addAsset,
    assetId: id,
  };
};
