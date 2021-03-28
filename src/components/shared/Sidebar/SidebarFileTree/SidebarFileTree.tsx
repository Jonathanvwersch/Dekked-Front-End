import React, { Fragment, useContext, useState } from "react";
import SidebarEmptyBlock from "../SidebarEmptyBlock/SidebarEmptyBlock";
import SidebarBlock from "../SidebarBlock/SidebarBlock";
import { FileTreeContext } from "../../../../contexts";

interface SidebarFileTreeProps {
  file: FileTreeInterface;
}

const SidebarFileTree: React.FC<SidebarFileTreeProps> = ({ file }) => {
  const { getAsset } = useContext(FileTreeContext);
  const fileId = Object.keys(file)[0];
  const [folderOpen, setFolderOpen] = useState<boolean>();
  const [binderOpen, setBinderOpen] = useState<{ [id: string]: boolean }>({});
  const folderData = getAsset(file[fileId].type, fileId) as FolderInterface;

  const handleOpenBinder = (id: string, isOpen?: boolean) => {
    const binderCopy = { ...binderOpen };
    if (isOpen === true || isOpen === false) {
      binderCopy[id] = isOpen;
    } else {
      binderCopy[id] = !binderCopy[id];
    }
    setBinderOpen(binderCopy);
  };

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
                <SidebarBlock
                  handleOpenBinder={handleOpenBinder}
                  blockData={binderData}
                  type={binder[1].type}
                />
                {binderOpen[binder[0]] ? (
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
  ) : null;
};

export default SidebarFileTree;
