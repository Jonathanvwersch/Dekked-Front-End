import React, { Fragment, useContext } from "react";
import { FileTreeContext } from "../../contexts/FileTreeContext";
import { VerticalFlexContainer } from "../common";
import SidebarBlock from "./SidebarBlock";

interface SidebarFileTreeProps {
  file: FileTreeInterface;
}

const SidebarFileTree: React.FC<SidebarFileTreeProps> = ({ file }) => {
  const { getAsset } = useContext(FileTreeContext);
  const fileId = Object.keys(file)[0];

  return (
    <VerticalFlexContainer>
      <SidebarBlock
        blockData={getAsset(file[fileId].type, fileId)}
        type={file[fileId].type}
      />
      {Object.keys(file[fileId].children).length
        ? [file[fileId].children].map((binder: FileTreeInterface) => (
            <Fragment key={fileId}>
              <SidebarBlock
                blockData={getAsset(
                  binder[Object.keys(binder)[0]].type,
                  Object.keys(binder)[0]
                )}
                type={binder[Object.keys(binder)[0]].type}
              />
              {[binder[Object.keys(binder)[0]].children].map(
                (studyPack: FileTreeInterface) => (
                  <SidebarBlock
                    blockData={getAsset(
                      studyPack[Object.keys(studyPack)[0]].type,
                      Object.keys(studyPack)[0]
                    )}
                    type={studyPack[Object.keys(studyPack)[0]].type}
                  />
                )
              )}
            </Fragment>
          ))
        : null}
    </VerticalFlexContainer>
  );
};

export default SidebarFileTree;
