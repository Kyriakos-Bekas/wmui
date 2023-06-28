import { type Program } from "@prisma/client";
import { RefreshCw, Thermometer } from "lucide-react";
import Link from "next/link";
import { useLocaleStore } from "~/state/locale";
import { DEFAULT_WASHING_PROGRAMS } from "~/utils/types";

type FavoriteListItemProps = {
  program: Program;
};

const FavoriteListItem = ({ program }: FavoriteListItemProps) => {
  const locale = useLocaleStore((state) => state.locale);
  let { name } = program;

  if (program.type === "DEFAULT")
    // Translate default program names
    name =
      DEFAULT_WASHING_PROGRAMS.find((p) => p.slug === program.slug)?.name[
        locale
      ] || name;

  return (
    <li className="rounded-none border border-t-0 border-slate-200 first:rounded-tl-md first:rounded-tr-md first:border-t last:rounded-bl-md last:rounded-br-md last:border-t-0 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900">
      <Link href={`/programs/${program.slug}`}>
        <div className="flex items-center justify-start gap-4 px-4 py-2">
          <h3 className="mr-auto font-medium">{name}</h3>

          <div className="flex items-center gap-1 text-sm">
            <Thermometer className="h-4 w-4" />
            <span>{`${program.temperature}°C`}</span>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <RefreshCw className="h-4 w-4" />
            <span>{program.spin}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default FavoriteListItem;
