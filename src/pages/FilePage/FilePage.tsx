import React from "react";
import { useParams } from "react-router-dom";
import { BinderPage, FolderPage } from "..";
import { FILETREE_TYPES, Params } from "../../shared";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

interface FilePageProps {}

const FilePage: React.FC<FilePageProps> = () => {
  const { type } = useParams<Params>();
  return (
    <>
      {type === FILETREE_TYPES.FOLDER ? (
        <FolderPage />
      ) : type === FILETREE_TYPES.BINDER ? (
        <BinderPage />
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default FilePage;
