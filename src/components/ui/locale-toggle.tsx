import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { type AvailableLocales, useLocaleStore } from "~/state/locale";
import { i18n } from "~/i18n";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Head from "next/head";

export function LocaleToggle() {
  const locale = useLocaleStore((state) => state.locale);
  const [selectedLocale, setSelectedLocale] = useState(locale);
  const setLocale = useLocaleStore((state) => state.setLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    setLocale(selectedLocale);
  }, [selectedLocale, setLocale]);

  useEffect(() => {
    setLocale(
      (
        JSON.parse(
          localStorage.getItem("locale") ||
            JSON.stringify({
              locale: "en",
            })
        ) as {
          locale: AvailableLocales;
        }
      ).locale
    );
  }, [setLocale]);

  const handleLocaleChange = (newLocale: AvailableLocales) => {
    localStorage.setItem("locale", JSON.stringify({ locale: newLocale }));
    setSelectedLocale(newLocale);
  };

  return (
    <>
      <Head>
        <title>{i18n[locale].app.title}</title>
        <meta name="description" content={i18n[locale].app.description} />
      </Head>

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
          <DropdownMenuItem onClick={() => handleLocaleChange("en")}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLocaleChange("gr")}>
            Ελληνικά
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
