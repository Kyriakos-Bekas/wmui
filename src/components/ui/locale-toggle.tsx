import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useLocaleStore } from "~/state/locale";
import { i18n } from "~/i18n";
import clsx from "clsx";

export function LocaleToggle() {
  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title={i18n[locale].toggleLocale}>
          <div className="relative h-full w-full">
            <span
              className={clsx(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all",
                {
                  "scale-0": locale === "gr",
                  "scale-100": locale === "en",
                }
              )}
            >
              EN
            </span>
            <span
              className={clsx(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all",
                {
                  "scale-0": locale === "en",
                  "scale-100": locale === "gr",
                }
              )}
            >
              GR
            </span>
          </div>
          <span className="sr-only">{i18n[locale].toggleLocale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("gr")}>
          Ελληνικά
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
