import { useAtom } from "jotai";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { getSessionCookie } from ".";
import { updateAsset } from "../api/file-structure/assetsApi";
import { updateAssetAtom } from "../store";

export const useUpdateAsset = () => {
  const [, setAsset] = useAtom(updateAssetAtom);
  const queryClient = useQueryClient();

  const { mutate: _updateAsset } = useMutation(
    "update-study-set",
    ({
      fileId,
      updateData,
      type,
    }: {
      fileId: string;
      type: string;
      updateData: {
        color?: string;
        name?: string;
      };
    }) =>
      updateAsset(fileId, type, {
        name: updateData.name,
        color: updateData.color,
      }),
    {
      retry: 3,
      onSuccess: () => {
        queryClient.refetchQueries(
          `${getSessionCookie()}-get-all-due-sr-decks`
        );
      },
    }
  );

  const updateItem = useCallback(
    (
      assetId: string,
      type: string,
      updateData: {
        color?: string;
        name?: string;
      },
      noRequest?: boolean
    ) => {
      const dateModified = new Date();
      setAsset({
        fileId: assetId,
        type,
        color: updateData.color,
        name: updateData.name,
        dateModified,
      });

      !noRequest && _updateAsset({ fileId: assetId, type, updateData });
    },
    [setAsset, _updateAsset]
  );

  return {
    updateItem,
  };
};
