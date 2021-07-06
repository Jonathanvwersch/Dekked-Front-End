/// <reference types="react-scripts" />

interface FileInterface {
  type: string;
  id: string;
  owner_id: string;
  color: string;
  name: string;
  children: FileTreeInterface;
  date_created?: string;
  date_modified?: string;
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
    date_created?: string;
    date_modified?: string;
    folder_id?: string;
    binder_id?: string;
  };
}
interface BinderInterface {
  id: string;
  owner_id: string;
  folder_id: string;
  date_created: string;
  date_modified: string;
  name: string;
  color: string;
}
interface FolderInterface {
  id: string;
  owner_id: string;
  name: string;
  date_created: string;
  date_modified: string;
  color: string;
}
interface StudySetInterface {
  id: string;
  owner_id: string;
  binder_id: string;
  date_created: string;
  date_modified: string;
  name: string;
  color: string;
  folder_id: string;
}
interface PageInterface {
  id?: string;
  owner_id: string;
  title: string;
  study_set_id: string;
  ordering: string[];
}
interface FlashcardInterface {
  flashcard: {
    id: string;
    owner_id: string;
    study_set_id: string;
    back_ordering: string[];
    front_ordering: string[];
    date_created: string;
    date_modified: string;
    block_link?: string;
  };
  front_blocks: string[];
  back_blocks: string[];
}
