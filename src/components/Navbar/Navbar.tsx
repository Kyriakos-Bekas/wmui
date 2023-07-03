import { ChevronLeft, HelpCircle, PhoneOutgoing } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, ModeToggle, LocaleToggle } from "~/components/ui";
import { i18n } from "~/i18n";
import { useLocaleStore } from "~/state/locale";

const Navbar = () => {
  const locale = useLocaleStore((state) => state.locale);
  const router = useRouter();

  return (
    <div className="border-b border-slate-200 dark:border-slate-800">
      <nav className="container py-4">
        <div className="flex items-center justify-end gap-4">
          {router.pathname === "/help" ? (
            <Button variant="ghost" className="mr-auto">
              <Link href="/" className="flex items-center gap-2">
                <ChevronLeft className="h-5 w-5" />
                <span className="hidden lg:block">{i18n[locale].back}</span>
              </Link>
            </Button>
          ) : (
            <Button variant="ghost">
              <Link href="/help" className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                <span>{i18n[locale].navbar.help}</span>
              </Link>
            </Button>
          )}
          <Button variant="ghost">
            <a href="tel:000000000" className="flex items-center gap-2">
              <PhoneOutgoing className="h-5 w-5" />
              <span>{i18n[locale].navbar.contact}</span>
            </a>
          </Button>

          <LocaleToggle />
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
