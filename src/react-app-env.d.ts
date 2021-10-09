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

interface LoadFilesInterface {
  binders: Binders;
  fileTree: FileTreeInterface;
  folders: Folders;
  studySets: StudySets;
}

type Binders = {
  [key: string]: BinderInterface;
};

type Folders = {
  [key: string]: FolderInterface;
};

type StudySets = {
  [key: string]: StudySetsInterface;
};

interface BinderInterface {
  id: string;
  folder_id: string;
  name: string;
  color: string;
  owner_id?: string;
  date_created?: string;
  date_modified?: string;
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
  status: FlashcardStatus;
  learning_status: FlashcardLearningStatus;
  ease_factor: number;
  failed_consecutive_attempts: number;
  interval: number;
  front_blocks: string[];
  back_blocks: string[];
  due_date: Date;
  deck_id: string;
  block_link?: string;
  quality?: number;
}

interface UserInterface {
  email_address: string;
  first_name: string;
  last_name: string;
  password: string;
  id: string;
  date_created?: string;
  date_modified?: string;
}

interface DeckInterface {
  id: string;
  owner_id: string;
  study_set_id: string;
  date_created: string;
  date_modified: string;
  easy_bonus: number;
  interval_modifier: number;
  new_interval: number;
}

interface DueSpacedRepetitionDecks {
  [deck_id: string]: {
    study_set_id: string;
    name: string;
    iconColor: string | undefined;
    number_of_cards: number;
    number_of_new_cards: number;
    number_of_learning_cards: number;
    number_of_learned_cards: number;
  };
}

interface BlockInterface {
  id: string;
  draft_key: string;
  parent_id: string;
  content: string;
}
