import { type AvailableLocales } from "./state/locale";
import { type DEFAULT_WASHING_PROGRAMS } from "./utils/types";

type DefaultWashingProgramKeys =
  (typeof DEFAULT_WASHING_PROGRAMS)[number]["slug"];

type UiText = {
  navbar: {
    help: string;
    contact: string;
  };
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
