export const ALLOWED_TEMPERATURES = [20, 30, 40, 60, 70, 80, 90] as const;

export type AllowedTemperatures = (typeof ALLOWED_TEMPERATURES)[number];

export const ALLOWED_SPINS = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
] as const;

export type AllowedSpin = (typeof ALLOWED_SPINS)[number];

export interface WashinProgramBase {
  id: string;
  name: string;
  temperature: AllowedTemperatures;
  spin: AllowedSpin;
  inProgress: boolean;
  start: string; // Date string
  slug: string;
  type: "DEFAULT" | "CUSTOM";
  duration: number; // in minutes
}

export const DEFAULT_WASHING_PROGRAMS = [
  {
    id: "Cotton",
    slug: "cotton",
    name: {
      en: "Cotton",
      gr: "Βαμβακερά",
    },
    spin: 800,
    temperature: 60,
  },
  {
    id: "Wool",
    slug: "wool",
    name: {
      en: "Wool",
      gr: "Μάλλινα",
    },
    spin: 600,
    temperature: 40,
  },
  {
    id: "Synthetic",
    slug: "synthetic",
    name: {
      en: "Synthetic",
      gr: "Συνθετικά",
    },
    spin: 800,
    temperature: 40,
  },
  {
    id: "Delicates",
    slug: "delicates",
    name: {
      en: "Delicates",
      gr: "Ευαίσθητα",
    },
    spin: 600,
    temperature: 30,
  },
  {
    id: "Handwash",
    slug: "handwash",
    name: {
      en: "Handwash",
      gr: "Στο χέρι",
    },
    spin: 100,
    temperature: 30,
  },
  {
    id: "Intensive",
    slug: "intensive",
    name: {
      en: "Intensive",
      gr: "Εντατικό",
    },
    spin: 1000,
    temperature: 60,
  },
  {
    id: "Quick",
    slug: "quick",
    name: {
      en: "Quick",
      gr: "Γρήγορο",
    },
    spin: 800,
    temperature: 40,
  },
  {
    id: "Sport",
    slug: "sport",
    name: {
      en: "Sport",
      gr: "Αθλητικά",
    },
    spin: 800,
    temperature: 40,
  },
  {
    id: "Drain",
    slug: "drain",
    name: {
      en: "Drain",
      gr: "Στύψιμο",
    },
    spin: 200,
    temperature: 20,
  },
  {
    id: "Rinse",
    slug: "rinse",
    name: {
      en: "Rinse",
      gr: "Ξέβγαλμα",
    },
    spin: 200,
    temperature: 20,
  },
  {
    id: "Colored",
    slug: "colored",
    name: {
      en: "Colored",
      gr: "Χρωματιστά",
    },
    spin: 800,
    temperature: 40,
  },
  {
    id: "Shirts",
    slug: "shirts",
    name: {
      en: "Shirts",
      gr: "Πουκάμισα",
    },
    spin: 800,
    temperature: 40,
  },
] as const;

// extract the default program types from the array
export type DefaultWashingProgramNameEn =
  (typeof DEFAULT_WASHING_PROGRAMS)[number]["name"]["en"];

export type DefaultWashingProgramNameGr =
  (typeof DEFAULT_WASHING_PROGRAMS)[number]["name"]["gr"];
