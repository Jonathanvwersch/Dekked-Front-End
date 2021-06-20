import React, { Fragment } from "react";
import SidebarEmptyBlock from "../SidebarEmptyBlock/SidebarEmptyBlock";
import SidebarBlock from "../SidebarBlock/SidebarBlock";
import { useAtom } from "jotai";
import { isBlockOpenAtom } from "../../../../store";
import { useGetAsset } from "../../../../helpers";

interface SidebarFileTreeProps {
  file: FileTreeInterface;
}

const SidebarFileTree: React.FC<SidebarFileTreeProps> = ({ file }) => {
  const [isBlockOpen] = useAtom(isBlockOpenAtom);
  const { getAsset } = useGetAsset();
  const fileId = Object.keys(file)[0];
  const folderData = getAsset(file[fileId].type, fileId) as FolderInterface;
  console.log("fileTree");

  return (
    <>
      {folderData ? (
        <>
          <SidebarBlock
            key={folderData.id}
            blockData={folderData}
            type={file[fileId].type}
          />
          {isBlockOpen[folderData.id] ? (
            Object.keys(file[fileId].children).length > 0 ? (
              Object.entries(file[fileId].children).map(
                (binder, binderIndex) => {
                  const binderData = getAsset(
                    binder[1].type,
                    binder[0]
                  ) as BinderInterface;
                  return (
                    <Fragment key={binderData?.id || binderIndex}>
                      <SidebarBlock
                        blockData={binderData}
                        type={binder[1].type}
                      />
                      {isBlockOpen[binder[0]] ? (
                        Object.entries(binder[1].children).length > 0 ? (
                          Object.entries(binder[1].children).map(
                            (studySet, index) => {
                              const studySetData = getAsset(
                                studySet[1].type,
                                studySet[0]
                              ) as StudyPackInterface;
                              return (
                                <SidebarBlock
                                  key={studySetData?.id || index}
                                  blockData={studySetData}
                                  type={studySet[1].type}
                                />
                              );
                            }
                          )
                        ) : (
                          <SidebarEmptyBlock type={binder[1].type} />
                        )
                      ) : null}
                    </Fragment>
                  );
                }
              )
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
