import { useAtom } from "jotai";
import { useCallback, useContext } from "react";
import { useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { addBinder, addFolder, addStudySet } from "../api";
import { FILETREE_TYPES, Params, TAB_TYPE } from "../shared";
import { addAssetAtom, updateBlockOpenStateAtom, userAtom } from "../store";

export const useAddAsset = () => {
  const id = uuidv4();
  const theme = useContext(ThemeContext);
  const iconColor = theme.colors.primary;
  const { studyModes } = useParams<Params>();
  const itemName = "";
  const history = useHistory();
  const [, setAsset] = useAtom(addAssetAtom);
  const [, setIsBlockOpen] = useAtom(updateBlockOpenStateAtom);
  const [user] = useAtom(userAtom);
  const { mutate: _addFolder } = useMutation("add-folder", () =>
    addFolder({ id, name: itemName, color: iconColor })
  );

  const { mutate: _addBinder } = useMutation("add-binder", (folderId: string) =>
    addBinder({ id, name: itemName, color: iconColor, folder_id: folderId })
  );

  const { mutate: _addStudySet } = useMutation(
    "add-study-set",
    (binderId: string) =>
      addStudySet({
        id,
        name: itemName,
        color: iconColor,
        binder_id: binderId,
      })
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
              date_created: now.toDateString(),
              date_modified: now.toDateString(),
              children: {},
            },
          });
          _addFolder();
          !studyModes && history.push(`/${FILETREE_TYPES.FOLDER}/${id}`);

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
              date_created: now.toDateString(),
              date_modified: now.toDateString(),
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
          !studyModes && history.push(`/${FILETREE_TYPES.BINDER}/${id}`);

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
              date_created: now.toDateString(),
              date_modified: now.toDateString(),
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
          !studyModes &&
            history.push(
              `/${FILETREE_TYPES.STUDY_SET}/${id}/${TAB_TYPE.NOTES}`
            );
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
      history,
      studyModes,
    ]
  );

  return {
    addAsset,
    assetId: id,
  };
};
