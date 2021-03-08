import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AddCard from "../../components/unique/main-frame/folder-binder/AddCard";
import FolderBinderCard from "../../components/unique/main-frame/folder-binder/FolderBinderCard";
import {
  FileTreeContext,
  FILETREE_TYPES,
} from "../../contexts/FileTreeContext";

interface FolderBinderCardContainerProps {}

const FolderBinderCardContainer: React.FC<FolderBinderCardContainerProps> = () => {
  const [folderData, setFolderData] = useState<FolderInterface>();
  const [binderData, setBinderData] = useState<BinderInterface>();
  const { type, id } = useParams<{ type: FILETREE_TYPES; id: string }>();
  const { getAsset, fileTree } = useContext(FileTreeContext);

  useEffect(() => {
    if (type === FILETREE_TYPES.FOLDER) {
      setFolderData(getAsset(type, id) as FolderInterface);
    } else if (type === FILETREE_TYPES.BINDER) {
      setBinderData(getAsset(type, id) as BinderInterface);
      setFolderData(
        getAsset(
          FILETREE_TYPES.FOLDER,
          binderData?.folder_id!
        ) as FolderInterface
      );
    }
  }, [id, binderData, folderData, getAsset, type]);

  return (
    <StyledContainer>
      <>
        <AddCard id={id} type={type} />
        {folderData
          ? type === FILETREE_TYPES.FOLDER
            ? Object.entries(fileTree[folderData?.id!].children).map(
                (binder) => {
                  const binderDetails = getAsset(
                    binder[1].type,
                    binder[0]
                  ) as BinderInterface;
                  return <FolderBinderCard data={binderDetails} type={type} />;
                }
              )
            : Object.entries(
                fileTree[folderData?.id!].children[id].children
              ).map((studySet) => {
                const studySetDetails = getAsset(
                  studySet[1].type,
                  studySet[0]
                ) as BinderInterface;
                return <FolderBinderCard data={studySetDetails} type={type} />;
              })
          : null}
      </>
    </StyledContainer>
  );
};

const StyledContainer = styled.div<FolderBinderCardContainerProps>`
  flex-shrink: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-row-gap: 32px;
`;

export default FolderBinderCardContainer;
