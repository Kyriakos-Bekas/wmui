import { type AvailableLocales } from "./state/locale";
import { type DEFAULT_WASHING_PROGRAMS } from "./utils/types";

type DefaultWashingProgramKeys =
  (typeof DEFAULT_WASHING_PROGRAMS)[number]["slug"];

type HomepageSection = "presets" | "favorites";

type UiText = {
  app: {
    title: string;
    description: string;
  };
  back: string;
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
      spin: {
        label: string;
        placeholder: string;
        noSpin: string;
      };
      temperature: {
        label: string;
        placeholder: string;
        warning: string;
      };
      time: {
        label: string;
        placeholder: string;
        exact: string;
        relativeTimeLabel: (time: number) => string;
      };
      undo: string;
      duration: string;
      load: string;
    };
  };
  editProgramPage: {
    meta: {
      title: string;
    };
    title: string;
    description: string[];
    submit: string;
    toast: {
      title: string;
      description: (name: string) => string;
    };
  };
  inProgressPage: {
    meta: {
      title: string;
    };
    title: {
      scheduled: string;
      inProgress: string;
      paused: string;
      finished: string;
    };
    notify: string;
    uiLock: {
      locked: string;
      unlocked: string;
    };
    pause: {
      labelPause: string;
      labelContinue: string;
      warning: {
        title: string;
        description: string;
        action: string;
        showAgain: string;
      };
    };
    abort: {
      label: string;
      title: string;
      description: string;
      actionContinue: string;
      actionCancel: string;
    };
    stages: {
      wash: string;
      rinse: string;
      spin: string;
      finish: string;
    };
    finish: {
      toast: {
        title: string;
        description: string;
      };
      message: string;
    };
  };
  helpPage: {
    meta: {
      title: string;
    };
    title: string;
    description: string;
  };
  loading: string;
  toggleLocale: string;
  toggleTheme: string;
  defaultPrograms: Record<DefaultWashingProgramKeys, string>;
};

