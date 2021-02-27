import React, { Fragment, useContext, useState } from "react";
import { FileTreeContext } from "../../contexts/FileTreeContext";
import { VerticalFlexContainer } from "../common";
import EmptyBlock from "./EmptyBlock";
import SidebarBlock from "./SidebarBlock";

interface SidebarFileTreeProps {
  file: FileTreeInterface;
}

const SidebarFileTree: React.FC<SidebarFileTreeProps> = ({ file }) => {
  const { getAsset } = useContext(FileTreeContext);
  const fileId = Object.keys(file)[0];
  const [folderOpen, setFolderOpen] = useState<boolean>(false);
  const [binderOpen, setBinderOpen] = useState<boolean>(false);

  return (
    <VerticalFlexContainer>
      <SidebarBlock
        blockData={getAsset(file[fileId].type, fileId)}
        type={file[fileId].type}
        openBlock={() => setFolderOpen((prevState) => !prevState)}
      />
      {folderOpen ? (
        Object.keys(file[fileId].children).length > 0 ? (
          Object.entries(file[fileId].children).map((binder) => (
            <Fragment key={binder[0]}>
              <SidebarBlock
                blockData={getAsset(binder[1].type, binder[0])}
                type={binder[1].type}
                openBlock={() => setBinderOpen((prevState) => !prevState)}
              />
              {binderOpen ? (
                Object.entries(binder[1].children).length > 0 ? (
                  Object.entries(binder[1].children).map((studyPack) => (
                    <SidebarBlock
                      blockData={getAsset(studyPack[1].type, studyPack[0])}
                      type={studyPack[1].type}
                    />
                  ))
                ) : (
                  <EmptyBlock type={binder[1].type} />
                )
              ) : null}
            </Fragment>
          ))
        ) : (
          <EmptyBlock type={file[fileId].type} />
        )
      ) : null}
    </VerticalFlexContainer>
  );
};

export default SidebarFileTree;
