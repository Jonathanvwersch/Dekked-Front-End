import React, { useContext } from "react";
import styled from "styled-components";
import { FILETREE_TYPES } from "../../../shared";
import { SelectedItemContext } from "../../../contexts";
import { FolderBinderAddCard, FolderBinderCard } from "..";
import { bindersAtom, fileTreeAtom, studySetsAtom } from "../../../store";
import { useAtom } from "jotai";
import { useAsset } from "../../../helpers";

interface FolderBinderCardContainerProps {}

const FolderBinderCardContainer: React.FC<FolderBinderCardContainerProps> =
  () => {
    const [fileTree] = useAtom(fileTreeAtom);
    const [binders] = useAtom(bindersAtom);
    const [studySets] = useAtom(studySetsAtom);
    const numOfBinders = binders ? Object.keys(binders).length : 0;
    const numOfStudySets = studySets ? Object.keys(studySets).length : 0;
    const { getAsset } = useAsset();
    const { folderData, type, id } = useContext(SelectedItemContext);

    const Cards = (type: FILETREE_TYPES) => {
      // if type = folders, create cards using binder data
      if (type === FILETREE_TYPES.FOLDER) {
        return numOfBinders &&
          numOfBinders > 0 &&
          folderData &&
          fileTree &&
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
          fileTree &&
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
