import React, { useContext } from "react";
import styled from "styled-components";
import { FILETREE_TYPES, Params } from "../../../shared";
import { SelectedItemContext } from "../../../contexts";
import { FolderBinderAddCard, FolderBinderCard } from "..";
import { fileTreeAtom, isAppLoadingAtom, typeAtom } from "../../../store";
import { useAtom } from "jotai";
import { useGetAsset } from "../../../helpers";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

interface FolderBinderCardContainerProps {}

const FolderBinderCardContainer: React.FC<FolderBinderCardContainerProps> =
  () => {
    const [fileTree] = useAtom(fileTreeAtom);
    const { getNumberOfChildAssets } = useGetAsset("folderbindercarcontainer");
    const [type] = useAtom(typeAtom);
    const { id } = useParams<Params>();
    const { folderData } = useContext(SelectedItemContext);
    const numOfItems = getNumberOfChildAssets(type, id);
    const [isLoading] = useAtom(isAppLoadingAtom);

    const Cards = (type: FILETREE_TYPES) => {
      // if type = folders, create cards using binder data
      if (type === FILETREE_TYPES.FOLDER) {
        return numOfItems &&
          numOfItems > 0 &&
          folderData &&
          fileTree &&
          fileTree[folderData?.id]?.children
          ? Object.entries(fileTree[folderData?.id]?.children).map((binder) => {
              return (
                binder?.[1] && (
                  <FolderBinderCard
                    key={binder?.[0]}
                    data={binder?.[1]}
                    type={binder?.[1].type as FILETREE_TYPES}
                  />
                )
              );
            })
          : null;
      } else {
        // if type = binders, create cards with study set data
        return numOfItems &&
          numOfItems > 0 &&
          folderData &&
          fileTree &&
          fileTree[folderData?.id]?.children[id]?.children
          ? Object.entries(
              fileTree[folderData?.id]?.children[id]?.children
            ).map((studySet) => {
              return (
                studySet?.[1] && (
                  <FolderBinderCard
                    key={studySet?.[0]}
                    data={studySet?.[1]}
                    type={type}
                  />
                )
              );
            })
          : null;
      }
    };

    return (
      <>
        {!isLoading ? (
          <StyledContainer>
            <FolderBinderAddCard id={id} type={type} />
            {Cards(type)}
          </StyledContainer>
        ) : (
          <StyledSkeleton width="160px" height="180px" count={3} />
        )}
      </>
    );
  };

const StyledSkeleton = styled(Skeleton)`
  margin-right: ${({ theme }) => theme.spacers.size32};
`;

const StyledContainer = styled.div<FolderBinderCardContainerProps>`
  flex-shrink: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 0.5fr));
  grid-row-gap: ${({ theme }) => theme.spacers.size32};
`;

export default FolderBinderCardContainer;
