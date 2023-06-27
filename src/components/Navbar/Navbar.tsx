import { HelpCircle, PhoneOutgoing } from "lucide-react";
import { Button, ModeToggle, LocaleToggle } from "~/components/ui";
import { i18n } from "~/i18n";
import { useLocaleStore } from "~/state/locale";

const Navbar = () => {
  const locale = useLocaleStore((state) => state.locale);

  return (
    <div className="border-b border-slate-200 dark:border-slate-800">
      <nav className="container py-4">
        <div className="flex items-center justify-end gap-4">
          <Button variant="ghost" className="gap-2">
            <HelpCircle className="h-5 w-5" />
            <span>{i18n[locale].navbar.help}</span>
          </Button>
          <Button variant="ghost" className="gap-2">
            <PhoneOutgoing className="h-5 w-5" />
            <span>{i18n[locale].navbar.contact}</span>
          </Button>

          <LocaleToggle />
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
