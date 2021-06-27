import React, { Fragment, useMemo } from "react";
import SidebarEmptyBlock from "../SidebarEmptyBlock/SidebarEmptyBlock";
import SidebarBlock from "../SidebarBlock/SidebarBlock";
import { useAtom } from "jotai";
import { selectBlockOpenStateFileTree } from "../../../../store";
import { isEqual } from "lodash";

interface SidebarFileTreeProps {
  file: FileTreeInterface;
}

const SidebarFileTree: React.FC<SidebarFileTreeProps> = ({ file }) => {
  const fileId = Object.keys(file)[0];
  const folderData = file?.[fileId];
  const [isBlockOpen] = useAtom(
    useMemo(() => selectBlockOpenStateFileTree(fileId), [fileId])
  );

  return (
    <>
      {folderData ? (
        <>
          <SidebarBlock
            key={folderData.id}
            blockData={folderData}
            type={file?.[fileId]?.type}
            fileTreeId={fileId}
          />
          {isBlockOpen?.[folderData?.id] ? (
            Object.keys(file[fileId].children).length > 0 ? (
              Object.entries(file[fileId].children).map((binder) => {
                return (
                  <Fragment key={binder[0]}>
                    <SidebarBlock
                      blockData={binder?.[1]}
                      type={binder?.[1]?.type}
                      fileTreeId={fileId}
                    />
                    {isBlockOpen?.[binder?.[1].id] ? (
                      Object.entries(binder[1].children).length > 0 ? (
                        Object.entries(binder[1].children).map((studySet) => {
                          return (
                            <SidebarBlock
                              key={studySet?.[0]}
                              blockData={studySet?.[1]}
                              type={studySet[1].type}
                              fileTreeId={fileId}
                            />
                          );
                        })
                      ) : (
                        <SidebarEmptyBlock type={binder[1].type} />
                      )
                    ) : null}
                  </Fragment>
                );
              })
            ) : (
              <SidebarEmptyBlock type={file[fileId].type} />
            )
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default React.memo(SidebarFileTree, (oldProps, newProps) => {
  return isEqual(oldProps, newProps);
});
