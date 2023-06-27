import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useLocaleStore } from "~/state/locale";
import { i18n } from "~/i18n";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const locale = useLocaleStore((state) => state.locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" title={i18n[locale].toggleTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{i18n[locale].toggleTheme}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {locale === "en" ? "Light" : "Φωτεινή Λειτουργία"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {locale === "en" ? "Dark" : "Σκοτεινή Λειτουργία"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {locale === "en" ? "System" : "Λειτουργία Συστήματος"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