export const i18n: Record<AvailableLocales, UiText> = {
  en: {
    app: {
      title: "Washing Machine UI App",
      description: "This UI simplifies interacting with your washing machine",
    },
    back: "Back",
    navbar: {
      help: "Help",
      contact: "Call us",
    },
    homepage: {
      favorites: {
        title: "Favorites",
        description: "Your saved programs will be listed here.",
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
    helpPage: {
      meta: {
        title: "Help",
      },
      title: "You need help?",
      description: "Here is a video tutorial of how to use the application",
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
        spin: {
          label: "Spin",
          placeholder: "Select spin speed",
          noSpin: "No Spin",
        },
        temperature: {
          label: "Temperature",
          placeholder: "Select temperature",
          warning:
            "Some fabrics may shrink or get damaged if washed at high temperatures",
        },
        time: {
          label: "Start Time",
          placeholder: "Select start time",
          exact: "Schedule start in next 24h",
          relativeTimeLabel: (time: number) =>
            time === 0 ? "Start now" : `Start in ${time} minutes`,
        },
        undo: "Undo Changes",
        duration: "Duration",
        load: "Load",
      },
    },
    editProgramPage: {
      meta: {
        title: "Edit Program Page",
      },
      title: "Edit Program",
      description: [
        "Edit the name and the default configuration of this program",
        "Don't forget to save your changes!",
      ],
      submit: "Save Changes",
      toast: {
        title: "Success!",
        description: (name: string) =>
          `Program ${name} has been updated successfully`,
      },
    },
    inProgressPage: {
      meta: {
        title: "Washing",
      },
      title: {
        scheduled: "Program will start in",
        inProgress: "Program is in progress",
        paused: "Program is paused",
        finished: "Program has finished",
      },
      notify: "Notify me when the program is finished",
      uiLock: {
        locked: "Click to unlock UI",
        unlocked: "Click to lock UI",
      },
      pause: {
        labelContinue: "Continue",
        labelPause: "Pause",
        warning: {
          title: "Warning",
          description:
            "Adding clothes to a program that has started more than 20 minutes ago may result in the clothes not being washed correctly",
          action: "I understand",
          showAgain: "Don't show again",
        },
      },
      abort: {
        label: "Abort",
        title: "Are you sure you want to abort",
        description:
          "If you abort a program then you cannot continue it again at a later point",
        actionContinue: "Abort",
        actionCancel: "Cancel",
      },
      stages: {
        wash: "Washing",
        rinse: "Rinsing",
        spin: "Spinning",
        finish: "Finish",
      },
      finish: {
        toast: {
          title: "Program Finished",
          description: "Your clothes are ready to be taken out",
        },
        message: "Finished!",
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
    app: {
      title: "Διεπαφή Χρήστη για Πλυντήριο Ρούχων",
      description:
        "Αυτή η διεπαφή απλοποιεί την επικοινωνία με το πλυντήριό σας",
    },
    back: "Πίσω",
    helpPage: {
      meta: {
        title: "Βοήθεια",
      },
      title: "Χρειάζεστε βοήθεια;",
      description:
        "Εδώ θα βρείτε ένα βίντεο με οδηγίες για το πως να χρησιμοποιήσετε την εφαρμογή",
    },
    navbar: {
      help: "Βοήθεια",
      contact: "Καλέστε μας",
    },
    homepage: {
      favorites: {
        title: "Αγαπημένα",
        description: "Τα αγαπημένα σας προγράμματα θα εμφανίζονται εδώ.",
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
        submit: "Έναρξη",
        spin: {
          label: "Στύψιμο",
          placeholder: "Επιλέξτε ταχύτητα στυψίματος",
          noSpin: "Χωρίς Στύψιμο",
        },
        temperature: {
          label: "Θερμοκρασία",
          placeholder: "Επιλέξτε θερμοκρασία",
          warning:
            "Συγκεκριμένα είδη ρούχων μπορεί να υποστούν ζημιά αν πλυθούν σε υψηλή θερμοκρασία",
        },
        time: {
          label: "Ώρα Έναρξης",
          placeholder: "Επιλέξτε ώρα έναρξης",
          exact: "Επιλέξτε ώρα έναρξης για το επόμενο 24ωρο",
          relativeTimeLabel: (time: number) =>
            time === 0 ? "Έναρξη τώρα" : `Έναρξη σε ${time} λεπτά`,
        },
        undo: "Αναίρεση Αλλαγών",
        duration: "Διάρκεια",
        load: "Φορτίο",
      },
    },
    editProgramPage: {
      meta: {
        title: "Σελίδα Επεξεργασίας Προγράμματος",
      },
      title: "Επεξεργασία Προγράμματος",
      description: [
        "Επεξεργαστείτε το όνομα και τις ρυθμίσεις του προγράμματός σας",
        "Μην ξεχάσετε να αποθηκεύσετε τις αλλαγές σας!",
      ],
      submit: "Αποθήκευση Αλλαγών",
      toast: {
        title: "Επιτυχία!",
        description: (name: string) => `Το πρόγραμμα ${name} ενημερώθηκε`,
      },
    },
    inProgressPage: {
      meta: {
        title: "Σελίδα Πλύσης",
      },
      title: {
        scheduled: "θα ξεκινήσει σε",
        inProgress: "βρίσκεται σε εξέλιξη",
        paused: "βρίσκεται σε κατάσταση παύσης",
        finished: "έχει τελειώσει",
      },
      notify: "Ειδοποίησέ με όταν η πλύση ολοκληρωθεί",
      uiLock: {
        locked: "Ξεκλείδωμα Οθόνης",
        unlocked: "Κλείδωμα Οθόνης",
      },
      stages: {
        wash: "Πλύση",
        rinse: "Ξέβγαλμα",
        spin: "Στύψιμο",
        finish: "Τέλος",
      },
      pause: {
        labelContinue: "Συνέχεια",
        labelPause: "Παύση",
        warning: {
          title: "Προσοχή!",
          description:
            "Αν προσθέσετε ρούχα σε ένα πρόγραμμα που βρίσκεται σε εξέλιξη για πάνω από 20 λεπτά, μπορεί τα ρούχα σας να μην πλυθούν σωστά",
          action: "Κατάλαβα",
          showAgain: "Να μην εμφανιστεί ξανά",
        },
      },
      abort: {
        label: "Ματαίωση",
        title: "Είστε σίγουροι ότι θέλετε να ματαιώσετε το πρόγραμμα",
        description:
          "Αν ματαιώσετε το πρόγραμμα, δεν θα μπορείτε να το ξεκινήσετε πάλι αργότερα",
        actionCancel: "Ακύρωση",
        actionContinue: "Ματαίωση",
      },
      finish: {
        toast: {
          title: "Το πρόγραμμα ολοκληρώθηκε",
          description: "Μπορείτε να αφαιρέσετε τα ρούχα σας από το πλυντήριο",
        },
        message: "Τέλος!",
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
