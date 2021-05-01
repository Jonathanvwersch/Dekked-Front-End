// theme
export enum SIZES {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

// filetree
export enum FILETREE_TYPES {
  FOLDER = "folder",
  BINDER = "binder",
  STUDY_SET = "study_pack",
}

// URL params
export enum TAB_TYPE {
  FLASHCARDS = "flashcards",
  NOTES = "notes",
}

export enum STUDY_MODE_TYPES {
  SPACED_REPETITION = "spaced-repetition",
  FREE_STUDY = "free-study",
}

// modals
export enum MODAL_FOOTER_TYPE {
  PRIMARY = "primary",
  DELETE = "delete",
}

export enum MODAL_TYPE {
  // see https://www.nngroup.com/articles/popups/ for further reference on modal types
  MODAL_LIGHTBOX = "modal-lightbox", // includes lightbox and you can't interact with the background
  MODAL_NON_LIGHTBOX = "modal-non-lightbox", // no lightbox and you can't interact with the background
  NON_MODAL_NON_LIGHTBOX = "non-modal-non-lightbox", // no lightbox and can interact with the background
  NON_MODAL_LIGHTBOX = "non-modal-lightbox", // includes lightbox and you can interact with the background
  TOOL_TIP = "non-modal-non-lightbox",
}

// buttons
export enum BUTTON_TYPES {
  SUBMIT = "submit",
  BUTTON = "button",
}

export enum BUTTON_THEME {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
}

// note-taking

export enum BLOCK_TYPES {
  UNSTYLED = "unstyled",
  HEADER_ONE = "header-one",
  HEADER_TWO = "header-two",
  HEADER_THREE = "header-three",
  BULLETED_LIST = "unordered-list-item",
  NUMBERED_LIST = "ordered-list-item",
  QUOTE = "blockquote",
  DIVIDER = "divider",
  TODO = "to-do",
  TOGGLE = "toggle",
}

export enum TEXT_STYLES {
  BOLD = "BOLD",
  ITALIC = "ITALIC",
  UNDERLINE = "UNDERLINE",
  STRIKETHROUGH = "STRIKETHROUGH",
  ALIGN_CENTER = "ALIGN_CENTER",
  ALIGN_LEFT = "ALIGN_LEFT",
  ALIGN_RIGHT = "ALIGN_RIGHT",
  SUBSCRIPT = "SUBSCRIPT",
  SUPERSCRIPT = "SUPERSCRIPT",
}
