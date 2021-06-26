/// <reference types="react-scripts" />

interface FileInterface {
  type: string;
  id: string;
  owner_id: string;
  color: string;
  name: string;
  children: FileTreeInterface;
  date_created?: Date;
  date_modified?: Date;
  folder_id?: string;
  binder_id?: string;
}

interface FileTreeInterface {
  [instance_id: string]: {
    type: string;
    id: string;
    owner_id: string;
    color: string;
    name: string;
    children: FileTreeInterface;
    date_created?: Date;
    date_modified?: Date;
    folder_id?: string;
    binder_id?: string;
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
  folder_id: string;
}
interface PageInterface {
  id?: string;
  owner_id: string;
  title: string;
  study_pack_id: string;
  ordering: string[];
}
interface FlashcardInterface {
  flashcard: {
    id: string;
    owner_id: string;
    study_pack_id: string;
    back_ordering: string[];
    front_ordering: string[];
    date_created: Date;
    date_modified: Date;
    block_link?: string;
  };
  front_blocks: string[];
  back_blocks: string[];
}
