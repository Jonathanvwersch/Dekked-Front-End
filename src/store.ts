import { EditorState } from "draft-js";
import { Atom, atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { FILETREE_TYPES, TAB_TYPE } from "./shared";

// File tree atoms
export const fileTreeAtom = atom<FileTreeInterface | undefined>({});
export const foldersAtom = atom<{ [key: string]: FolderInterface } | undefined>(
  {}
);
export const bindersAtom = atom<{ [key: string]: BinderInterface } | undefined>(
  {}
);
export const studySetsAtom = atom<
  { [key: string]: StudySetInterface } | undefined
>({});
export const fileAtom = atom((get) => {
  const folders = get(foldersAtom || {});
  const binders = get(bindersAtom || {});
  const studySets = get(studySetsAtom || {});
  const files = [
    ...Object.keys(folders || {}),
    ...Object.keys(binders || {}),
    ...Object.keys(studySets || {}),
  ];
  return files;
});
export const firstFolderIdAtom = atom((get) => {
  const fileTree = get(fileTreeAtom || {});
  return fileTree && fileTree[Object.keys(fileTree)?.[0]]?.id;
});
export const secondFolderIdAtom = atom((get) => {
  const fileTree = get(fileTreeAtom || {});
  return fileTree && fileTree[Object.keys(fileTree)?.[1]]?.id;
});
export const getActiveFolder = (
  itemId: string,
  type?: string | FILETREE_TYPES
) => {
  let foldersData: Atom<FolderInterface | undefined> = atom(undefined);
  const folders = atom((get) => get(foldersAtom)?.[itemId]);

  if (type === FILETREE_TYPES.FOLDER) {
    foldersData = folders;
  } else if (type === FILETREE_TYPES.BINDER) {
    foldersData = atom(
      (get) => get(foldersAtom)?.[get(bindersAtom)?.[itemId]?.folder_id || 0]
    );
  } else {
    foldersData = atom(
      (get) =>
        get(foldersAtom)?.[
          get(bindersAtom)?.[get(studySetsAtom)?.[itemId]?.binder_id || 0]
            ?.folder_id || 0
        ]
    );
  }
  return foldersData;
};

export const getActiveBinder = (
  itemId: string,
  type?: string | FILETREE_TYPES
) => {
  let binderData: Atom<BinderInterface | undefined> = atom(undefined);
  const binder = atom((get) => get(bindersAtom)?.[itemId]);

  if (type === FILETREE_TYPES.BINDER) {
    binderData = binder;
  } else {
    binderData = atom(
      (get) => get(bindersAtom)?.[get(studySetsAtom)?.[itemId]?.binder_id || 0]
    );
  }
  return binderData;
};

export const getActiveStudySet = (
  itemId: string,
  type?: string | FILETREE_TYPES
) => {
  let studySetData: Atom<StudySetInterface | undefined> = atom(undefined);

  if (type === FILETREE_TYPES.STUDY_SET) {
    studySetData = atom((get) => get(studySetsAtom)?.[itemId]);
  }
  return studySetData;
};
export const numberOfFoldersAtom = atom(
  (get) => Object.keys(get(fileTreeAtom) || {}).length
);
export const numberOfChildrenOfFolder = (id: string) => {
  const numOfBindersInFolder = atom(
    (get) => Object.keys(get(fileTreeAtom)?.[id]?.children || {})?.length
  );
  return numOfBindersInFolder;
};
export const numberOfChildrenOfBinder = (binderId: string) => {
  const numOfStudySetsInBinder = atom((get) => {
    const binders = get(bindersAtom);
    const folderId = binders?.[binderId]?.folder_id;
    return (
      Object.keys(
        get(fileTreeAtom)?.[folderId || 0]?.children?.[binderId]?.children || {}
      )?.length || 0
    );
  });
  return numOfStudySetsInBinder;
};

export const deleteAssetAtom = atom(
  null,
  (
    get,
    set,
    arg: {
      fileId: string;
      type: string;
    }
  ) => {
    const fileTree = get(fileTreeAtom);
    const folders = get(foldersAtom);
    const studySets = get(studySetsAtom);
    const binders = get(bindersAtom);
    const fileId = arg.fileId;

    if (arg.type === FILETREE_TYPES.FOLDER) {
      delete fileTree?.[fileId];
      delete folders?.[fileId];
      set(fileTreeAtom, {
        ...fileTree,
      });
      set(foldersAtom, {
        ...folders,
      });
    } else if (arg.type === FILETREE_TYPES.BINDER) {
      const folderId = binders?.[fileId]?.folder_id;
      delete fileTree?.[folderId || 0]?.children[fileId];
      delete binders?.[fileId];
      set(fileTreeAtom, {
        ...fileTree,
      });
      set(bindersAtom, {
        ...binders,
      });
    } else if (arg.type === FILETREE_TYPES.STUDY_SET) {
      const binderId = studySets?.[fileId]?.binder_id;
      const folderId = binders?.[binderId || 0]?.folder_id;
      delete fileTree?.[folderId || 0]?.children?.[binderId || 0]?.children?.[
        fileId
      ];
      delete studySets?.[fileId];
      set(fileTreeAtom, {
        ...fileTree,
      });
      set(studySetsAtom, {
        ...studySets,
      });
    }
  }
);

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
    const fileTree = get(fileTreeAtom);
    const folders = get(foldersAtom);
    const studySets = get(studySetsAtom);
    const binders = get(bindersAtom);
    const asset = arg.newFile;
    const folderId = arg.folderId;
    const binderId = arg.binderId;
    const newFileId = arg.newFileId;

    if (arg.type === FILETREE_TYPES.FOLDER) {
      set(fileTreeAtom, {
        ...fileTree,
        [newFileId]: {
          ...asset,
        },
      });
      set(foldersAtom, {
        ...folders,
        [newFileId]: {
          ...(asset as FolderInterface),
        },
      });
    } else if (arg.type === FILETREE_TYPES.BINDER && folderId) {
      set(fileTreeAtom, {
        ...fileTree,
        [folderId]: {
          ...(fileTree?.[folderId] as FileInterface),
          children: {
            ...fileTree?.[folderId]?.children,
            [newFileId]: {
              ...asset,
            },
          },
        },
      });
      set(bindersAtom, {
        ...binders,
        [newFileId]: {
          ...(asset as BinderInterface),
        },
      });
    } else if (arg.type === FILETREE_TYPES.STUDY_SET && binderId && folderId) {
      set(fileTreeAtom, {
        ...fileTree,
        [folderId]: {
          ...(fileTree?.[folderId] as FileInterface),
          children: {
            ...fileTree?.[folderId]?.children,
            [binderId]: {
              ...(fileTree?.[folderId]?.children?.[binderId] as FileInterface),
              children: {
                ...fileTree?.[folderId]?.children?.[binderId]?.children,
                [newFileId]: {
                  ...asset,
                },
              },
            },
          },
        },
      });
      set(studySetsAtom, {
        ...studySets,
        [newFileId]: {
          ...(asset as StudySetInterface),
        },
      });
    }
  }
);

