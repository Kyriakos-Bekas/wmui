import { create } from "zustand";

export type AvailableLocales = "en" | "gr";

type LocaleStore = {
  locale: AvailableLocales;
  setLocale: (newLocale: AvailableLocales) => void;
};

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: "en",
  setLocale: (newLocale) => set(() => ({ locale: newLocale })),
}));
