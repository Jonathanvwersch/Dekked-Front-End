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

  return (
    <>
      <SidebarBlock
        blockData={getAsset(file[fileId].type, fileId)}
        type={file[fileId].type}
        setFolderOpen={setFolderOpen}
      />
      {folderOpen ? (
        Object.keys(file[fileId].children).length > 0 ? (
          Object.entries(file[fileId].children).map((binder) => (
            <Fragment key={binder[0]}>
              <SidebarBlock
                blockData={getAsset(binder[1].type, binder[0])}
                type={binder[1].type}
              />
              {Object.entries(binder[1].children).length > 0
                ? Object.entries(binder[1].children).map((studySet) => (
                    <SidebarBlock
                      blockData={getAsset(studySet[1].type, studySet[0])}
                      type={studySet[1].type}
                    />
                  ))
                : null}
            </Fragment>
          ))
        ) : (
          <SidebarEmptyBlock type={file[fileId].type} />
        )
      ) : null}
    </>
  );
};

export default SidebarFileTree;
