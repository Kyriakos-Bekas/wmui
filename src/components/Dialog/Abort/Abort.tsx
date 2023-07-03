import { memo } from "react";
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
} from "~/components/ui";
import { i18n } from "~/i18n";
import { useLocaleStore } from "~/state/locale";
import { api } from "~/utils/api";

type AbortDialogProps = { id: string; disabled: boolean; onAbort: () => void };

const AbortDialog = ({ id, disabled, onAbort }: AbortDialogProps) => {
  const locale = useLocaleStore((state) => state.locale);
  const { data: program } = api.program.getOne.useQuery({ id });

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={disabled}
        className="flex h-[2.5rem] w-full items-center justify-center rounded-md bg-destructive px-4 py-2 text-primary-foreground disabled:opacity-50 dark:text-primary"
      >
        <span className="text-sm font-medium">
          {i18n[locale].inProgressPage.abort.label}
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {i18n[locale].inProgressPage.abort.title}{" "}
            <span className="font-bold">{program?.name ?? ""}</span>
            {locale === "en" ? "?" : ";"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {i18n[locale].inProgressPage.abort.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-3 grid grid-cols-2 gap-4">
          <AlertDialogCancel className="mt-0">
            {i18n[locale].inProgressPage.abort.actionCancel}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onAbort}>
            {i18n[locale].inProgressPage.abort.actionContinue}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default memo(AbortDialog);
