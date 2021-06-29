import React, { Fragment, useMemo } from "react";
import SidebarEmptyBlock from "../SidebarEmptyBlock/SidebarEmptyBlock";
import SidebarBlock from "../SidebarBlock/SidebarBlock";
import { useAtom } from "jotai";
import { selectBlockOpenStateFileTree } from "../../../../store";

interface SidebarFileTreeProps {
  file: FileTreeInterface;
}

const SidebarFileTree: React.FC<SidebarFileTreeProps> = ({ file }) => {
  const fileId = Object.keys(file)[0];
  const folderData = file?.[fileId];
  const [isBlockOpen] = useAtom(
    useMemo(() => selectBlockOpenStateFileTree(fileId), [fileId])
  );

  console.log(file);

  return (
    <>
      {folderData ? (
        <>
          <SidebarBlock
            key={folderData.id}
            blockType={folderData.type}
            blockId={folderData.id}
            blockColor={folderData.color}
            blockName={folderData.name}
            fileTreeId={fileId}
          />
          {isBlockOpen?.[folderData.id] ? (
            Object.keys(folderData.children).length > 0 ? (
              Object.entries(folderData.children).map((binder) => {
                return (
                  <Fragment key={binder[0]}>
                    <SidebarBlock
                      fileTreeId={fileId}
                      blockType={binder?.[1]?.type}
                      blockId={binder?.[1]?.id}
                      blockColor={binder?.[1]?.color}
                      blockFolderId={binder?.[1]?.folder_id}
                      blockName={binder?.[1]?.name}
                    />
                    {isBlockOpen?.[binder?.[1].id] ? (
                      Object.entries(binder[1].children).length > 0 ? (
                        Object.entries(binder[1].children).map((studySet) => {
                          return (
                            <SidebarBlock
                              key={studySet?.[0]}
                              blockType={studySet?.[1]?.type}
                              blockId={studySet?.[1]?.id}
                              blockColor={studySet?.[1]?.color}
                              blockName={studySet?.[1]?.name}
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

export default SidebarFileTree;
