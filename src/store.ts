import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { FILETREE_TYPES, TAB_TYPE, UserType } from "./shared";

// File tree atoms
export const fileTreeAtom = atom<FileTreeInterface | undefined>({});
export const foldersAtom = atom<{ [key: string]: FolderInterface } | undefined>(
  {}
);
export const numberOfFoldersAtom = atom(
  (get) => Object.keys(get(foldersAtom) || {}).length
);

export const bindersAtom = atom<{ [key: string]: BinderInterface } | undefined>(
  {}
);
export const studySetsAtom = atom<
  { [key: string]: StudyPackInterface } | undefined
>({});

export const typeAtom = atom<FILETREE_TYPES>(FILETREE_TYPES.FOLDER);

// App theme
export const darkModeAtom = atomWithStorage<boolean>("dark-mode", false);

// User
export const userAtom = atom<UserType>({
  id: "",
  email_address: "",
  first_name: "",
  last_name: "",
});

// Sidebar
export const sidebarAtom = atomWithStorage("sidebar-state", true);
export const isBlockOpenAtom = atomWithStorage<{
  [id: string]: boolean;
}>("blocks-toggle", {});
export const selectBlockOpenState = (id: string) => {
  const selectValue = atom((get) => get(isBlockOpenAtom)?.[id]);
  return selectValue;
};

export const setBlockOpenStateAtom = atom(
  (get) => get(isBlockOpenAtom),
  (get, set, _arg: { id: string; isOpen?: boolean }) =>
    set(isBlockOpenAtom, {
      [_arg.id]: _arg.isOpen || false,
      ...get(isBlockOpenAtom),
    })
);

// Study set
export const studySetTabAtom = atomWithStorage<{
  [id: string]: TAB_TYPE;
}>("study-set-tabs", {});
export const selectStudySetTab = (id: string) => {
  const selectValue = atom((get) => get(studySetTabAtom)?.[id]);
  return selectValue;
};

// Loading
export const isAppLoadingAtom = atom<boolean>(true);
export const loadingErrorAtom = atom<boolean>(false);

// Linked flashcards
export const isFlashcardLinkedAtom = atom<boolean>(false);
export const studyModeUrlAtom = atom<string>("/");
export const blockLinkAtom = atom<string>("");

// Flashcard
export const flashcardsAtom = atom<FlashcardInterface[] | undefined>([]);

// Current Block
export const savingNotesAtom = atom<boolean>(false);
export const currentBlockAtom = atom<{
  key: string | undefined;
  hasFocus: boolean;
}>({ key: "", hasFocus: false });
