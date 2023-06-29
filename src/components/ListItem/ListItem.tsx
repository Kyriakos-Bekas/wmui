import { type Program } from "@prisma/client";
import {
  MoreVertical,
  Pencil,
  RefreshCw,
  Thermometer,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useLocaleStore } from "~/state/locale";
import { DEFAULT_WASHING_PROGRAMS } from "~/utils/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button, useToast } from "../ui";
import { i18n } from "~/i18n";
import { api } from "~/utils/api";

type FavoriteListItemProps = {
  program: Program;
};

const ListItemOptionsMenu = ({ id }: { id: string }) => {
  const locale = useLocaleStore((state) => state.locale);
  const { toast } = useToast();
  const { refetch: refetchCustomPrograms } = api.program.getAll.useQuery(
    { type: "CUSTOM" },
    { enabled: false }
  );
  const { mutate: deleteProgram } = api.program.delete.useMutation({
    onSuccess: ({ name }) => {
      toast({
        title: i18n[locale].homepage.optionsMenu.success(name),
        className:
          "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
      });
      void refetchCustomPrograms();
    },
    onError: () => {
      toast({
        title: i18n[locale].homepage.optionsMenu.error,
        className: "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200",
      });
    },
  });

  const handleEdit = () => {
    console.log("Edit", id);
  };

  const handleDelete = () => {
    deleteProgram({ id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-md p-3 hover:bg-slate-200 dark:hover:bg-slate-800">
          <MoreVertical className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleEdit}>
          <div className="flex grow cursor-pointer items-center gap-2">
            <Pencil className="h-4 w-4" />
            <span>{i18n[locale].homepage.optionsMenu.edit}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          <div className="flex grow cursor-pointer items-center gap-2">
            <Trash className="h-4 w-4" />
            <span>{i18n[locale].homepage.optionsMenu.delete}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ListItem = ({ program }: FavoriteListItemProps) => {
  const locale = useLocaleStore((state) => state.locale);
  let { name } = program;

  if (program.type === "DEFAULT")
    // Translate default program names
    name =
      DEFAULT_WASHING_PROGRAMS.find((p) => p.slug === program.slug)?.name[
        locale
      ] || name;

  return (
    <li className="flex items-center gap-2 rounded-none border border-t-0 border-slate-200 first:rounded-tl-md first:rounded-tr-md first:border-t last:rounded-bl-md last:rounded-br-md last:border-t-0 first-of-type:border-t hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900">
      <Link href={`/programs/${program.slug}`} className="grow">
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
      {program.type === "CUSTOM" && <ListItemOptionsMenu id={program.id} />}
    </li>
  );
};

export default ListItem;
