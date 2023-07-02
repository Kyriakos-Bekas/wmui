import { Pause, Play } from "lucide-react";
import { memo, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Checkbox,
} from "~/components/ui";
import { i18n } from "~/i18n";
import { useLocaleStore } from "~/state/locale";
import { api } from "~/utils/api";

const PauseDialog = ({ id, disabled }: { id: string; disabled: boolean }) => {
  const locale = useLocaleStore((state) => state.locale);
  const { data: program } = api.program.getOne.useQuery({ id });
  const [isPaused, setIsPaused] = useState(!program?.inProgress ?? false); // TODO: add state to the program
  const [hide, setHide] = useState(false);
  const [pauseWarningStored, setPauseWarningStored] = useState(false);

  useEffect(() => {
    setPauseWarningStored(
      JSON.parse(
        localStorage.getItem("hide-pause-warning") || "false"
      ) as boolean
    );
  }, []);

  useEffect(() => {
    setHide(pauseWarningStored);
  }, [pauseWarningStored]);

  // ! This is not working
  // TODO: Fix this
  const handlePause = () => {
    if (hide && !pauseWarningStored)
      localStorage.setItem("hide-pause-warning", "true");
    setIsPaused(true);
  };

  const timePassed = 20;

  return !isPaused ? (
    timePassed >= 20 && !pauseWarningStored ? (
      <AlertDialog>
        <AlertDialogTrigger
          disabled={disabled}
          className="flex h-[2.5rem] w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          <Pause className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium">
            {i18n[locale].inProgressPage.pause.labelPause}
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {i18n[locale].inProgressPage.pause.warning.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {i18n[locale].inProgressPage.pause.warning.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-3 grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="hide-warning"
                checked={hide}
                onCheckedChange={(checked) => setHide(Boolean(checked))}
              />
              <label htmlFor="hide-warning" className="text-sm">
                {i18n[locale].inProgressPage.pause.warning.showAgain}
              </label>
            </div>

            <AlertDialogAction
              onClick={handlePause}
              className="justify-self-end"
            >
              {i18n[locale].inProgressPage.pause.warning.action}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ) : (
      <Button
        disabled={disabled}
        className="flex w-full items-center justify-center gap-2"
        onClick={() => setIsPaused(true)}
      >
        <Pause className="h-4 w-4 fill-current" />
        {i18n[locale].inProgressPage.pause.labelPause}
      </Button>
    )
  ) : (
    <Button
      disabled={disabled}
      onClick={() => setIsPaused(false)}
      className="flex w-full items-center justify-center gap-2"
    >
      <Play className="h-4 w-4 fill-current" />
      {i18n[locale].inProgressPage.pause.labelContinue}
    </Button>
  );
};

export default memo(PauseDialog);
