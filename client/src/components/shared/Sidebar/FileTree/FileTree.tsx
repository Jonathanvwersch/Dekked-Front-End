import React, { Fragment, useContext, useState } from "react";
import { FileTreeContext } from "../../../../contexts/FileTreeContext";
import SidebarEmptyBlock from "../EmptyBlock/EmptyBlock";
import SidebarBlock from "../Block/Block";

interface FileTreeProps {
  file: FileTreeInterface;
}

const FileTree: React.FC<FileTreeProps> = ({ file }) => {
  const { getAsset } = useContext(FileTreeContext);
  const fileId = Object.keys(file)[0];
  const [folderOpen, setFolderOpen] = useState<boolean>(false);
  const folderData = getAsset(file[fileId].type, fileId) as FolderInterface;

  return fileId ? (
    <>
      <SidebarBlock
        blockData={folderData}
        type={file[fileId].type}
        setFolderOpen={setFolderOpen}
      />
      {folderOpen ? (
        Object.keys(file[fileId].children).length > 0 ? (
          Object.entries(file[fileId].children).map((binder) => {
            const binderData = getAsset(
              binder[1].type,
              binder[0]
            ) as BinderInterface;
            return (
              <Fragment key={binder[0]}>
                <SidebarBlock blockData={binderData} type={binder[1].type} />

                {Object.entries(binder[1].children).length > 0
                  ? Object.entries(binder[1].children).map((studySet) => {
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
                  : null}
              </Fragment>
            );
          })
        ) : (
          <SidebarEmptyBlock type={file[fileId].type} />
        )
      ) : null}
    </>
  ) : null;
};

export default FileTree;
