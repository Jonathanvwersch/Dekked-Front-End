import { LOCALES } from "../locales";

const en_GB = {
  [LOCALES.ENGLISH_GB]: {
    generics: {
      study: "Study",
      save: "Save",
      saveAndClose: "Save and close",
      untitled: "Untitled",
      saveChanges: "Save changes",
      cancel: "Cancel",
      clickToMinimise: "Click to minimise",
      finish: "Finish",
      add: "Add",
      saving: "Saving",
      okay: "Okay",
      loggingOut: "Logging out...",
      somethingWentWrong: "Something went wrong. Please try again.",
      or: "Or",
    },
    notFoundPage: {
      goHome: "Go home",
      mainMessage: "That link does not exist",
    },
    errorPage: {
      reload: "Reload",
      mainMessage: "Uh oh. Something went wrong. Please reload the page.",
      subMessage: "If problem persists, contact ",
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
      types: {
        spacedRepetition: "Spaced repetition",
        freeStudy: "Free study",
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
          day: "day",
          days: "days",
          month: "month",
          months: "months",
          year: "year",
          years: "years",
          min: "min",
          mins: "mins",
        },
        flipCard: {
          flipCard: "Flip card",
          showAnswer: "Show answer",
        },
      },
      flashcard: {
        congratulations: "Congratulations!",
        finish: "Click finish to return to your study set",
        continueStudying: "or free study to continue studying",
        returnToStudy: "Return to study mode",
        reachedTheEnd: "You've reached the end of your deck",
        caughtUp: "You're all caught up for the day",
        flashcardsEmpty: "It looks like your deck of flashcards is empty",
        clickReturnToStudySet:
          "Click return to study set to add your first flashcard",
        returnToStudySet: "Return to study set",
      },
    },
    forms: {
      oAuth: {
        continueWithGoogle: "Continue with Google",
      },
      password: {
        password: "Password",
        newPassword: "New password",
        currentPassword: "Current password",
        repeatPassword: "Repeat password",
        length: "Your password must be atleast eight characters long.",
      },
      email: {
        emailAddress: "Email address",
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
        noUserExists: "Incorrect username or password",
      },
      signUp: {
        header: "Get started with Dekked",
        subHeader: "The most efficient way to learn anything",
        signUp: "Sign up",
        logIn: "Log in",
        haveAccount: "Already have an account? ",
        accountExists: "Email address already in use",
        loginOrNewEmail: "Please login or use another email address.",
      },
      validation: {
        invalidEmail: "Invalid email address",
        passwordsNoMatch: "Your passwords do not match",
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
        flashcard: "{num} flashcard",
        flashcards: "{num} flashcards",
      },
      tabs: {
        notes: "Notes",
        flashcards: "Flashcards",
      },
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
        appearance: "Appearance",
      },
      account: {
        header: "Account",
        personalInformation: "Personal Information",
      },
      appearance: {
        header: "Appearance",
        theme: "Theme",
        light: "Light",
        dark: "Dark (beta)",
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
        addItem: "Add an item inside",
        closeSidebar: "Close sidebar",
        openSidebar: "Lock open sidebar",
        menu: "Recolour icon and delete",
      },
      colorPicker: {
        default: "Default",
        red: "Red",
        orange: "Orange",
        yellow: "Yellow",
        green: "Green",
        blue: "Blue",
        indigo: "Indigo",
        violet: "Violet",
        grey: "grey",
        dekkedBlue: "Dekked blue",
      },
      studyQueue: {
        bubble: "View which decks are due",
      },
      studyMode: {
        flip: "Flip flashcard",
        editCard: "Edit flashcard",
        cardNowEditable: "Flashcard is now editable",
        deleteCard: "Delete flashcard",
        linkedFlashcard: "Click to view linked block",
        disabledStudyButton: "Add a flashcard to enable study mode",
        enterFullscreen: "Enter fullscreen mode",
        exitFullscreen: "Exit fullscreen mode",
        newCards: "New cards",
        repeatedCards: "Repeated cards",
        dueCards: "Due cards",
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
          changeTextAlignment: "Change text alignment",
          changeTextStyles: "Change text styles",
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
      forms: {
        disabledButton: "Fill out all fields marked with an * to submit form",
      },
    },
    sharedModals: {
      deleteModal: {
        header: "Are you sure?",
        body: "This action cannot be undone.",
        cancel: "Cancel",
        delete: "Delete",
      },
      unsavedChangesModal: {
        header: "You have unsaved changes",
        body: {
          default: "Are you sure you want to discard your changes?",
          addFlashcard:
            "It looks like you were in the middle of creating a flashcard.",
          editFlashcard:
            "It looks like you were in the middle of editing a flashcard.",
        },
        discardChanges: "Yes, discard changes",
        keepEditing: "No, keep editing",
      },
    },
    ariaLabels: {
      closeModal: "Close modal",
      addBinder: "Add binder",
      addStudySet: "Add study set",
      studyQueue: "Study queue",
      studySetFlashcard:
        "Press enter or double click on flashcard to edit front and back content",
    },
  },
};
export default en_GB;
