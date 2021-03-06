import React from "react";
import { useParams } from "react-router-dom";
import { StudySetPage } from "..";
import { FILETREE_TYPES } from "../../contexts/FileTreeContext";
import BinderPage from "../BinderPage/BinderPage";
import FolderPage from "../FolderPage/FolderPage";

const OptionsPage: React.FC = () => {
  const { type } = useParams<{ id: string; type: FILETREE_TYPES }>();
  const handlePageType = () => {
    if (type === FILETREE_TYPES.FOLDER) return <FolderPage />;
    else if (type === FILETREE_TYPES.BINDER) return <BinderPage />;
    else return <StudySetPage />;
  };

  return handlePageType();
};

export default OptionsPage;