export const updateAssetAtom = atom(
  null,
  (
    get,
    set,
    arg: {
      dateModified: Date;
      fileId: string;
      type: string;
      color?: string;
      name?: string;
    }
  ) => {
    const fileTree = get(fileTreeAtom);
    const folders = get(foldersAtom);
    const studySets = get(studySetsAtom);
    const binders = get(bindersAtom);
    const fileId = arg.fileId;

    if (arg.type === FILETREE_TYPES.FOLDER) {
      if (folders?.[fileId]?.date_modified) {
        folders[fileId].date_modified = arg.dateModified.toDateString();
      }
      if (folders?.[fileId] && (arg.name || arg.name === "")) {
        folders[fileId].name = arg.name;
      }
      if (folders?.[fileId] && arg.color) {
        folders[fileId].color = arg.color;
      }
      if (fileTree?.[fileId] && (arg.name || arg.name === "")) {
        fileTree[fileId].name = arg.name;
      }
      if (fileTree?.[fileId] && arg.color) {
        fileTree[fileId].color = arg.color;
      }
      set(fileTreeAtom, {
        ...fileTree,
      });
      set(foldersAtom, {
        ...folders,
      });
    } else if (arg.type === FILETREE_TYPES.BINDER) {
      const folderId = binders?.[fileId]?.folder_id;
      if (binders?.[fileId]?.date_modified) {
        binders[fileId].date_modified = arg.dateModified.toDateString();
      }
      if (binders?.[fileId] && (arg.name || arg.name === "")) {
        binders[fileId].name = arg.name;
      }
      if (binders?.[fileId] && arg.color) {
        binders[fileId].color = arg.color;
      }
      if (
        fileTree?.[folderId || 0]?.children?.[fileId] &&
        (arg.name || arg.name === "")
      ) {
        fileTree[folderId || 0].children[fileId].name = arg.name;
      }
      if (fileTree?.[folderId || 0]?.children?.[fileId] && arg.color) {
        fileTree[folderId || 0].children[fileId].color = arg.color;
      }
      set(fileTreeAtom, {
        ...fileTree,
      });
      set(bindersAtom, {
        ...binders,
      });
    } else if (arg.type === FILETREE_TYPES.STUDY_SET) {
      const binderId = studySets?.[fileId]?.binder_id;
      const folderId = binders?.[binderId || 0]?.folder_id;

      if (studySets?.[fileId]?.date_modified) {
        studySets[fileId].date_modified = arg.dateModified.toDateString();
      }
      if (studySets?.[fileId] && (arg.name || arg.name === "")) {
        studySets[fileId].name = arg.name;
      }
      if (studySets?.[fileId] && arg.color) {
        studySets[fileId].color = arg.color;
      }
      if (
        folderId &&
        binderId &&
        fileTree?.[folderId]?.children?.[binderId]?.children?.[fileId] &&
        (arg.name || arg.name === "")
      ) {
        fileTree[folderId].children[binderId].children[fileId].name = arg.name;
      }
      if (
        folderId &&
        binderId &&
        fileTree?.[folderId]?.children?.[binderId]?.children?.[fileId] &&
        arg.color
      ) {
        fileTree[folderId].children[binderId].children[fileId].color =
          arg.color;
      }
      set(fileTreeAtom, {
        ...fileTree,
      });
      set(studySetsAtom, {
        ...studySets,
      });
    }
  }
);

