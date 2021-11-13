import React from "react";
import styled from "styled-components";
import { FILETREE_TYPES, Params } from "../../../shared";
import { FolderBinderCard } from "..";
import { bindersAtom, fileTreeAtom, isAppLoadingAtom } from "../../../store";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FileContainer } from "../..";

interface FolderBinderCardContainerProps {}

const FolderBinderCardContainer: React.FC<FolderBinderCardContainerProps> =
  () => {
    const [fileTree] = useAtom(fileTreeAtom);
    const { id, type } = useParams<Params>();
    const [binders] = useAtom(bindersAtom);
    const [isLoading] = useAtom(isAppLoadingAtom);
    const folderId = binders?.[id]?.folder_id;

    const Cards = (type: FILETREE_TYPES) => {
      // if type = folders, create cards using binder data
      if (type === FILETREE_TYPES.FOLDER) {
        return fileTree && fileTree[id]?.children
          ? Object.entries(fileTree[id]?.children).map(
              (binder) =>
                binder?.[1] && (
                  <FolderBinderCard
                    key={binder?.[0]}
                    color={binder?.[1]?.color}
                    name={binder?.[1]?.name}
                    id={binder?.[1]?.id}
                    dateModified={binder?.[1]?.date_modified}
                    type={binder?.[1]?.type as FILETREE_TYPES}
                    unsetWidth
                  />
                )
            )
          : null;
      } else {
        // if type = binders, create cards with study set data
        return folderId &&
          fileTree &&
          fileTree[folderId]?.children[id]?.children
          ? Object.entries(fileTree[folderId]?.children[id]?.children).map(
              (studySet) =>
                studySet?.[1] && (
                  <FolderBinderCard
                    key={studySet?.[0]}
                    color={studySet?.[1]?.color}
                    name={studySet?.[1]?.name}
                    id={studySet?.[1]?.id}
                    dateModified={
                      studySet?.[1]?.date_modified as unknown as string
                    }
                    type={studySet?.[1]?.type as FILETREE_TYPES}
                    unsetWidth
                  />
                )
            )
          : null;
      }
    };

    return (
      <>
        {!isLoading ? (
          <FileContainer width="210px">{Cards(type)}</FileContainer>
        ) : (
          <StyledSkeleton height="90px" count={2} />
        )}
      </>
    );
  };

const StyledSkeleton = styled(Skeleton)`
  margin-right: ${({ theme }) => theme.spacers.size32};
`;

export default React.memo(FolderBinderCardContainer);
