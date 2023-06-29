import { type AvailableLocales } from "./state/locale";
import { type DEFAULT_WASHING_PROGRAMS } from "./utils/types";

type DefaultWashingProgramKeys =
  (typeof DEFAULT_WASHING_PROGRAMS)[number]["slug"];

type HomepageSection = "presets" | "favorites";

type UiText = {
  navbar: {
    help: string;
    contact: string;
  };
  homepage: Record<
    HomepageSection,
    {
      title: string;
      description: string;
      empty: string;
    }
  > & {
    optionsMenu: {
      edit: string;
      delete: string;
      success: (name: string) => string;
      error: string;
    };
  };
  programPage: {
    meta: {
      title: string;
    };
    title: string;
    description: string;
    saveAsFavorite: {
      prompt: string;
      checkbox: string;
      textField: {
        label: string;
        placeholder: string;
        button: string;
        toast: {
          title: string;
          description: (name: string) => string;
        };
      };
    };
    form: {
      submit: string;
    };
  };
  loading: string;
  toggleLocale: string;
  toggleTheme: string;
  defaultPrograms: Record<DefaultWashingProgramKeys, string>;
};

export const i18n: Record<AvailableLocales, UiText> = {
  en: {
    navbar: {
      help: "Help",
      contact: "Contact",
    },
    homepage: {
      favorites: {
        title: "Favorites",
        description:
          "Your saved programs will be listed here. Press and hold on a program to start it immediately",
        empty: "You don't have any favorite programs yet",
      },
      presets: {
        title: "Presets",
        description:
          "A collection of pre-configured programs for different types of clothing",
        empty: "Sorry, we couldn't load the presets. Please try again later",
      },
      optionsMenu: {
        edit: "Edit",
        delete: "Delete",
        success: (name: string) =>
          `Program ${name} has been deleted successfully`,
        error: "Something went wrong. Please try again later",
      },
    },
    programPage: {
      meta: {
        title: "Program Page",
      },
      title: "Configure Program",
      description:
        "Follow these steps to configure your program before you start it",
      saveAsFavorite: {
        prompt:
          "It seems that you’ve changed the default configuration for this program",
        checkbox: "Would you like to save it as a favorite?",
        textField: {
          label: "Give your program a name",
          placeholder: "My Washing Program",
          button: "Save",
          toast: {
            title: "Success!",
            description: (name: string) =>
              `Program ${name} has been saved as a favorite`,
          },
        },
      },
      form: {
        submit: "Start Program",
      },
    },
    loading: "Loading...",
    toggleLocale: "Toggle Locale",
    toggleTheme: "Toggle Theme",
    defaultPrograms: {
      cotton: "Cotton",
      wool: "Wool",
      synthetic: "Synthetic",
      delicates: "Delicates",
      handwash: "Handwash",
      intensive: "Intensive",
      quick: "Quick",
      sport: "Sport",
      rinse: "Rinse",
      drain: "Drain",
      colored: "Colored",
      shirts: "Shirts",
    },
  },
  gr: {
    navbar: {
      help: "Βοήθεια",
      contact: "Επικοινωνία",
    },
    homepage: {
      favorites: {
        title: "Αγαπημένα",
        description:
          "Τα αγαπημένα σας προγράμματα θα εμφανίζονται εδώ. Πατήστε και κρατήστε πατημένο ένα πρόγραμμα για να το ξεκινήσετε αμέσως",
        empty: "Δεν έχετε ακόμα αγαπημένα προγράμματα",
      },
      presets: {
        title: "Προεπιλογές",
        description:
          "Μια συλλογή προκαθορισμένων προγραμμάτων για διαφορετικούς τύπους ρούχων",
        empty:
          "Λυπούμαστε, δεν μπορέσαμε να φορτώσουμε τις προεπιλογές. Παρακαλώ προσπαθήστε ξανά αργότερα",
      },
      optionsMenu: {
        edit: "Επεξεργασία",
        delete: "Διαγραφή",
        success: (name: string) => `Το πρόγραμμα ${name} διαγράφηκε επιτυχώς`,
        error: "Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε ξανά αργότερα",
      },
    },
    programPage: {
      meta: {
        title: "Σελίδα Προγράμματος",
      },
      title: "Ρύθμιση Προγράμματος",
      description:
        "Ακολουθήστε αυτά τα βήματα για να ρυθμίσετε το πρόγραμμά σας πριν το ξεκινήσετε",
      saveAsFavorite: {
        prompt:
          "Φαίνεται ότι έχετε αλλάξει την προεπιλεγμένη ρύθμιση για αυτό το πρόγραμμα",
        checkbox: "Θέλετε να το αποθηκεύσετε ως αγαπημένο;",
        textField: {
          label: "Δώστε ένα όνομα στο πρόγραμμα",
          placeholder: "Το Πλύσιμο Ρούχων Μου",
          button: "Αποθήκευση",
          toast: {
            title: "Επιτυχία!",
            description: (name: string) =>
              `Το πρόγραμμα ${name} αποθηκεύτηκε ως αγαπημένο`,
          },
        },
      },
      form: {
        submit: "Έναρξη Προγράμματος",
      },
    },
    loading: "Φόρτωση...",
    toggleLocale: "Αλλαγή Γλώσσας",
    toggleTheme: "Αλλαγή Θέματος",
    defaultPrograms: {
      cotton: "Βαμβακερά",
      wool: "Μάλλινα",
      synthetic: "Συνθετικά",
      delicates: "Ευαίσθητα",
      handwash: "Στο χέρι",
      intensive: "Εντατικό",
      quick: "Γρήγορο",
      sport: "Αθλητικά",
      rinse: "Ξέβγαλμα",
      drain: "Στύψιμο",
      colored: "Χρωματιστά",
      shirts: "Πουκάμισα",
    },
  },
};
