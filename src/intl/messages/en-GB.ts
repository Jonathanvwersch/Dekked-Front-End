import { LOCALES } from "../locales";

const en_GB = {
  [LOCALES.ENGLISH_GB]: {
    generics: {
      study: "Study",
      save: "Save",
      untitled: "Untitled",
      saveChanges: "Save changes",
      cancel: "Cancel",
      clickToMinimise: "Click to minimise",
      finish: "Finish",
    },
    notFoundPage: {
      goHome: "Go home",
      mainMessage: "That link does not exist",
    },
    sidebar: {
      workspace: {
        header: "Folders ({num})",
        untitled: "Untitled",
      },
      base: {
        addFolder: "Add folder",
      },
      block: {
        noBinders: "This folder is empty",
        noStudySets: "This binder is empty",
      },
      blockModal: {
        addBinder: "Add binder",
        addStudySet: "Add study set",
        iconColour: "Icon colour",
        delete: "Delete",
      },
      settingsModal: {
        logOut: "Log out",
        settings: "Settings",
      },
      deleteModal: {
        deleteStudySet: "Do you really want to delete this study set?",
        deleteBinder: "Do you really want to delete this binder?",
        deleteFolder: "Do you really want to delete this folder?",
      },
    },
    studyMode: {
      chooseModal: {
        header: "Choose your study mode",
        spacedRepetition: "Spaced repetition",
        intervalStudying: "Interval studying",
        freeStudy: "Free study",
        linearStudying: "Linear studying",
      },
      deleteModal: {
        deleteCard: "Do you really want to delete this flashcard?",
      },
      spacedRepetition: {
        controller: {
          repeat: "Repeat",
          remembered: "Remembered",
          easilyRemembered: "Easily remembered",
          nextReview: "Next review in {time}",
        },
      },
      flashcard: {
        congratulations: "Congratulations!",
        finish: "Click finish to return to your study set",
        returnToStudy: "Return to study mode",
      },
    },
    forms: {
      password: {
        password: "Password",
        newPassword: "New password",
        currentPassword: "Current password",
        repeatPassword: "Repeat new password",
        length: "Your password must be atleast eight characters long.",
      },
      email: {
        email: "Email address",
        placeholder: "Example@dekked.com",
      },
      names: {
        firstName: "First name",
        firstNamePlaceholder: "Tim",
        lastName: "Last name",
        lastNamePlaceholder: "Berners-Lee",
      },
      logIn: {
        header: "Welcome back to Dekked",
        subHeader: "The most efficient way to learn anything",
        logIn: "Log in",
        signUp: "Sign up",
        noAccount: "Don't have an account yet? ",
      },
      signUp: {
        header: "Get started with Dekked",
        subHeader: "The most efficient way to learn anything",
        signUp: "Sign up",
        logIn: "Log in",
        haveAccount: "Already have an account? ",
      },
    },
    studySet: {
      notetaking: {
        numOfWord: "{num} word",
        numOfWords: "{num} words",
        placeholder: "Type '/' to view block types or just start writing",
        noMatchingBlocks: "No matching blocks",
        emailUs: "Missing a block you'd like to see? Email us",
        toolbar: {
          text: "Text",
          largeHeading: "Large heading",
          mediumHeading: "Medium heading",
          smallHeading: "Small heading",
          bulletedList: "Bulleted list",
          numberedList: "Numbered list",
          quote: "Quote",
          divider: "Divider",
          todo: "Todo",
          toggle: "Toggle list",
        },
      },
      flashcards: {
        front: "Front",
        back: "Back",
        save: "Save",
        addFlashcard: "+ Add flashcard",
      },
      tabs: {
        notes: "Notes",
        flashcards: "Flashcards",
      },
    },
    breadCrumbs: {
      studyMode: "Study mode",
      untitled: "Untitled",
    },
    folderBinders: {
      created: "Created",
      untitled: "Untitled",
      numOfBinders: "{num} binders",
      numOfBinder: "{num} binder",
      numOfStudySets: "{num} study sets",
      numOfStudySet: "{num} study set",
    },
    settings: {
      sidebar: {
        account: "Account",
      },
      account: {
        header: "Account",
        personalInformation: "Personal Information",
      },
    },
    topbar: {
      failedToSave: "Failed to save",
    },
    tooltips: {
      generics: {
        close: "Close",
      },
      sidebar: {
        addBinder: "Add a binder inside",
        addStudySet: "Add a study set inside",
        closeSidebar: "Close sidebar",
        openSidebar: "Lock open sidebar",
        menu: "Recolour icon and delete",
      },
      studyQueue: {
        bubble: "View which decks are ready to study",
      },
      studyMode: {
        flip: "Flip flashcard",
        editCard: "Edit flashcard",
        cardNowEditable: "Flashcard is now editable",
        deleteCard: "Delete flashcard",
        linkedFlashcard: "Click to view linked block",
        disabledStudyButton: "Add a flashcard to enable study mode",
      },
      studySet: {
        toolbar: {
          bold: "Bold",
          underline: "Underline",
          highlight: "Highlight",
          changeTextColour: "Change text colour",
          strikethrough: "Strikethrough",
          removeStyles: "Remove all styles",
          subscript: "Subscript",
          superscript: "Superscript",
          italics: "Italics",
          leftAlign: "Left align",
          centerAlign: "Center align",
          rightAlign: "Right align",
        },
        blocks: {
          addBlocks: "Click to add a block below",
          moveOrSettings: "Drag to move block",
        },
        flashcards: {
          createLinkedFlashcard: "Create a linked flashcard",
          enableLinking: "Select a block of text to enable linking",
        },
      },
    },
    sharedModals: {
      deleteModal: {
        header: "Are you sure?",
        body: "This action cannot be undone.",
        cancel: "Cancel",
        delete: "Delete",
      },
    },
    ariaLabels: {
      closeModal: "Close modal",
      addBinder: "Add binder",
      addStudySet: "Add study set",
      studyQueue: "Study queue",
    },
  },
};
export default en_GB;
