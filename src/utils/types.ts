export type AllowedTemperatures = 20 | 30 | 40 | 60 | 70 | 80 | 90;

export type AllowedSpin =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 1000;

export interface WashinProgramBase {
  id: string;
  name: string;
  temperature: AllowedTemperatures;
  spin: AllowedSpin;
  inProgress: boolean;
  start: string; // Date string
}

export const DEFAULT_WASHING_PROGRAMS = [
  {
    name: "Cotton",
    spin: 800,
    temperature: 60,
  },
  {
    name: "Wool",
    spin: 600,
    temperature: 40,
  },
  {
    name: "Synthetic",
    spin: 800,
    temperature: 40,
  },
  {
    name: "Delicates",
    spin: 600,
    temperature: 30,
  },
  {
    name: "Handwash",
    spin: 100,
    temperature: 30,
  },
  {
    name: "Intensive",
    spin: 1000,
    temperature: 60,
  },
  {
    name: "Quick",
    spin: 800,
    temperature: 40,
  },
  {
    name: "Sport",
    spin: 800,
    temperature: 40,
  },
  {
    name: "Drain",
    spin: 200,
    temperature: 20,
  },
  {
    name: "Rinse",
    spin: 200,
    temperature: 20,
  },
  {
    name: "Colored",
    spin: 800,
    temperature: 40,
  },
  {
    name: "Shirts",
    spin: 800,
    temperature: 40,
  },
] as const;

// extract the default program types from the array
export type DefaultWashingProgramName =
  (typeof DEFAULT_WASHING_PROGRAMS)[number]["name"];
