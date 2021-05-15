import React, { useContext } from "react";
import styled from "styled-components/macro";
import { FILETREE_TYPES } from "../../../shared";
import { FileTreeContext, SelectedItemContext } from "../../../contexts";
import { FolderBinderAddCard, FolderBinderCard } from "..";

interface FolderBinderCardContainerProps {}

const FolderBinderCardContainer: React.FC<FolderBinderCardContainerProps> =
  () => {
    const { getAsset, fileTree } = useContext(FileTreeContext);
    const { folderData, type, id, numOfStudySets, numOfBinders } =
      useContext(SelectedItemContext);

    const Cards = (type: FILETREE_TYPES) => {
      // if type = folders, create cards using binder data
      if (type === FILETREE_TYPES.FOLDER) {
        return numOfBinders &&
          numOfBinders > 0 &&
          folderData &&
          fileTree[folderData?.id]?.children
          ? Object.entries(fileTree[folderData?.id]?.children).map((binder) => {
              const binderDetails = getAsset(
                binder[1].type,
                binder[0]
              ) as BinderInterface;
              return (
                binderDetails && (
                  <FolderBinderCard
                    key={binderDetails.id}
                    data={binderDetails}
                    type={type}
                  />
                )
              );
            })
          : null;
      } else {
        // if type = binders, create cards with study set data
        return numOfStudySets &&
          numOfStudySets > 0 &&
          folderData &&
          fileTree[folderData?.id]?.children[id]?.children
          ? Object.entries(
              fileTree[folderData?.id]?.children[id]?.children
            ).map((studySet) => {
              const studySetDetails = getAsset(
                studySet[1].type,
                studySet[0]
              ) as BinderInterface;
              return (
                studySetDetails && (
                  <FolderBinderCard
                    key={studySetDetails.id}
                    data={studySetDetails}
                    type={type}
                  />
                )
              );
            })
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
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  grid-row-gap: ${({ theme }) => theme.spacers.size32};
`;

export default FolderBinderCardContainer;
