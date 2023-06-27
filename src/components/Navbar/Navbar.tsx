import { HelpCircle, PhoneOutgoing } from "lucide-react";
import { Button, ModeToggle } from "~/components/ui";

const Navbar = () => {
  return (
    <div className="border-b border-slate-200 dark:border-slate-800">
      <nav className="container py-4">
        <div className="flex items-center justify-end gap-4">
          <Button variant="ghost" className="gap-2">
            <HelpCircle className="h-5 w-5" />
            <span>Help</span>
          </Button>
          <Button variant="ghost" className="gap-2">
            <PhoneOutgoing className="h-5 w-5" />
            <span>Contact</span>
          </Button>

          <ModeToggle />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
