import React, { useContext } from "react";
import styled from "styled-components";
import AddCard from "../AddCard/AddCard";
import FolderBinderCard from "../FolderBinderCard/FolderBinderCard";
import {
  FileTreeContext,
  FILETREE_TYPES,
} from "../../../contexts/FileTreeContext";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";

interface FolderBinderCardContainerProps {}

const FolderBinderCardContainer: React.FC<FolderBinderCardContainerProps> = () => {
  const { getAsset, fileTree } = useContext(FileTreeContext);
  const { folderData, type, id, numOfStudySets, numOfBinders } = useContext(
    SelectedItemContext
  );

  const returnComponent = (type: FILETREE_TYPES) => {
    if (type === FILETREE_TYPES.FOLDER) {
      return numOfBinders! > 0 && fileTree[folderData?.id!]?.children
        ? Object.entries(fileTree[folderData?.id!]?.children).map(
            (binder, index) => {
              const binderDetails = getAsset(
                binder[1].type,
                binder[0]
              ) as BinderInterface;
              return (
                <FolderBinderCard
                  key={`${binder[1].type} ${index}`}
                  data={binderDetails}
                  type={type}
                />
              );
            }
          )
        : null;
    } else {
      return numOfStudySets! > 0 &&
        fileTree[folderData?.id!]?.children[id]?.children
        ? Object.entries(fileTree[folderData?.id!]?.children[id]?.children).map(
            (studySet, index) => {
              const studySetDetails = getAsset(
                studySet[1].type,
                studySet[0]
              ) as BinderInterface;
              return (
                <FolderBinderCard
                  key={`${studySet[1].type} ${index}`}
                  data={studySetDetails}
                  type={type}
                />
              );
            }
          )
        : null;
    }
  };

  return (
    <StyledContainer>
      <>
        <AddCard id={id} type={type} />
        {folderData && returnComponent(type)}
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
