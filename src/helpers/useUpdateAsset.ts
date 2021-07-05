import { useAtom } from "jotai";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { updateAsset } from "../services/file-structure/asset-api";
import { updateAssetAtom } from "../store";

export const useUpdateAsset = () => {
  const [, setAsset] = useAtom(updateAssetAtom);

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
