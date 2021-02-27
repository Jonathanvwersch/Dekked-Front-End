/// <reference types="react-scripts" />

interface FileTreeInterface {
  [instance_id: string]: {
    type: string;
    children: FileTreeInterface;
  };
}

interface BinderInterface {
  id: string;
  owner_id: string;
  folder_id: string;
  name: string;
  color: string;
}

interface FolderInterface {
  id: string;
  owner_id: string;
  name: string;
  date_created: Date;
  date_modified: Date;
  color: string;
}

interface StudyPackInterface {
  id: string;
  owner_id: string;
  binder_id: string;
  name: string;
  color: string;
}
