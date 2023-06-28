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
  >;
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