// App theme
export const darkModeAtom = atomWithStorage<boolean>("dark-mode", false);

// User
export const userAtom = atom<UserInterface>({
  id: "",
  email_address: "",
  first_name: "",
  last_name: "",
});

export const emailFromSignUpAtom = atom<string | undefined>(undefined);

// Sidebar
export const sidebarAtom = atomWithStorage("sidebar-state", true);
export const isBlockOpenAtom = atomWithStorage<{
  [fileTreeId: string]: { [itemId: string]: boolean };
}>(`blocks-toggle`, {});
export const selectedBlockNameAtom = atom<string>("");
export const selectActiveBlockName = (fileId: string, type?: string) => {
  if (type === FILETREE_TYPES.FOLDER) {
    return atom((get) => get(foldersAtom)?.[fileId]?.name);
  }
  if (type === FILETREE_TYPES.BINDER) {
    return atom((get) => get(bindersAtom)?.[fileId]?.name);
  } else {
    return atom((get) => get(studySetsAtom)?.[fileId]?.name);
  }
};
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
export const blockLinkAtom = atom<string>("");
export const currentFlashcardIndexAtom = atom<number>(0);

// Flashcard
export const flashcardsAtom = atom<FlashcardInterface[] | undefined>(undefined);
export const srFlashcardsAtom =
  atom<FlashcardInterface[] | undefined>(undefined);
export const isMainFlashcardButtonDisabledAtom = atom<boolean>(true);
export const deckAtom = atom<DeckInterface | undefined>(undefined);

// Current Block
export const savingNotesAtom = atom<boolean>(false);
export const currentBlockAtom = atom<{
  key: string | undefined;
  hasFocus: boolean;
}>({ key: "", hasFocus: false });

// Notes
export const pageEditorStateAtom = atom<EditorState>(EditorState.createEmpty());
export const pageIdAtom = atom<string | undefined>(undefined);

// Layered Modal
export const layeredModalAtom = atom<boolean>(false);

// Study mode
export const fullscreenStudyModeAtom = atomWithStorage<boolean>(
  "fullscreen-study-mode",
  false
);

export const addedLinkedFlashcardAtom = atom<number>(0);
