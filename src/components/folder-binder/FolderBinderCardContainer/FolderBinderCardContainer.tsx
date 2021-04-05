import React, { useContext } from "react";
import styled from "styled-components/macro";
import FolderBinderAddCard from "../FolderBinderAddCard/FolderBinderAddCard";
import FolderBinderCard from "../FolderBinderCard/FolderBinderCard";
import { FILETREE_TYPES } from "../../../shared";
import { FileTreeContext, SelectedItemContext } from "../../../contexts";

interface FolderBinderCardContainerProps {}

const FolderBinderCardContainer: React.FC<FolderBinderCardContainerProps> = () => {
  const { getAsset, fileTree } = useContext(FileTreeContext);
  const { folderData, type, id, numOfStudySets, numOfBinders } = useContext(
    SelectedItemContext
  );

  const Cards = (type: FILETREE_TYPES) => {
    // if type = folders, create cards using binder data
    if (type === FILETREE_TYPES.FOLDER) {
      return numOfBinders &&
        numOfBinders > 0 &&
        folderData &&
        fileTree[folderData?.id]?.children
        ? Object.entries(fileTree[folderData?.id]?.children).map(
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
      // if type = binders, create cards with study set data
      return numOfStudySets &&
        numOfStudySets > 0 &&
        folderData &&
        fileTree[folderData?.id]?.children[id]?.children
        ? Object.entries(fileTree[folderData?.id]?.children[id]?.children).map(
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
        <FolderBinderAddCard id={id} type={type} />
        {Cards(type)}
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
  grid-row-gap: ${({ theme }) => theme.spacers.size32};
`;

export default FolderBinderCardContainer;
