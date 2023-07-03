import { create } from "zustand";
import { type AllowedSpin, type AllowedTemperatures } from "~/utils/types";

type ActiveProgramStore = {
  slug: string;
  temperature: AllowedTemperatures;
  spin: AllowedSpin;
  setActiveProgram: ({
    slug,
    temperature,
    spin,
  }: {
    slug: string;
    temperature: AllowedTemperatures;
    spin: AllowedSpin;
  }) => void;
};

export const useActiveProgramStore = create<ActiveProgramStore>((set) => ({
  slug: "",
  temperature: 20,
  spin: 300,
  setActiveProgram: ({ slug, temperature, spin }) =>
    set(() => ({ slug, temperature, spin })),
}));
