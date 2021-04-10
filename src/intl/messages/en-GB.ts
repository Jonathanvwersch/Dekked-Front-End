import { LOCALES } from "../locales";

const en_GB = {
  [LOCALES.ENGLISH_GB]: {
    generics: {
      study: "Study",
      save: "Save",
      untitled: "Untitled",
      saveChanges: "Save changes",
      cancel: "Cancel",
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
    },
    studyMode: {
      chooseModal: {
        header: "Choose your study mode",
        spacedRepetition: "Spaced repetition",
        intervalStudying: "Interval studying",
        freeStudy: "Free study",
        linearStudying: "Linear studying",
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
        placeholder: "Type '/' to view block types",
        toolbar: {
          body: "Body",
          largeHeading: "Large heading",
          mediumHeading: "Medium heading",
          smallHeading: "Small heading",
          bulletedList: "Bulleted list",
          numberedList: "Numbered list",
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
    tooltips: {
      sidebar: {
        addBinder: "Add a binder inside",
        addStudySet: "Add a study set inside",
        closeSidebar: "Close sidebar",
        openSidebar: "Open sidebar",
        menu: "Recolour icon and delete",
      },
      studyQueue: {
        bubble: "View which decks are ready to study",
      },
    },
  },
};
export default en_GB;
