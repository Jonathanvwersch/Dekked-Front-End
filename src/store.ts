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

export const addAssetAtom = atom(
  null,
  (
    get,
    set,
    arg: {
      newFileId: string;
      type: string;
      newFile: FileInterface;
      folderId?: string;
      binderId?: string;
    }
  ) => {
    const prev = get(fileTreeAtom);
    const asset = arg.newFile;
    const folderId = arg.folderId;
    const binderId = arg.binderId;
    const newFileId = arg.newFileId;

    if (arg.type === FILETREE_TYPES.FOLDER) {
      set(fileTreeAtom, {
        ...prev,
        [newFileId]: {
          ...asset,
        },
      });
    } else if (arg.type === FILETREE_TYPES.BINDER && folderId) {
      set(fileTreeAtom, {
        ...prev,
        [folderId]: {
          ...(prev?.[folderId] as FileInterface),
          children: {
            ...prev?.[folderId]?.children,
            [newFileId]: {
              ...asset,
            },
          },
        },
      });
    } else if (arg.type === FILETREE_TYPES.STUDY_SET && binderId && folderId) {
      console.log(folderId);
      set(fileTreeAtom, {
        ...prev,
        [folderId]: {
          ...(prev?.[folderId] as FileInterface),
          children: {
            ...prev?.[folderId]?.children,
            [binderId]: {
              ...(prev?.[folderId]?.children?.[binderId] as FileInterface),
              children: {
                ...prev?.[folderId]?.children?.[binderId]?.children,
                [newFileId]: {
                  ...asset,
                },
              },
            },
          },
        },
      });
    }
  }
);

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
  [fileTreeId: string]: { [itemId: string]: boolean };
}>(`blocks-toggle`, {});

export const selectBlockOpenStateItem = (
  fileTreeId: string,
  itemId: string
) => {
  const selectValue = atom(
    (get) => get(isBlockOpenAtom)?.[fileTreeId]?.[itemId]
  );
  return selectValue;
};

export const selectBlockOpenStateFileTree = (fileTreeId: string) => {
  const selectValue = atom((get) => get(isBlockOpenAtom)?.[fileTreeId]);
  return selectValue;
};

export const updateBlockOpenStateAtom = atom(
  null,
  (get, set, arg: { fileTreeId: string; id: string; isOpen?: boolean }) => {
    const prev = get(isBlockOpenAtom);
    if (
      arg.isOpen !== undefined &&
      prev?.[arg.fileTreeId]?.[arg.id] === arg.isOpen
    ) {
      return;
    }
    set(isBlockOpenAtom, {
      ...prev,
      [arg.fileTreeId]: {
        ...prev?.[arg.fileTreeId],
        [arg.id]:
          arg.isOpen === true || arg.isOpen === false
            ? arg.isOpen
            : !prev?.[arg.fileTreeId]?.[arg.id],
      },
    });
  }
);

// Study set
export const studySetTabAtom = atomWithStorage<{
  [id: string]: TAB_TYPE;
}>(`study-set-tabs`, {});
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
