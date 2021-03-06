import React, { Fragment, useContext, useState } from "react";
import { FileTreeContext } from "../../../contexts/FileTreeContext";
import SidebarEmptyBlock from "./SidebarEmptyBlock";
import SidebarBlock from "./SidebarBlock";

interface SidebarFileTreeProps {
  file: FileTreeInterface;
}

const SidebarFileTree: React.FC<SidebarFileTreeProps> = ({ file }) => {
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
        folderData={folderData}
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
                <SidebarBlock
                  blockData={binderData}
                  type={binder[1].type}
                  folderData={folderData}
                  binderData={binderData}
                />

                {Object.entries(binder[1].children).length > 0
                  ? Object.entries(binder[1].children).map((studySet) => {
                      const studySetData = getAsset(
                        studySet[1].type,
                        studySet[0]
                      ) as StudyPackInterface;
                      return (
                        <SidebarBlock
                          key={studySet[0]}
                          blockData={getAsset(studySet[1].type, studySet[0])}
                          type={studySet[1].type}
                          folderData={folderData}
                          binderData={binderData}
                          studySetData={studySetData}
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

export default SidebarFileTree;
