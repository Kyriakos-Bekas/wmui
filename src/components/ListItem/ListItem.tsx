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
import { useToast } from "../ui";
import { i18n } from "~/i18n";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useLongPress } from "use-long-press";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

const DeleteDialog = ({
  name,
  onDelete,
}: {
  name: string;
  onDelete: () => void;
}) => {
  const locale = useLocaleStore((state) => state.locale);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex grow cursor-pointer items-center gap-2">
          <Trash className="h-4 w-4" />
          <span>{i18n[locale].homepage.optionsMenu.delete}</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {locale === "en"
              ? "Are you sure you want to delete program"
              : "Είστε σίγουροι ότι θέλετε να διαγράψετε το πρόγραμμα"}
            <span className="text-blue-700"> {name}</span>
            {locale === "en" ? "?" : ";"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {locale === "en"
              ? "This action cannot be undone"
              : "Αυτή η ενέργεια δεν μπορεί να αναιρεθεί"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {locale === "en" ? "Cancel" : "Ακύρωση"}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/75"
            onClick={onDelete}
          >
            <span className="text-white">
              {locale === "en" ? "Delete" : "Διαγραφή"}
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type FavoriteListItemProps = {
  program: Program;
};

const ListItemOptionsMenu = ({ id, name }: { id: string; name: string }) => {
  const locale = useLocaleStore((state) => state.locale);
  const { toast } = useToast();
  const { refetch: refetchCustomPrograms } = api.program.getAll.useQuery(
    { type: "CUSTOM" },
    { enabled: false }
  );
  const { data: program } = api.program.getOne.useQuery({ id });
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

  const handleDelete = () => {
    deleteProgram({ id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="z-10">
        <div className="rounded-md p-3 hover:bg-slate-200 dark:hover:bg-slate-800">
          <MoreVertical className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            href={`/edit/${program?.slug ?? "unknown"}`}
            className="flex grow cursor-pointer items-center gap-2"
          >
            <Pencil className="h-4 w-4" />
            <span>{i18n[locale].homepage.optionsMenu.edit}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
          <DeleteDialog name={name} onDelete={handleDelete} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ListItem = ({ program }: FavoriteListItemProps) => {
  const locale = useLocaleStore((state) => state.locale);
  let { name } = program;
  const router = useRouter();
  const { mutate: startProgram } = api.program.start.useMutation({
    onSuccess: () => void router.push(`/in-progress/${program.slug}`),
  });

  if (program.type === "DEFAULT")
    // Translate default program names
    name =
      DEFAULT_WASHING_PROGRAMS.find((p) => p.slug === program.slug)?.name[
        locale
      ] || name;

  const [isEventTriggeredOnce, setIsEventTriggeredOnce] = useState(false);
  const handleLongPress = () => {
    startProgram({ id: program.id, start: 0 });
  };
  const [applyAnimation, setApplyAnimation] = useState(false);

  const bind = useLongPress(handleLongPress, {
    onStart: () => {
      setApplyAnimation(true);
    },
    onFinish: () => {
      if (isEventTriggeredOnce) return;

      setIsEventTriggeredOnce(true);
    },
    onCancel: () => {
      setApplyAnimation(false);
    },
    filterEvents: (event) => event.type !== "click",
    threshold: 1000,
    captureEvent: true,
    cancelOnMovement: false,
  });

  return (
    <li
      id={applyAnimation ? `${program.slug}-load-indicator` : undefined}
      className="relative flex items-center gap-2 overflow-hidden rounded-none border border-t-0 border-slate-200 first:rounded-tl-md first:rounded-tr-md first:border-t last:rounded-bl-md last:rounded-br-md last:border-t-0 first-of-type:border-t hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900"
    >
      <button
        {...bind()}
        onClick={() => {
          if (isEventTriggeredOnce) return;
          void router.push(
            `/${program.type === "DEFAULT" ? "programs" : "favorites"}/${
              program.slug
            }`
          );
        }}
        className="z-10 grow"
      >
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
      </button>
      {program.type === "CUSTOM" && (
        <ListItemOptionsMenu name={name} id={program.id} />
      )}
    </li>
  );
};

export default ListItem;
