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
    date_created?: string;
    date_modified?: string;
    folder_id?: string;
    binder_id?: string;
    children: FileTreeInterface;
  };
}
interface BinderInterface {
  id: string;
  owner_id: string;
  folder_id: string;
  date_created?: string;
  date_modified?: string;
  name: string;
  color: string;
}
interface FolderInterface {
  id: string;
  owner_id: string;
  name: string;
  date_created?: string;
  date_modified?: string;
  color: string;
}
interface StudySetInterface {
  id: string;
  owner_id: string;
  binder_id: string;
  date_created?: string;
  date_modified?: string;
  name: string;
  color: string;
  folder_id: string;
}
interface PageInterface {
  id: string;
  ordering: string[];
  owner_id: string;
  study_set_id: string;
  date_created?: string;
  date_modified?: string;
}
interface FlashcardInterface {
  id: string;
  owner_id: string;
  study_set_id: string;
  back_ordering: string[];
  front_ordering: string[];
  date_created: Date;
  date_modified: Date;
  block_link?: string;
  status?: FlashcardStatus;
  quality?: number;
  ease_factor?: number;
  failed_attempts?: number;
  interval?: number;
  front_blocks: string[];
  back_blocks: string[];
  deck_id: string;
}

interface UserInterface {
  id: string;
  email_address: string;
  first_name: string;
  last_name: string;
  password: string;
  date_created?: string;
  date_modified?: string;
}
interface DeckInterface {
  id: string;
  owner_id: string;
  study_set_id: string;
  date_created?: string;
  date_modified?: string;
}
