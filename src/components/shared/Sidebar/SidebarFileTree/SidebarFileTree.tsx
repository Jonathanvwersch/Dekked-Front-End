import React, { Fragment, useContext } from "react";
import SidebarEmptyBlock from "../SidebarEmptyBlock/SidebarEmptyBlock";
import SidebarBlock from "../SidebarBlock/SidebarBlock";
import { FileTreeContext, SidebarContext } from "../../../../contexts";
import { isEqual } from "lodash";

interface SidebarFileTreeProps {
  file: FileTreeInterface;
}

const SidebarFileTree: React.FC<SidebarFileTreeProps> = ({ file }) => {
  const { getAsset } = useContext(FileTreeContext);
  const { isBlockOpen } = useContext(SidebarContext);
  const fileId = Object.keys(file)[0];
  const folderData = getAsset(file[fileId].type, fileId) as FolderInterface;

  return (
    <>
      {folderData ? (
        <>
          <SidebarBlock blockData={folderData} type={file[fileId].type} />
          {isBlockOpen[folderData.id] ? (
            Object.keys(file[fileId].children).length > 0 ? (
              Object.entries(file[fileId].children).map((binder) => {
                const binderData = getAsset(
                  binder[1].type,
                  binder[0]
                ) as BinderInterface;
                return (
                  <Fragment key={binder[0]}>
                    <SidebarBlock
                      blockData={binderData}
                      type={binder[1].type}
                    />
                    {isBlockOpen[binder[0]] ? (
                      Object.entries(binder[1].children).length > 0 ? (
                        Object.entries(binder[1].children).map((studySet) => {
                          const studySetData = getAsset(
                            studySet[1].type,
                            studySet[0]
                          ) as StudyPackInterface;
                          return (
                            <SidebarBlock
                              key={studySet[0]}
                              blockData={studySetData}
                              type={studySet[1].type}
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

export default React.memo(SidebarFileTree, (prevProps, newProps) => {
  return isEqual(prevProps.file, newProps.file);
});
