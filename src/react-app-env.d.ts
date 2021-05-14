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
  date_created: Date;
  date_modified: Date;
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
  date_created: Date;
  date_modified: Date;
  name: string;
  color: string;
}

interface PageInterface {
  id?: string;
  owner_id: string;
  title: string;
  study_pack_id: string;
  ordering: string[];
}

interface FlashcardInterface {
  id: string;
  owner_id: string;
  study_pack_id: string;
  back_ordering: string[];
  front_ordering: string[];
  date_created: Date;
  date_modified: Date;
  block_link?: string;
}
