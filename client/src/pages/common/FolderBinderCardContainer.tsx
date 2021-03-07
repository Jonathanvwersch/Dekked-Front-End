import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { InsetPage } from "../../components/common";
import AddCard from "../../components/unique/main-frame/folder-binder/AddCard";
import FolderBinderCard from "../../components/unique/main-frame/folder-binder/FolderBinderCard";
import {
  FileTreeContext,
  FILETREE_TYPES,
} from "../../contexts/FileTreeContext";

interface FolderBinderCardContainerProps {}

interface LocationProps {
  name: string;
  color: string;
  folderData: FolderInterface;
  binderData: BinderInterface;
  studySetData: StudyPackInterface;
}

const FolderBinderCardContainer: React.FC<FolderBinderCardContainerProps> = () => {
  const location = useLocation<LocationProps>();
  const { getAsset, fileTree } = useContext(FileTreeContext);
  const { type, id } = useParams<{ type: FILETREE_TYPES; id: string }>();

  return (
    <StyledContainer>
      {location.state ? (
        <>
          <AddCard id={id} type={type} />
          {type === FILETREE_TYPES.FOLDER
            ? Object.entries(
                fileTree[location.state.folderData.id].children
              ).map((binder) => {
                const binderData = getAsset(
                  binder[1].type,
                  binder[0]
                ) as BinderInterface;
                return <FolderBinderCard data={binderData} type={type} />;
              })
            : Object.entries(
                fileTree[location.state.folderData.id].children[id].children
              ).map((binder) => {
                const binderData = getAsset(
                  binder[1].type,
                  binder[0]
                ) as BinderInterface;
                return <FolderBinderCard data={binderData} type={type} />;
              })}
        </>
      ) : null}
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
